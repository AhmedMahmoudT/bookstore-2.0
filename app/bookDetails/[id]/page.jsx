"use client";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import Image from "next/image";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import { PiListHeartBold } from "react-icons/pi";
import { addBook } from "@/features/cartSlice";
import { useDispatch } from "react-redux";

const BookDetails = ({ params }) => {
  const id = params.id;
  const dispatch = useDispatch()

  const [book, setBook] = useState({});
  const [title, setTitle] = useState('Bookstore');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [qntCounter, setqntCounter] = useState(1)
  
  const addToCart = () => {
    dispatch(addBook({...book,qnt:qntCounter}))
  }

  const incrementQnt = () => {
    qntCounter<book.availableCopies&&setqntCounter(prev => prev + 1)
  }

  const decrementQnt = () => {
    qntCounter>1&&setqntCounter(prev => prev - 1)
  }

  useEffect(() => {
    const q = query(collection(db, "books"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let booksArr = [];

      querySnapshot.forEach((doc) => {
        booksArr.push({ ...doc.data(), id: doc.id });
      });
      const bookFind = booksArr.filter((book) => book.id == id)[0];

      if (bookFind) {
        setBook(bookFind);
        setLoading(false);
        setTitle('Bookstore: '+book.title)
      } else {
        setError(true);
        return;
      }
    });
  }, [book, id]);

  return (
    <main className="flex flex-col h-screen">
      <div className="m-auto">
        {!loading ? (
          <>
          <title>{title}</title>
          <div className="flex gap-10 justify-center items-center">
            <Image
              src={book.coverImage}
              alt={book.title}
              width={2000}
              height={2000}
              className="mx-20"
              style={{ width: "360px", height: "576px" }}
            />
            <div className="w-2/4 flex flex-col relative">
              <h1 className="text-6xl mb-5">
                {book.title} - {book.author}
              </h1>
              <p className="text-xl text-justify my-5">
              <span className="font-bold">Description:</span> {book.description}
              </p>
              <button className="rounded-full border-2 border-blue-500 text-xl w-fit px-5 text-center text-blue-500 font-semibold hover:text-white hover:bg-blue-500 transition-all my-5">{book.category}</button>
              <div className="flex gap-10 justify-start items-center mb-5">
              <div className="h-fit w-10 flex flex-col items-center justify-center border-2 rounded-full border-intorange-600">
                <button onClick={incrementQnt} className="w-10 flex justify-center items-center text-intorange-600 rounded-t-full hover:bg-intorange-600 hover:text-white transition-all text-3xl border-b-2 border-intorange-600">
                <IoMdArrowDropup />
                </button>
                <button onClick={decrementQnt} className="w-10 flex justify-center items-center text-intorange-600 rounded-b-full hover:bg-intorange-600 hover:text-white transition-all text-3xl">
                <IoMdArrowDropdown />
                </button>
              </div>
              <p className="text-xl font-semibold">Qnt: {qntCounter}</p>
              </div>
              <p className="text-xl font-semibold">Available Copies: {book.availableCopies}</p>
              <div className="flex gap-5 mx-auto mt-14 items-center w-fit">
                <p className="text-2xl font-bold text-justify"><sup>$</sup>{book.price}</p>
                <button className="px-4 py-2 text-intorange-600 border-2 border-intorange-600 hover:bg-intorange-600 hover:text-white rounded transition-all text-xl flex gap-3 items-center w-fit" onClick={addToCart}><MdOutlineAddShoppingCart /> Add to Cart</button> or
                <button className="px-4 py-2 bg-intorange-400 text-white hover:text-intorange-400 border-2 border-intorange-400 hover:bg-white rounded transition-all text-xl flex gap-3 items-center"><PiListHeartBold /> Wishlist</button>
              </div>
            </div>
          </div>
          </>
        ) : (error?(<h1 className="text-6xl text-intorange-600 font-bold">Book not Found <span className="ms-10 text-7xl">:(</span></h1>):(
          <Loading />
        ))}
      </div>
    </main>
  );
};

export default BookDetails;
