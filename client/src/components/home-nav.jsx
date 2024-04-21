import { useSelector } from "react-redux";
import { LogoImage } from "./logo-image";


export const HomeNav = ({ items, isAuth }) => {
  const user = useSelector((state) => state.user);
  const role = user ? user.role : null;

  return (
    <div className="flex gap-6 md:gap-10 items-center">
      <a
        href={isAuth ? `/${role.toLowerCase()}/home` : "/"}
        className="hidden items-center space-x-2 md:flex"
      >
        <LogoImage className="h-12 w-12" />
        <span className="hidden font-bold sm:inline-block">Portal de empleo</span>
      </a>
      {items?.length ? (
        <nav className="hidden gap-6 md:flex">
          {items?.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm"
            >
              {item.title}
            </a>
          ))}
        </nav>
      ) : null}
    </div>
  );
};
