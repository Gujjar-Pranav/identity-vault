export type User = {
  generated_id: string;
  google_id: string;
  name: string;
  email: string;
  profile_photo_url?: string | null;
  created_at: string;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T | null;
};