import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SideNav from "@/components/SideNav/SideNav.component";
import SideNavSheet from "@/components/SideNav/SideNavSheet.component";
import { ThemeModeToggle } from "@/components/ThemeModeToggle";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { USER_AVATAR_URL } from "@/constants/userManagement";
import QuantumImagingLabsLogo from "@/assets/logo.svg?react";

export const Route = createFileRoute("/_authenticated/_dashboard")({
  component: DashboardLayout,
});

function DashboardLayout() {
  const { user } = useAuth();

  return (
    <div className="grid h-screen overflow-hidden w-full grid-rows-[60px_1fr] bg-secondary">
      <header className="flex items-center justify-between gap-4 shadow-md bg-background px-4 h-full lg:px-6 z-50">
        <SideNavSheet />
        <Link className="flex items-center gap-2 font-semibold h-full" to="/">
          <QuantumImagingLabsLogo className="w-28 h-full" />
        </Link>
        <div className="flex items-center gap-3">
          <ThemeModeToggle />
          {/* <Button
            className="h-8 w-8 rounded-full"
            size="icon"
            variant="outline"
          >
            <BellIcon className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button> */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="rounded-full h-8 w-8"
                size="icon"
                variant="secondary"
              >
                <Avatar className="w-full h-full">
                  <AvatarImage src={USER_AVATAR_URL} />
                  <AvatarFallback>{user.displayName.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{user.displayName}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link preload={false} to="/logout">
                  Logout
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <div className="grid min-h-full w-full md:grid-cols-[auto_1fr]">
        <SideNav />
        <div className="flex flex-col overflow-auto">
          <main className="flex-1 px-4 md:px-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
