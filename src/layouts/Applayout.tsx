import clsx from "clsx";
import Header from "components/header";
import { ShoppingCartProvider } from "context/ShoppingCartContext";

import { Outlet } from "react-router-dom";

type Props = {
  className?: string;
};

const Applayout = (props: Props) => {
  const { className } = props;
  return (
    <ShoppingCartProvider>
      <div className={clsx("h-full w-full", className)}>
        <Header />
        <main className="app_content h-full w-full">
          <Outlet />
        </main>
      </div>
    </ShoppingCartProvider>
  );
};

export default Applayout;
