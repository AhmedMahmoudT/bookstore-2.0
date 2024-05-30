"use client";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import Image from "next/image";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { FaRegQuestionCircle, FaRegEdit, FaBackspace } from "react-icons/fa";
import Link from "next/link";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "books"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let booksArr = [];

      querySnapshot.forEach((doc) => {
        booksArr.push({ ...doc.data(), id: doc.id });
      });
      setBooks(booksArr);
      setLoading(false);
    });
  }, [books]);

  return (
    <main className="flex flex-col h-screen">
      <title>Bookstore Admin Mode</title>
      <div className="m-auto">
        {!loading ? (
          <>
            <table className="mt-20 mx-auto text-center table table-fixed">
              <thead>
                <th className="w-[200px] border-black">Title</th>
                <th className="w-[200px] border-black">ISBN</th>
                <th className="w-[200px] border-black">Author</th>
                <th className="w-[200px] border-black">Category</th>
                <th className="w-[200px] border-black">Price</th>
                <th className="w-[200px] border-black">Image</th>
                <th className="w-[225px] border-black"></th>
              </thead>
            </table>
            <div className="w-screen h-[700px] overflow-scroll no-scrollbar mt-5">
              <table className="mx-auto text-center table table-fixed">
                <tbody>
                  {books.map((book, key) => {
                    return (
                      <tr key={key} className="h-[100px]">
                        <td className="w-[200px] h-[125px] border-t border-black">
                          {book.title}
                        </td>
                        <td className="w-[200px] h-[125px] border-t border-black">
                          {book.ISBN}
                        </td>
                        <td className="w-[200px] h-[125px] border-t border-black">
                          {book.author}
                        </td>
                        <td className="w-[200px] h-[125px] border-t border-black">
                          {book.category}
                        </td>
                        <td className="w-[200px] h-[125px] border-t border-black">
                          {book.price}
                        </td>
                        <td className="w-[200px] h-[125px] border-t border-black">
                          <div className="flex items-center justify-center">
                            <Image
                              src={book.coverImage}
                              alt={book.title}
                              width={2000}
                              height={2000}
                              style={{ width: "50px", height: "80px" }}
                            />
                          </div>
                        </td>
                        <td className="w-[75px] h-[125px] border-t border-black text-[30px]">
                          <div className="flex items-center justify-center ">
                          <Link className="hover:text-blue-500 transition-all" href={`admin/info/${book.id}`}><FaRegQuestionCircle /></Link>
                          </div>
                        </td>
                        <td className="w-[75px] h-[125px] border-t border-black text-[30px]">
                          <div className="flex items-center justify-center">
                          <Link className="hover:text-orange-500 transition-all" href={`admin/edit/${book.id}`}><FaRegEdit /></Link>
                          </div>
                        </td>
                        <td className="w-[75px] h-[125px] border-t border-black text-[30px]">
                          <div className="flex items-center justify-center">
                            <button className="hover:text-red-500 transition-all"><FaBackspace /></button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <Loading />
        )}
      </div>
    </main>
  );
}
