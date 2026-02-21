export default defineNuxtRouteMiddleware(async (to, from) => {
  const { isAuthenticated } = useAuthentication();

  if ((to.path.startsWith('/login') || to.path.startsWith('/dashboard')) && isAuthenticated.value) {
    return navigateTo("/");
  }
});