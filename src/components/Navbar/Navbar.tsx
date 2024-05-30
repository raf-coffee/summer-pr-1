import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="flex justify-center items-center gap-4 h-12">
      <NavLink
        to={"/"}
        className="uppercase tracking-wider underline decoration-transparent hover:decoration-black hover:decoration-2 hover underline-offset-4 transition-all px-4"
      >
        Главная
      </NavLink>
      <NavLink
        to={"/currencies"}
        className="uppercase tracking-wider underline decoration-transparent hover:decoration-black hover:decoration-2 hover underline-offset-4 transition-all px-4"
      >
        Валюты
      </NavLink>
    </nav>
  );
};
