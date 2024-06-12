"use client";
import { collection, query, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import Image from "next/image";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { FaRegQuestionCircle, FaRegEdit, FaBackspace } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import Link from "next/link";


export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingAfter, setLoadingAfter] = useState(false);

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

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "books", id));
  }

  const handleLoading = () => {
    setLoadingAfter(true)
  }

  return (
    <main className="flex flex-col h-screen">
      <title>Bookstore Admin Mode</title>
      <div className="m-auto">
        {!loading && !loadingAfter ? (
          <div className="2xl:scale-[85%] scale-[70%] 2xl:mt-14 mt-0 text-xl">
            <table className="mx-auto text-center table table-fixed">
              <thead>
                <th className="w-[225px] border-black">Title</th>
                <th className="w-[225px] border-black">ISBN</th>
                <th className="w-[225px] border-black">Author</th>
                <th className="w-[225px] border-black">Category</th>
                <th className="w-[225px] border-black">Price</th>
                <th className="w-[225px] border-black">Image</th>
                <th className="w-[225px] border-black">
                  <Link href="/admin/newbook" className="flex items-center justify-center gap-2 border py-1 border-intorange-600 rounded text-intorange-600 hover:bg-intorange-600 hover:text-white transition-all"
                  onClick={handleLoading}
                  ><FaPlus /> New Book</Link>
                </th>
              </thead>
            </table>
            <div className="w-screen h-[700px] overflow-scroll no-scrollbar mt-5">
              <table className="mx-auto text-center table table-fixed">
                <tbody>
                  {books.map((book, key) => {
                    return (
                      <tr key={key} className="h-[100px]">
                        <td className="w-[225px] h-[125px] border-t border-black">
                          {book.title}
                        </td>
                        <td className="w-[225px] h-[125px] border-t border-black">
                          {book.ISBN}
                        </td>
                        <td className="w-[225px] h-[125px] border-t border-black">
                          {book.author}
                        </td>
                        <td className="w-[225px] h-[125px] border-t border-black">
                          {book.category}
                        </td>
                        <td className="w-[225px] h-[125px] border-t border-black">
                          {book.price}
                        </td>
                        <td className="w-[225px] h-[125px] border-t border-black">
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
                            <Link
                              className="hover:text-intorange-600 transition-all"
                              href={`admin/info/${book.id}`}
                              onClick={handleLoading}
                            >
                              <FaRegQuestionCircle />
                            </Link>
                          </div>
                        </td>
                        <td className="w-[75px] h-[125px] border-t border-black text-[30px]">
                          <div className="flex items-center justify-center">
                            <Link
                              className="hover:text-intorange-600 transition-all"
                              href={`admin/edit/${book.id}`}
                              onClick={handleLoading}
                            >
                              <FaRegEdit />
                            </Link>
                          </div>
                        </td>
                        <td className="w-[75px] h-[125px] border-t border-black text-[30px]">
                          <div className="flex items-center justify-center">
                            <button className="hover:text-intorange-600 transition-all" onClick={() => handleDelete(book.id)}>
                              <FaBackspace />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </main>
  );
}
