import { z } from "zod";

export const registerFormSchema = z
  .object({
    name: z.string().min(1, "Please provide your name"),
    email: z
      .string()
      .email("Please provide a valid email")
      .min(5, "Please provide a valid email"),
    password: z.string().min(1, "Please provide a password"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

export type RegisterFormSchema = z.infer<typeof registerFormSchema>;
