import { HomeFooter } from "@/components/home-footer";
import { HomeNav } from "@/components/home-nav";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { setLogout } from "@/state";
import { useDispatch, useSelector } from "react-redux";
import { Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";

const itemsHome = [
  { title: "Inicio", href: "/" },
  { title: "Empleos", href: "/jobs" },
];

const LayoutHome = ({ children, isAuth = false, items = itemsHome }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <HomeNav items={items} isAuth={isAuth} />
          {isAuth ? (
            <nav className="flex items-center">
              {user && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <img
                      className="w-[5rem] h-[5rem] p-2 object-cover rounded-full"
                      src={`http://localhost:3003/assets/${user?.role}s/${user?.picturePath}`}
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>{user?.firstName} {user?.lastName}</DropdownMenuLabel>
                    <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
                    <DropdownMenuLabel>{user?.role}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => navigate(`/${user?.role.toLowerCase()}/profile`)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Editar perfil
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              <button
                className={cn(
                  buttonVariants({ variant: "secondary", size: "sm" })
                )}
                onClick={() => dispatch(setLogout())}
              >
                Cerrar sesión
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
                Ingresar
              </a>
              <a
                href="/register"
                className={cn(
                  buttonVariants({ variant: "primary", size: "sm" }),
                  "px-4"
                )}
              >
                Registrarse
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
