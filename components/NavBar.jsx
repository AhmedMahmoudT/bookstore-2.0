import Link from "next/link";
import { MdOutlineShoppingCart } from "react-icons/md";

const NavBar = ({setHidden}) => {
  return (
    <div className="absolute top-0 w-screen flex justify-between items-center h-24 my-auto px-40">
      <Link href={"/"} className="flex justify-center items-center group text-3xl font-semibold text-intorange-600 hover:text-intorange-500 hover:scale-110 transition-all">
      <div className="me-[2px] mt-[6px] relative">
            <div className="w-[12px] h-[10px] rounded rounded-b-none bg-intorange-600 group-hover:bg-intorange-500 transition-all flex items-center justify-center absolute -top-[6px]">
              <div className="w-[50%] h-[60%] bg-white rounded-full"></div>
            </div>
            <div className="w-[15px] h-[15px] rounded bg-intorange-600 group-hover:bg-intorange-500 transition-all flex items-center justify-center">
            <div className="w-[50%] mt-[2px] me-[1px] h-[40%] bg-white rounded-full"></div>

            </div>
      </div>
        ookstore
      </Link>
      <div className="flex gap-10 text-lg items-center justify-center">
        <button className="w-14 hover:text-intorange-600 font-semibold text-intorange-700 text-center hover:font-bold transition-all">
          Sign in
        </button>
        <button className="w-16 hover:text-intorange-700 hover:bg-white border-2 border-[#E84E08] bg-intorange-700 hover:font-bold text-white rounded transition-all">
          Join
        </button>
        <button className="w-24 border-2 border-intorange-500 hover:bg-intorange-600 hover:text-white text-intorange-600 flex gap-2 items-center justify-center rounded hover:font-bold transition-all" onClick={() => setHidden(false)}>
          <MdOutlineShoppingCart /> Cart
        </button>
      </div>
    </div>
  );
};

export default NavBar;
