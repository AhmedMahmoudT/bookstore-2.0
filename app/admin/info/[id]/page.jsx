"use client";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "@/app/firebase";
import Image from "next/image";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { FaArrowLeft } from "react-icons/fa";
import { FaRegEdit, FaBackspace } from "react-icons/fa";
import Link from "next/link";


const Info = ({ params }) => {
  const id = params.id;

  const [book, setBook] = useState({title:'',coverImage:'',price:0});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false)

  useEffect(() => {
    const q = query(collection(db, "books"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let booksArr = [];

      querySnapshot.forEach((doc) => {
        booksArr.push({ ...doc.data(), id: doc.id });
      });
      const bookFind = booksArr.filter((book) => book.id == id)[0];
      try {
        setBook(bookFind);
        setLoading(false);
      } catch (error) {
        setError(true)
      }
    });
  }, [book, id]);

  return (
    <main className="flex flex-col h-screen">
      <div className="m-auto">
      <Link href="/admin" className="absolute top-32 left-72 text-3xl border-4 border-orange-500 text-orange-500 rounded-full p-2 hover:bg-orange-500 hover:text-white transition-all"><FaArrowLeft /></Link>
      {!loading ? (
          <div className="flex gap-10 justify-center items-center mt-10">
            <Image
              src={book.coverImage}
              alt={book.title}
              width={2000}
              height={2000}
              className="mx-20"
              style={{ width: "360px", height: "576px" }}
            />
            <div className="w-[750px] flex flex-col relative">
              <h1 className="text-6xl mb-10">
                {book.title} - {book.author}
              </h1>
              <p className="text-xl text-justify">
                <span className="font-bold">Description:</span> {book.description}
              </p>
              <button className="rounded-full border-2 border-blue-500 text-xl w-fit px-5 text-center text-blue-500 font-semibold hover:text-white hover:bg-blue-500 transition-all my-5">{book.category}</button>
              <p className="text-xl mb-5"><span className="font-bold">Publisher:</span> {book.publisher}</p>
              <p className="text-xl mb-5"><span className="font-bold">Publication year:</span> {book.publicationYear}</p>
              <p className="text-xl mb-5"><span className="font-bold">ISBN:</span> {book.ISBN}</p>
              <p className="text-xl mb-5"><span className="font-bold">Available Copies:</span> {book.availableCopies}</p>
              <p className="text-xl mb-5"><span className="font-bold">Total Copies:</span> {book.totalCopies}</p>
              <p className="text-2xl font-bold text-justify relative mb-5"><sup className="absolute top-3 -left-3">$</sup>{book.price}</p>
              <div className="flex gap-5 mx-auto mt-15 items-center">
                <button className="px-4 py-2 text-orange-500 border-2 border-orange-500 hover:bg-orange-500 hover:text-white rounded transition-all text-xl flex gap-3 items-center"><FaRegEdit /> Edit</button>
                <button className="px-4 py-2 text-red-500 border-2 border-red-500 hover:bg-red-500 hover:text-white rounded transition-all text-xl flex gap-3 items-center"><FaBackspace /> Delete</button>
              </div>
            </div>
          </div>
        ) : (error?(<h1 className="text-6xl text-intorange-600 font-bold">Book not Found <span className="ms-10 text-7xl">:(</span></h1>):(
          <Loading />
        ))}
      </div>
    </main>
  );
};

export default Info;
