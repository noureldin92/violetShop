import {
  useAppDispatch,
  useAppSelector,
} from "../../Store/reduxHooks.tsx/hooks";
import { Container } from "../Container/Container";
import { AnimatePresence } from "framer-motion";
import MenuItems from "./Menu/MenuItems";
import Logo from "./Logo/Logo";
import MenuIcon from "./MenuIcon/MenuIcon";
import authorize from "../../utilities/authorize";
import { useEffect } from "react";
import { getAPICartItems } from "../../Store/StoreSlices/CartSlice/CartSlice";

import CartShortcut from "./CartShortcut/CartShortcut";
import { useLocation } from "react-router";
const Navbar = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const isCartPage = location.pathname.includes("cart");
  const isOpen = useAppSelector((state) => state.siteMapSlice.isOpen);
  const isLoggedIn = useAppSelector((state) => state.authorization.loggedIn);

  useEffect(() => {
    //refresher function for render.com avoiding auth server sleeping
    authorize("login", "moimenwy@gmail.com", "01144026773");
    //refresher function for render.com avoiding user prodcuts server sleeping
    dispatch(getAPICartItems("initialemptyarray"));
  }, []);
  return (
    <nav className="z-10 sticky top-0  w-full h-16 dark:bg-gradient-to-r dark:from-darkViolet/50 dark:via-simidarkViolet/50 dark:to-darkViolet/50 bg-gradient-to-r from-violet-200/50 to-lightestViolet/50">
      <Container>
        <aside className="h-full flex justify-between items-center">
          <Logo />
          <span className="flex justify-center items-center space-x-8">
            {isLoggedIn && !isCartPage && <CartShortcut />}
            <MenuIcon />
          </span>
        </aside>
        <AnimatePresence>{isOpen && <MenuItems />}</AnimatePresence>
      </Container>
      <span className="absolute z-0 -bottom-1 w-full h-1 bg-gradientt-r-to-l dark:bg-gradient-r-to-l bg-[length:500%_500%] dark:bg-[length:500%_500%] dark:animate-darkgradient animate-lightgradient"></span>
    </nav>
  );
};

export default Navbar;
