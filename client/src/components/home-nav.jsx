import { Command } from "lucide-react";

export const HomeNav = ({ items, isAuth }) => {
  return (
    <div className="flex gap-6 md:gap-10">
      <a
        href={isAuth ? "/home" : "/"}
        className="hidden items-center space-x-2 md:flex"
      >
        <Command />
        <span className="hidden font-bold sm:inline-block">Job Portal</span>
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
