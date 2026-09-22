export interface User {
  id: string | number; // Aceita tanto '1' (string) como 1 (number)
  name: string;
  email: string;
  company: {
    name: string;
  } | string;
}