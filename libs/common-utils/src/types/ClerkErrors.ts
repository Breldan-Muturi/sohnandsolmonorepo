export interface ClerkErrorResponse {
  status: number;
  clerkError: boolean;
  errors: ClerkError[];
}

export interface ClerkError {
  code: string;
  message: string;
  longMessage: string;
  meta: Record<string, unknown>; // or any specific type you expect in meta
}
