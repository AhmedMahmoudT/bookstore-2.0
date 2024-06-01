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
          <div className="mt-20 grid grid-cols-3 px-[10%] 2xl:gap-y-24 xl:gap-y-20 gap-y-14 w-screen 2xl:h-[700px] xl:h-[500px] h-[400px] overflow-scroll no-scrollbar">
            {books.map((book,key)=>{
              return (
                <Link href={`/bookDetails/${book.id}`} onClick={()=>handleRouting(book.id)} key={key} className="flex flex-col items-center justify-center relative hover:scale-110 transition-all cursor-pointer">
                  <Image src={book.coverImage} alt={book.title} width={2000} height={2000} className="2xl:w-[250px] 2xl:h-[400px] xl:w-[200px] xl:h-[320px] lg:w-[150px] lg:h-[240px] w-[100px] h-[160px]"/>
                  <div className="text-[8px] lg:text-[10px] xl:text-base 2xl:text-xl 2xl:w-[250px] xl:w-[200px] lg:w-[150px] w-[100px] absolute -bottom-12 h-10 flex justify-between">
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
