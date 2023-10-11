import clsx from "clsx";
import Header from "components/header";
import { Outlet } from "react-router-dom";

type Props = {
  className?: string;
};

const Applayout = (props: Props) => {
  const { className } = props;
  return (
    <div className={clsx("app_layout", className)}>
      <Header />
      <main className="app_content">
        <Outlet />
      </main>
    </div>
  );
};

export default Applayout;
