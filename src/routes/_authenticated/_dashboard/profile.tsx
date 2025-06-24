import { AvatarIcon } from "@radix-ui/react-icons";
import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ResetPasswordForm from "@/features/profile/components/ResetPasswordForm";
import UpdateProfileForm from "@/features/profile/components/UpdateProfileForm";
import { useAuth } from "@/hooks/useAuth";
import DashboardHeader from "@/components/DashboardHeader";
import { USER_AVATAR_URL } from "@/constants/userManagement";

export const Route = createFileRoute("/_authenticated/_dashboard/profile")({
  component: Profile,
});

const profileUpdateMode = {
  profile: "profile",
  password: "password",
} as const;

type ProfileUpdateMode = keyof typeof profileUpdateMode;

function Profile() {
  const { user } = useAuth();

  const [updateMode, setUpdateMode] = useState<ProfileUpdateMode>();

  const handleProfileUpdate = useCallback(
    (mode?: ProfileUpdateMode) => () => {
      setUpdateMode(mode);
    },
    [setUpdateMode],
  );

  return (
    <section className="flex flex-col gap-3">
      <div className="pt-4 bg-secondary sticky top-0 z-10">
        <DashboardHeader icon={AvatarIcon} title="My Profile" />
      </div>
      <div className="flex items-start flex-wrap gap-4">
        <Card className="w-full max-w-[700px]">
          <CardContent className="p-6 flex gap-8">
            <Avatar className="w-24 h-24 md:w-32 md:h-32">
              <AvatarImage src={USER_AVATAR_URL} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl md:text-3xl">{user.displayName}</h1>
              <p className="text-sm md:text-base text-muted-foreground">
                {user.email}
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button
              disabled={updateMode === profileUpdateMode.profile}
              onClick={handleProfileUpdate(profileUpdateMode.profile)}
            >
              Edit Profile
            </Button>
            <Button
              disabled={updateMode === profileUpdateMode.password}
              variant="secondary"
              onClick={handleProfileUpdate(profileUpdateMode.password)}
            >
              Reset Password
            </Button>
          </CardFooter>
        </Card>
        {updateMode === profileUpdateMode.profile && (
          <UpdateProfileForm user={user} onCancel={handleProfileUpdate()} />
        )}
        {updateMode === profileUpdateMode.password && (
          <ResetPasswordForm onCancel={handleProfileUpdate()} />
        )}
      </div>
    </section>
  );
}
