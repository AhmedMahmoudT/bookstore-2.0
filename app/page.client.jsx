"use client";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import Image from "next/image";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HomeClient() {

  const router = useRouter()
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingAfter, setLoadingAfter] = useState(false);

  const handleRouting = (id) => {
    setLoadingAfter(true)
  }

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
  }, [books, loading]);

  return (
    <main className="flex flex-col h-screen overflow-hidden">
      <div className="m-auto">
        {!loading && !loadingAfter ? (
          <div className="mt-20 grid grid-cols-3 gap-y-24 w-auto h-[750px] overflow-scroll no-scrollbar">
            {books.map((book,key)=>{
              return (
                <Link href={`/bookDetails/${book.id}`} onClick={()=>handleRouting(book.id)} key={key} className="flex flex-col items-center justify-center relative mx-20 hover:scale-110 transition-all cursor-pointer">
                  <Image src={book.coverImage} alt={book.title} width={2000} height={2000} style={{width: '250px', height: '400px'}}/>
                  <div className="text-xl w-[250px] absolute -bottom-12 h-10 flex justify-between">
                    <h1 className="my-auto w-3/4">{book.title}</h1>
                    <h1 className="my-auto"><sup>$</sup>{book.price}</h1>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </main>
  );
}
