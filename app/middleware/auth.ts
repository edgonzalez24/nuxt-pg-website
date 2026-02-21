export default defineNuxtRouteMiddleware(async (to, from) => {
  const { isAuthenticated, isAdmin } = useAuthentication();

  if (!isAuthenticated.value) {
    return navigateTo("/login");
  }

  if(to.path.startsWith("/dashboard") && !isAdmin.value) {
    return navigateTo("/");
  }
});