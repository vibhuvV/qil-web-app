import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string()
    .email("Please provide a valid email")
    .min(5, "Please provide a valid email"),
  password: z.string().min(1, "Please provide a password"),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;
