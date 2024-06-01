import Link from "next/link";
import { MdOutlineShoppingCart } from "react-icons/md";

const NavBar = ({setHidden}) => {
  return (
    <div className="absolute top-0 w-screen flex justify-between items-center h-24 my-auto px-40">
      <Link href={"/"} className="group text-3xl font-semibold text-intorange-600 hover:text-intorange-500 transition-all flex justify-center items-center">
      <div className="me-[2px] mt-[6px] relative">
            <div className="w-[12px] h-[10px] rounded rounded-b-none bg-intorange-600 group-hover:bg-intorange-500 transition-all flex items-center justify-center absolute -top-[6px]">
              <div className="w-[50%] h-[60%] bg-white rounded-full"></div>
            </div>
            <div className="w-[15px] h-[15px] rounded bg-intorange-600 group-hover:bg-intorange-500 transition-all flex items-center justify-center">
            <div className="w-[60%] mt-[2px] h-[60%] bg-white rounded-full"></div>

            </div>
      </div>
        ookstore
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
