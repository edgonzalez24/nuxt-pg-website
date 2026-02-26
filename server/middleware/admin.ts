export default defineEventHandler(async(e) => {
  if (!e.path.startsWith('/api/admin')) {
    return;
  }

  const session = await requireUserSession(e);
  const hasAdminRole = session.user.roles.includes('admin');

  if (!hasAdminRole) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized',
    });
  }

  return;
});