export interface JWTPayload {
  Id: string;
  Name: string;
  Email: string;
  isAdmin: boolean;
  iat: number;
  exp: number;
}
