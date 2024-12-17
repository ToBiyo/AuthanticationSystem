export interface JwtPayload {
  id: string;
  name?: string;
}

export interface VerifyTokenResult {
  decoded?: JwtPayload;
  error?: string;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
