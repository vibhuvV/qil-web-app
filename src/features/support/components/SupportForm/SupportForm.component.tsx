import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FC } from "react";

import {
  supportFormSchema,
  SupportFormSchema,
} from "@/features/support/components/SupportForm/SupportForm.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

// interface SupportFormProps {}

const SupportForm: FC = () => {
  const form = useForm<SupportFormSchema>({
    resolver: zodResolver(supportFormSchema),
    defaultValues: {
      issue: "",
      subject: "",
    },
  });

  const onSubmit = async (values: SupportFormSchema) => {
    console.log(values);
    // forgotPasswordMutation.mutate({
    //   data: {
    //     password1: values.newPassword,
    //     password2: values.confirmNewPassword,
    //     oldPassword: values.currentPassword,
    //   },
    // });
  };

  return (
    <Card className="flex-1 min-w-[320px] max-w-[700px]">
      <CardHeader>
        <CardTitle>Need Help?</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="What is your issue about?"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="issue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Issue</FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-none"
                      placeholder="Tell us about your issue"
                      rows={6}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    We aim to respond to all support tickets as quickly as
                    possible, but it may take some time due to the volume of
                    requests. Thank you for your patience and understanding!
                  </FormDescription>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit">Submit</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default SupportForm;
