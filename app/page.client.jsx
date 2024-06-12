"use client";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import Image from "next/image";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";

export default function HomeClient() {

  const router = useRouter()
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingAfter, setLoadingAfter] = useState(false);

  const handleLoading = (id) => {
    setLoadingAfter(true)
    router.push(`/bookDetails/${id}`)
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
          <div className="mt-10 m-auto 2xl:mt-20 grid 2xl:grid-cols-3 grid-cols-1 justify-center items-center 2xl:gap-y-24 gap-y-32 w-screen 2xl:h-[700px] xl:h-[500px] h-[480px] overflow-scroll no-scrollbar">
            {books.map((book)=>{
              return (
                <div key={book.id} className="relative w-full flex items-center justify-center">
                  <div className="hover:scale-110 transition-all cursor-pointer border-2 w-fit" onClick={()=>handleLoading(book.id)}>
                    <Image src={book.coverImage} alt={book.title} width={2000} height={2000} className="2xl:w-[250px] 2xl:h-[400px] w-[275px] h-[460px] "/>
                    <div className="text-xl 2xl:w-[250px] w-[275px] absolute -bottom-12 h-10 flex justify-between">
                      <h1 className="my-auto w-3/4">{book.title}</h1>
                      <h1 className="my-auto"><sup>$</sup>{book.price}</h1>
                    </div>
                  </div>
                  
                </div>
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
