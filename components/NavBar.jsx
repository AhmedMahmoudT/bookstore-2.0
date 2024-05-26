import Link from "next/link";
import { MdOutlineShoppingCart } from "react-icons/md";

const NavBar = ({setHidden}) => {
  return (
    <div className="absolute top-0 w-screen flex justify-between items-center h-24 my-auto px-40">
      <Link href={"/"} className="text-3xl font-semibold">
        Bookstore
      </Link>
      <div className="flex gap-10 text-lg items-center justify-center">
        <button className="hover:text-blue-500 transition-all">
          Sign in
        </button>
        <button className="px-4 text-blue-500 border-2 border-blue-400 hover:bg-blue-400 hover:text-white rounded transition-all">
          Join
        </button>
        <button className="border-2 border-orange-400 hover:bg-orange-400 hover:text-white text-orange-500 flex gap-2 items-center justify-center px-4 rounded transition-all" onClick={() => setHidden(false)}>
          <MdOutlineShoppingCart /> Cart
        </button>
      </div>
    </div>
  );
};

export default NavBar;
