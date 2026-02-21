declare module '#auth-utils' {
  interface User {
    id: string;
    email: string;
    name: string;
    roles: string[];
  }

  interface UserSession {
    loggedInAt: Date;
  }

  interface SecureSessionData {
    // Add your own fields
  }
}

export {}