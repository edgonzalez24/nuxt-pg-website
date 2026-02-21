export const useAuthentication = () => {
  const { loggedIn, session, user, clear, fetch } = useUserSession();

  const login = async (email: string, password: string) => {
    // NOT use useFetch inside methods, because it will create a new instance (hooks)
    try {
      await $fetch('/api/auth/login', {
        method: 'POST',
        body: { email, password },
      });
      await fetch(); // Refresh session state after login
      navigateTo('/?message=Login successful');

      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      await $fetch('/api/auth/register', {
        method: 'POST',
        body: { email, password, name },
      });
      navigateTo('/?message=Registration successful');

      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await clear();
      navigateTo('/?message=Logout successful');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return {
    loggedIn,
    user,
    session,
    login,
    register,
    logout,
    isAuthenticated: loggedIn,
    isAdmin: computed(() => loggedIn.value && user.value?.roles.includes('admin')),
  };
};