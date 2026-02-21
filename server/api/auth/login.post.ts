defineRouteMeta({
  openAPI: {
    summary: "User login",
    description: "Authenticate a user with email and password. Returns user info and sets a session cookie.",
    tags: ["auth"],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              email: {
                type: "string",
                format: "email",
                example: "user@example.com",
              },
              password: {
                type: "string",
                example: "yourpassword123",
              },
            },
            required: ["email", "password"],
          },
        },
      },
    },
    responses: {
      200: {
        description: "Login successful",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: { type: "string", example: "Login successful" },
                user: {
                  type: "object",
                  properties: {
                    id: { type: "string" },
                    email: { type: "string" },
                    name: { type: "string" },
                    roles: { type: "array", items: { type: "string" } },
                  },
                },
              },
            },
          },
        },
      },
      401: {
        description: "Invalid email or password",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                statusCode: { type: "integer", example: 401 },
                message: { type: "string", example: "Invalid email or password" },
              },
            },
          },
        },
      },
    },
  },
});
import getPrismaClient from "../../utils/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

const bodySchema = z.object({
  email: z
    .string()
    .toLowerCase()
    .trim()
    .refine((email) => /\S+@\S+\.\S+/.test(email), {
      message: "Invalid email format",
    }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export default defineEventHandler(async (e) => {
  const { email, password } = await readValidatedBody(e, bodySchema.parse);

  const prisma = getPrismaClient();
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw createError({
      statusCode: 401,
      message: "Invalid email or password",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw createError({
      statusCode: 401,
      message: "Invalid email or password",
    });
  }

  const userSession = {
    id: String(user.id),
    email: user.email,
    name: user.name,
    roles: user.roles,
  };

  // Create session cookie after validating credentials
  await setUserSession(e, {
    user: userSession,
    loggedInAt: new Date(),
  });

  return {
    message: "Login successful",
    user: userSession,
  };
});
