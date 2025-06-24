import { z } from "zod";

export const resetPasswordFormSchema = z
  .object({
    currentPassword: z.string().min(1, "Please provide your current password"),
    newPassword: z.string().min(1, "Please provide a new password"),
    confirmNewPassword: z.string().min(1, "Please confirm your new password"),
  })
  .superRefine(({ confirmNewPassword, newPassword }, ctx) => {
    if (confirmNewPassword !== newPassword) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmNewPassword"],
      });
    }
  });

export type ResetPasswordFormSchema = z.infer<typeof resetPasswordFormSchema>;
