"use client";
import { IoCloseOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { removeBook, incrementQnt, decrementQnt } from "@/features/cartSlice";
import Image from "next/image";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import Link from "next/link";

const Cart = ({ hidden, setHidden }) => {
  const books = useSelector((state) => state.cart.books);
  const dispatch = useDispatch();

  const hideCart = () => {
    setHidden(true);
  };

  const handleIncrementQnt = (id) => {
    dispatch(incrementQnt(id));
  };

  const handleDecrementQnt = (id) => {
    dispatch(decrementQnt(id));
  };

  const handleRemoveBook = (id) => {
    dispatch(removeBook(id));
  };

  const handleCheckout = () => {
    console.log("checkout handled!");
  };

  return (
    <div
      className={`z-20 border-x-2 border-intorange-600 absolute w-1/3 h-[100vh] bg-white ${
        hidden ? "-right-[2200px]" : "-right-10"
      } transition-all ease-in-out`}
    >
      <div className="2xl:scale-100 scale-90 transition-all">
        <button
          onClick={hideCart}
          className="text-intorange-600 2xl:m-5 m-0 text-6xl"
        >
          <IoCloseOutline />
        </button>
        <div className="2xl:mt-0 mt-5 h-[75vh]">
          {books.length<1?
          (<div>

          </div>)
          :
(          <div className="h-fit overflow-scroll no-scrollbar flex flex-col gap-5">
            {books.map((book, key) => {
              return (
                <div className="flex gap-5 m-auto mx-10" key={key}>
                  <button
                    onClick={() => handleRemoveBook(book.id)}
                    className="p-2 bg-intorange-600 text-white text-xl hover:bg-intorange-500 transition-all"
                  >
                    <IoCloseOutline />
                  </button>
                  <Image
                    src={book.coverImage}
                    alt={book.title}
                    width={2000}
                    height={2000}
                    className="w-[120px] h-[200px]"
                  />
                  <div className="flex flex-col gap-3 justify-center">
                    <p className="text-xl font-semibold">{book.title}</p>
                    <div className="flex gap-4 items-center justify-start">
                      <div className="h-fit w-10 flex flex-col items-center justify-center border-2 rounded-full border-intorange-600">
                        <button
                          onClick={() => handleIncrementQnt(book.id)}
                          className="w-10 flex justify-center items-center text-intorange-600 rounded-t-full hover:bg-intorange-600 hover:text-white transition-all text-3xl border-b-2 border-intorange-600"
                        >
                          <IoMdArrowDropup />
                        </button>
                        <button
                          onClick={() => handleDecrementQnt(book.id)}
                          className="w-10 flex justify-center items-center text-intorange-600 rounded-b-full hover:bg-intorange-600 hover:text-white transition-all text-3xl"
                        >
                          <IoMdArrowDropdown />
                        </button>
                      </div>
                      <p className="text-xl font-semibold">Qnt: {book.qnt}</p>
                    </div>
                    <p className="relative text-xl font-semibold">
                      <span className="absolute -left-2 -top-2 text-sm">$</span>
                      {book.price * book.qnt}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>)}
        </div>
        {books.length!==0&&<div className="flex gap-14 items-center justify-center bg-white pt-5">
          <p className="relative text-xl font-semibold">
            <span className="absolute -left-2 -top-2 text-sm">$</span>100
          </p>
          <Link
            href={"/checkout"}
            onClick={handleCheckout}
            className="px-4 py-2 text-xl border-2 border-intorange-600 text-intorange-600 gap-4 rounded hover:bg-intorange-600 hover:text-white flex justify-center items-center transition-all"
          >
            <MdOutlineShoppingCartCheckout /> Checkout
          </Link>
        </div>}
      </div>
    </div>
  );
};

export default Cart;
