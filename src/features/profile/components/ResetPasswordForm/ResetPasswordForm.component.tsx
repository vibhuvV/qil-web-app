import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FC } from "react";

import {
  resetPasswordFormSchema,
  ResetPasswordFormSchema,
} from "@/features/profile/components/ResetPasswordForm/ResetPasswordForm.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useResetPasswordMutation } from "@/features/profile/hooks/useResetPassword";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ResetPasswordFormProps = {
  onCancel: () => void;
};

const ResetPasswordForm: FC<ResetPasswordFormProps> = ({ onCancel }) => {
  const forgotPasswordMutation = useResetPasswordMutation({
    onSuccess: () => {
      onCancel();
    },
  });

  const form = useForm<ResetPasswordFormSchema>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = async (values: ResetPasswordFormSchema) => {
    forgotPasswordMutation.mutate({
      data: {
        password1: values.newPassword,
        password2: values.confirmNewPassword,
        oldPassword: values.currentPassword,
      },
    });
  };

  return (
    <Card className="flex-1 min-w-[320px] max-w-[700px]">
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmNewPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between gap-2">
            <Button type="button" variant="destructive" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">Update Password</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default ResetPasswordForm;
