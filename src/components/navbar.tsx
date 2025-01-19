import Image from "next/image";
import Link from "next/link";
// import { auth, signOut } from "@/app/(auth)/auth";

import { History } from "./custom/history";
import { SlashIcon } from "./custom/icons";
import { ThemeToggle } from "./custom/theme-toggle";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import tipsitiImageDark from "../../public/tipsiti-logo-dark.png";
import tipsitiImageLight from "../../public/tipsiti-logo-light.png";
import Share from "./share";

export default async function Navbar() {
  // const session = await auth();
  return (
    <>
      <div className="bg-background/90 backdrop-filter backdrop-blur-sm h-14 horizontal-padding fixed top-0 inset-x-0 z-30 w-full justify-between flex flex-row items-center">
        <div className="flex gap-3 items-center">
          {/* <History user={session?.user} /> */}
          <Link href="/">
            <Image
              src={tipsitiImageLight}
              alt="Tipsiti Logo"
              width={240}
              height={48}
              className="h-6 w-auto hidden dark:inline-block"
            />
            <Image
              src={tipsitiImageDark}
              alt="Tipsiti Logo"
              width={240}
              height={48}
              className="h-6 w-auto dark:hidden"
            />
          </Link>
        </div>
        <div className="flex items-center gap-5">
          <Share />
          <Button size="sm" asChild>
            <Link href="/itinerary">Itinerary</Link>
          </Button>
          {/* {session ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="py-1.5 px-2 h-fit font-normal"
                variant="secondary"
              >
                {session.user?.email}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <ThemeToggle />
              </DropdownMenuItem>
              <DropdownMenuItem className="p-1 z-50">
                <form
                  className="w-full"
                  action={async () => {
                    "use server";

                    await signOut({
                      redirectTo: "/",
                    });
                  }}
                >
                  <button
                    type="submit"
                    className="w-full text-left px-1 py-0.5 text-red-500"
                  >
                    Sign out
                  </button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button className="py-1.5 px-2 h-fit font-normal" asChild>
            <Link href="/login">Login</Link>
          </Button>
        )} */}
        </div>
      </div>
    </>
  );
}
