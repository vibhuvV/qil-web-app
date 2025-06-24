import { z } from "zod";

export const updateProfileFormSchema = z.object({
  profilePicture: z
    .instanceof(FileList)
    .optional()
    .refine((file) => {
      return !file || !file.length || file[0].size <= 250 * 1024;
    }, "File size must be less than 200kb")
    .refine((file) => {
      return !file || !file.length || ["image/png"].includes(file[0].type);
    }, "File must be a PNG"),
  displayName: z.string().min(1, "Please provide a name"),
});

export type UpdateProfileFormSchema = z.infer<typeof updateProfileFormSchema>;
