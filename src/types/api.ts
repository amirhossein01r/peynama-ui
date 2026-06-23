interface User {
  username: string;
}

interface LoginPayload {
  username: string;
  password: string;
}

interface TokenResponse {
  access: string;
}

export type { User, LoginPayload, TokenResponse };
