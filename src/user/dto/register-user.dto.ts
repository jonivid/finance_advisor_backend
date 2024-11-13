export class RegisterResponseDto {
  id: number;
  name: string;
  email: string;
  income: number;
  expenses: number;
  access_token?: string; // Optional: Include if you want to log the user in immediately
}
