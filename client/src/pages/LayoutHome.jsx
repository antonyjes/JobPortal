import { HomeFooter } from "@/components/home-footer";
import { HomeNav } from "@/components/home-nav";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { setLogout } from "@/state";
import { useDispatch } from "react-redux";

const LayoutHome = ({ children, isAuth = false }) => {
  const dispatch = useDispatch();
  const items = [
    { title: "Inicio", href: "/" },
    { title: "Jobs", href: "/jobs" },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <HomeNav items={items} isAuth={isAuth} />
          {isAuth ? (
            <nav>
              <button
                className={cn(
                  buttonVariants({ variant: "secondary", size: "sm" })
                )}
                onClick={() => dispatch(setLogout())}
              >
                Sign out
              </button>
            </nav>
          ) : (
            <nav>
              <a
                href="/login"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "sm" }),
                  "px-4"
                )}
              >
                Login
              </a>
              <a
                href="/register"
                className={cn(
                  buttonVariants({ variant: "primary", size: "sm" }),
                  "px-4"
                )}
              >
                Register
              </a>
            </nav>
          )}
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <HomeFooter />
    </div>
  );
};

export default LayoutHome;