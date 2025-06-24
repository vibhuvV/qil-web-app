import { z } from "zod";

export const forgotPasswordFormSchema = z.object({
  email: z
    .string()
    .email("Please provide a valid email")
    .min(5, "Please provide a valid email"),
});

export type ForgotPasswordFormSchema = z.infer<typeof forgotPasswordFormSchema>;
