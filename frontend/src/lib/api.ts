import type { ApiResponse, User } from "./types";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

export function getGoogleLoginUrl() {
  return `${BACKEND_URL}/auth/google`;
}

export function getLogoutUrl() {
  return `${BACKEND_URL}/auth/logout`;
}

export async function getCurrentUser(): Promise<ApiResponse<User>> {
  const response = await fetch(`${BACKEND_URL}/api/me`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    return {
      success: false,
      message: "Not authenticated",
      data: null,
    };
  }

  return response.json();
}

export async function lookupUserByGeneratedId(
  generatedId: string
): Promise<ApiResponse<User>> {
  const response = await fetch(
    `${BACKEND_URL}/api/users/lookup/${encodeURIComponent(generatedId)}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  return response.json();
}