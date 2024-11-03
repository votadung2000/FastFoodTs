export interface UserData {
  id?: number | null;
  created_at?: string;
  updated_at?: string;
  name?: string;
  user_name?: string;
  status?: number;
  phone_number?: string;
  email?: string;
  address?: string;
  role?: number;
  avatar?: string | null;
  isLoadingUser?: boolean;
}
