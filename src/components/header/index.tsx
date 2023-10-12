import { CartIcon } from "assets/svgs";
import Image from "components/Image";
import { useShoppingCart } from "hooks/contexthooks/useShoppingCart";
import { Link } from "react-router-dom";

type Props = {};

const Header = (props: Props) => {
  const { cartQuantity } = useShoppingCart();
  return (
    <nav className="flex-no-wrap relative flex w-full items-center justify-between bg-[#FBFBFB] py-2 shadow-md shadow-black/5 dark:bg-neutral-600 dark:shadow-black/10 lg:flex-wrap lg:justify-start lg:py-4">
      <div className="flex w-full flex-wrap items-center justify-between px-3">
        {/* <!-- Hamburger button for mobile view --> */}

        {/* <!-- Collapsible navigation container --> */}
        <div
          className="!visible  flex-grow basis-[100%] items-center lg:!flex lg:basis-auto"
          id="navbarSupportedContent1"
        >
          {/* <!-- Logo --> */}
          <Link
            className="mb-4 ml-2 mr-5 mt-3 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:mb-0 lg:mt-0"
            to={"#"}
          >
            <Image
              src="https://tecdn.b-cdn.net/img/logo/te-transparent-noshadows.webp"
              height={15}
              width={15}
              alt="TE Logo"
              loading="lazy"
            />
          </Link>
          {/* <!-- Left navigation links --> */}
          <ul
            className="list-style-none mr-auto flex  pl-0 lg:flex-row"
            data-te-navbar-nav-ref
          >
            <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
              {/* <!-- Dashboard link --> */}
              <Link
                className="text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-zinc-400"
                to="/"
                data-te-nav-link-ref
              >
                Home
              </Link>
            </li>
          </ul>
        </div>

        {/* <!-- Right elements --> */}
        <div className="relative flex items-center">
          {/* <!-- Cart Icon --> */}
          <Link
            className="mr-4 relative text-neutral-600 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
            to="/cart"
          >
            <span className="[&>svg]:w-5">
              <CartIcon className="fill-blue-900" />{" "}
              <span className="absolute bottom-0 z-10 flex align-middle justify-center -top-4 -right-2  font-bold">
                {cartQuantity}
              </span>
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
