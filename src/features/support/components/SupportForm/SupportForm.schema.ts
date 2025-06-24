import { z } from "zod";

export const supportFormSchema = z.object({
  subject: z.string().min(1, "Please provide a subject"),
  issue: z.string().min(1, "Please tell us about the issue you are facing"),
});

export type SupportFormSchema = z.infer<typeof supportFormSchema>;
