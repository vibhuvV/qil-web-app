{
  /* TODO: Add profile image update when feature is added on backend */
}

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FC } from "react";
// import { PersonIcon } from "@radix-ui/react-icons";

import { useUpdateProfileMutation } from "../../hooks/useUpdateProfile";

import {
  updateProfileFormSchema,
  UpdateProfileFormSchema,
} from "@/features/profile/components/UpdateProfileForm/UpdateProfileForm.schema";
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
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AppUser } from "@/types/user";

type UpdateProfileFormProps = {
  user: AppUser;
  onCancel: () => void;
};

const UpdateProfileForm: FC<UpdateProfileFormProps> = ({ user, onCancel }) => {
  const updateProfileMutation = useUpdateProfileMutation({
    onSuccess: () => {
      onCancel();
    },
  });

  const form = useForm<UpdateProfileFormSchema>({
    resolver: zodResolver(updateProfileFormSchema),
    defaultValues: {
      displayName: user.displayName,
    },
  });

  // const fileRef = form.register("profilePicture");
  const onSubmit = async (values: UpdateProfileFormSchema) => {
    updateProfileMutation.mutate({
      data: {
        displayName: values.displayName,
      },
    });
  };

  return (
    <Card className="flex-1 min-w-[320px] max-w-[700px]">
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            {/* <FormField
              control={form.control}
              name="profilePicture"
              render={({ field }) => (
                <div className="flex justify-between gap-2">
                  <FormItem>
                    <FormLabel>Display Picture</FormLabel>
                    <FormControl>
                      <Input type="file" {...fileRef} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  <Avatar className="w-16 h-16">
                    <AvatarImage
                      src={
                        field.value?.length
                          ? URL.createObjectURL(field.value[0])
                          : undefined
                      }
                    />
                    <AvatarFallback>
                      <PersonIcon className="w-8 h-8" />
                    </AvatarFallback>
                  </Avatar>
                </div>
              )}
            /> */}
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
            <Button type="submit">Update Profile</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default UpdateProfileForm;
