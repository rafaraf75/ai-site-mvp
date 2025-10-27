import {z} from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Imię jest za krótkie'),
  email: z.string().email('Niepoprawny email'),
  message: z.string().min(10, 'Wiadomość jest za krótka'),
});

export type ContactInput = z.infer<typeof contactSchema>;

