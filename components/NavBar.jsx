import Link from "next/link";
import { MdOutlineShoppingCart } from "react-icons/md";

const NavBar = ({setHidden}) => {
  return (
    <div className="absolute top-0 w-screen flex justify-between items-center h-24 my-auto px-40">
      <Link href={"/"} className="text-3xl font-semibold text-intorange-700 hover:font-bold hover:text-intorange-600 text-center transition-all">
        Bookstore
      </Link>
      <div className="flex gap-10 text-lg items-center justify-center">
        <button className="hover:text-intorange-600 font-semibold text-intorange-700 text-center hover:font-bold transition-all">
          Sign in
        </button>
        <button className="px-4 hover:text-intorange-700 hover:bg-white border-2 border-[#E84E08] bg-intorange-700 text-white rounded transition-all">
          Join
        </button>
        <button className="border-2 border-intorange-500 hover:bg-intorange-600 hover:text-white text-intorange-600 flex gap-2 items-center justify-center px-4 rounded transition-all" onClick={() => setHidden(false)}>
          <MdOutlineShoppingCart /> Cart
        </button>
      </div>
    </div>
  );
};

export default NavBar;
