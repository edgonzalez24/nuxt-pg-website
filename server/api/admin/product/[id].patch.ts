defineRouteMeta({
  openAPI: {
    summary: "Update product (admin)",
    description: "Update a product's details including name, description, price, images, and tags. Supports multipart/form-data. Requires admin access.",
    tags: ["Admin", "Product"],
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        schema: { type: "integer", format: "int32" },
        description: "Numeric ID of the product to update",
        example: 1,
      },
    ],
    requestBody: {
      required: true,
      content: {
        "multipart/form-data": {
          schema: {
            type: "object",
            properties: {
              slug: {
                type: "string",
                minLength: 3,
                example: "updated-product",
              },
              name: {
                type: "string",
                minLength: 3,
                example: "Updated Product Name",
              },
              description: {
                type: "string",
                minLength: 10,
                example: "Updated product description with at least 10 characters.",
              },
              price: {
                type: "number",
                format: "float",
                minimum: 0,
                example: 29.99,
              },
              images: {
                type: "array",
                items: { type: "string" },
                example: ["image1.jpg", "image2.jpg"],
              },
              tags: {
                type: "array",
                items: { type: "string" },
                example: ["electronics", "gadgets"],
              },
            },
            required: ["slug", "name", "description", "price"],
          },
        },
      },
    },
    responses: {
      200: {
        description: "Product updated successfully",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: { type: "string", example: "Product updated successfully" },
                product: {
                  type: "object",
                  properties: {
                    id: { type: "integer", example: 1 },
                    slug: { type: "string", example: "updated-product" },
                    name: { type: "string", example: "Updated Product Name" },
                    description: { type: "string" },
                    price: { type: "number", format: "float" },
                    images: { type: "array", items: { type: "string" } },
                    tags: { type: "array", items: { type: "string" } },
                    createdAt: { type: "string", format: "date-time" },
                    updatedAt: { type: "string", format: "date-time" },
                  },
                },
                files: { type: "array", items: { type: "object" } },
              },
            },
          },
        },
      },
      400: {
        description: "Invalid form data or validation error",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                statusCode: { type: "integer", example: 400 },
                message: { type: "string", example: "Bad request" },
                data: { type: "object" },
              },
            },
          },
        },
      },
      404: {
        description: "Product not found",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                statusCode: { type: "integer", example: 404 },
                message: { type: "string", example: "Product not found" },
              },
            },
          },
        },
      },
    },
  },
});

import getPrismaClient  from "../../../utils/prisma";
import { z } from 'zod';

const bodySchema = z.object({
  slug: z.string().min(3),
  name: z.string().min(3),
  description: z.string().min(10),
  price: z.number().min(0),
  tags: z.array(z.string()).min(0),
  images: z.array(z.string()).min(0),
});
interface FileData {
  name: string;
  filename: string;
  type: string;
  data: Buffer;
}

export default defineEventHandler(async (e) => {
  const id = getRouterParam(e, 'id') as string;
  const prisma = getPrismaClient();
  const formData = await readMultipartFormData(e);
  const files: FileData[] = [];

  if (!formData || formData.length === 0) {
    throw createError({
      statusCode: 400,
      message: 'Invalid form data',
    });
  }

  let dataString = '';
  for (const part of formData) {
    if (part.name === 'data' && part.data) {
      dataString = part.data.toString('utf-8');
      console.log("Received data string:", dataString);
    }

    if(part.name === 'files' && part.filename) {
      files.push({
        name: part.name,
        type: part.type || 'application/octet-stream',
        filename: part.filename,
        data: part.data,
      });
    }
  }
  // Validate and parse the data string
  // safeParse means that it will return an object with success and error properties, instead of throwing an error
  const body = bodySchema.safeParse(JSON.parse(dataString));
  if (!body.success) {
    throw createError({
      statusCode: 400,
      message: 'Bad request',
      data: body.error,
    });
  }

  const product = await prisma.product.findUnique({
    where: { id: parseInt(id, 10) },
  });

  if (!product) {
    throw createError({
      statusCode: 404,
      message: 'Product not found',
    });
  }

  // Send files to cloudinary and get the URLs

  if(files.length > 0) {
    const uploadedFiles = await Promise.all(files.map(async (file) => {
      try {
        const url = await fileUpload(file.data);
        return url;
      } catch (error) {
        console.error("Error uploading file:", error);
        throw createError({
          statusCode: 500,
          message: 'Error uploading file',
        });
      }
    }));
    
    body.data.images = [...body.data.images, ...uploadedFiles];
  }

  const updateProduct = await prisma.product.update({
    where: { id: parseInt(id, 10) },
    data: body.data,
  });

  return {
    message: 'Product updated successfully',
    product: updateProduct
  };
});