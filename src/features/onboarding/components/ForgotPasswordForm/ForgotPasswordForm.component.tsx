import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FC } from "react";
import { useNavigate } from "@tanstack/react-router";

import {
  ForgotPasswordFormSchema,
  forgotPasswordFormSchema,
} from "@/features/onboarding/components/ForgotPasswordForm/ForgotPasswordForm.schema";
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
import { useForgotPasswordMutation } from "@/features/onboarding/hooks/useForgotPassword";

const ForgotPasswordForm: FC = () => {
  const navigate = useNavigate();
  const forgotPasswordMutation = useForgotPasswordMutation({
    onSuccess: () => {
      navigate({
        to: "/login",
      });
    },
  });

  const form = useForm<ForgotPasswordFormSchema>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: ForgotPasswordFormSchema) => {
    forgotPasswordMutation.mutate({
      data: values,
    });
  };

  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="m@example.com" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full"
          isLoading={forgotPasswordMutation.isPending}
          type="submit"
        >
          Send
        </Button>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
