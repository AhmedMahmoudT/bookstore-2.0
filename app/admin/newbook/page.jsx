"use client";
import Loading from "@/components/Loading";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { db, storage } from "@/app/firebase";
import { v4 } from "uuid";
import { uploadBytes, ref } from "firebase/storage";
import { useRef } from "react";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

const NewBook = () => {
  const [imageUpload, setImageUpload] = useState(null);
  const [loadingAfter, setLoadingAfter] = useState(false);
  const [initSub, setInitSub] = useState(false);
  const [book, setBook] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (initSub) {
      const addBook = async () => {
        await addDoc(collection(db, "books"), book);
      };

      addBook().then(() => {
        setLoadingAfter(true);
        router.push("/admin");
      });
    }
  }, [initSub, book, router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (imageUpload == null) return;

    const imglink = imageUpload.name + v4();
    const coverImageRef = ref(storage, `CoverImages/${imglink}`);
    setBook({
      ...book,
      coverImage: `https://firebasestorage.googleapis.com/v0/b/bookstore-mt.appspot.com/o/CoverImages%2F${imglink}?alt=media`,
    });

    uploadBytes(coverImageRef, imageUpload).then(() => {
      setInitSub(true);
    });
  };

  const handleLoading = () => {
    setLoadingAfter(true);
  };

  const inputRef = useRef();

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setImageUpload(e.dataTransfer.files[0]);
  };

  return (
    <main className="flex flex-col h-screen">
      <title>Bookstore Admin: New Book</title>
      <div className="m-auto">
        {!loadingAfter ? (
          <>
            <Link
              href="/admin"
              className="absolute 2xl:top-32 2xl:left-72 top-24 left-60 text-3xl border-4 border-intorange-600 text-intorange-600 rounded-full p-2 hover:bg-intorange-600 hover:text-white transition-all 2xl:scale-100 scale-[70%]"
              onClick={handleLoading}
            >
              <FaArrowLeft />
            </Link>
            <form className="2xl:scale-[90%] scale-[70%] 2xl:mt-20">
              <h1 className="text-5xl font-bold text-intorange-600">
                Add a New Book
              </h1>
              <table className="mt-10 w-full">
                <tbody className="text-2xl">
                  <tr className="h-16">
                    <td>
                      <p className="font-semibold me-7">Title</p>
                    </td>
                    <td>
                      <input
                        type="text"
                        className="border border-intorange-400 rounded w-48 py-1 px-1 focus:border-2 focus:border-intorange-600 focus:outline-none transition-all"
                        required
                        onChange={(e) =>
                          setBook({ ...book, title: e.target.value })
                        }
                      />
                    </td>
                    <td>
                      <p className="font-semibold mx-7">Author</p>
                    </td>
                    <td>
                      <input
                        type="text"
                        className="border border-intorange-400 rounded w-48 py-1 px-1 focus:border-2 focus:border-intorange-600 focus:outline-none transition-all"
                        required
                        onChange={(e) =>
                          setBook({ ...book, author: e.target.value })
                        }
                      />
                    </td>
                  </tr>
                  <tr className="h-16">
                    <td>
                      <p className="font-semibold me-7">Publisher</p>
                    </td>
                    <td>
                      <input
                        type="text"
                        className="border border-intorange-400 rounded w-48 py-1 px-1 focus:border-2 focus:border-intorange-600 focus:outline-none transition-all"
                        required
                        onChange={(e) =>
                          setBook({ ...book, publisher: e.target.value })
                        }
                      />
                    </td>
                    <td>
                      <p className="font-semibold mx-7">Publication Year</p>
                    </td>
                    <td>
                      <input
                        type="number"
                        className="border border-intorange-400 rounded w-48 py-1 px-1 focus:border-2 focus:border-intorange-600 focus:outline-none transition-all"
                        required
                        onChange={(e) =>
                          setBook({ ...book, publicationYear: e.target.value })
                        }
                      />
                    </td>
                  </tr>
                  <tr className="h-16">
                    <td>
                      <p className="font-semibold me-7">Category</p>
                    </td>
                    <td>
                      <input
                        type="text"
                        className="border border-intorange-400 rounded w-48 py-1 px-1 focus:border-2 focus:border-intorange-600 focus:outline-none transition-all"
                        required
                        onChange={(e) =>
                          setBook({ ...book, category: e.target.value })
                        }
                      />
                    </td>
                    <td>
                      <p className="font-semibold mx-7">Price</p>
                    </td>
                    <td>
                      <input
                        type="number"
                        className="border border-intorange-400 rounded w-48 py-1 px-1 focus:border-2 focus:border-intorange-600 focus:outline-none transition-all"
                        required
                        onChange={(e) =>
                          setBook({ ...book, price: e.target.value })
                        }
                      />
                    </td>
                  </tr>
                  <tr className="h-16">
                    <td>
                      <p className="font-semibold me-7">Available Copies</p>
                    </td>
                    <td>
                      <input
                        type="number"
                        className="border border-intorange-400 rounded w-48 py-1 px-1 focus:border-2 focus:border-intorange-600 focus:outline-none transition-all"
                        required
                        onChange={(e) =>
                          setBook({ ...book, availableCopies: e.target.value })
                        }
                      />
                    </td>
                    <td>
                      <p className="font-semibold mx-7">Total Copies</p>
                    </td>
                    <td>
                      <input
                        type="number"
                        className="border border-intorange-400 rounded w-48 py-1 px-1 focus:border-2 focus:border-intorange-600 focus:outline-none transition-all"
                        required
                        onChange={(e) =>
                          setBook({ ...book, totalCopies: e.target.value })
                        }
                      />
                    </td>
                  </tr>
                  <tr className="h-16">
                    <td>
                      <p className="font-semibold me-7">ISBN</p>
                    </td>
                    <td colSpan={3}>
                      <input
                        type="text"
                        className="border border-intorange-400 w-full rounded py-1 px-1 focus:border-2 focus:border-intorange-600 focus:outline-none transition-all"
                        required
                        onChange={(e) =>
                          setBook({ ...book, ISBN: e.target.value })
                        }
                      />
                    </td>
                  </tr>
                  <tr className="h-16">
                    <td>
                      <p className="font-semibold me-7">Description</p>
                    </td>
                    <td colSpan={3}>
                      <input
                        type="text"
                        className="border border-intorange-400 w-full rounded py-1 px-1 focus:border-2 focus:border-intorange-600 focus:outline-none transition-all"
                        required
                        onChange={(e) =>
                          setBook({ ...book, description: e.target.value })
                        }
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div
                className="flex flex-col items-center justify-center text-2xl py-2 border-2 rounded-lg border-dashed border-intorange-300 hover:border-intorange-600 transition-all my-5 cursor-pointer group"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => inputRef.current.click()}
              >
                {!imageUpload ? (
                  <div className="text-center">
                    <h1>Drag and Drop to Upload The Cover Image</h1>
                    <h1 className="text-intorange-300 group-hover:text-intorange-600 transition-all">
                      Or
                    </h1>
                    <h1>Select Cover Image</h1>
                  </div>
                ) : (
                  <div>
                    <h1>{imageUpload.name}</h1>
                  </div>
                )}
                <input
                  type="file"
                  onChange={(e) => setImageUpload(e.target.files[0])}
                  hidden
                  required
                  ref={inputRef}
                  accept="image/png, image/jpeg"
                />
              </div>
              <div className="w-full flex justify-end items-center mt-10">
                <button
                  className="h-12 w-40 text-3xl border-2 rounded border-intorange-400 text-intorange-400 hover:bg-intorange-600 hover:text-white hover:font-semibold group transition-all flex items-center justify-center"
                  onClick={(e) => handleSubmit(e)}
                > 
                  <p className="group-focus:hidden">Submit</p>
                  <div role="status" className="hidden group-focus:block">
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 text-intorange-200 dark:text-intorange-200 fill-intorange-600 group-hover:text-intorange-600 animate-spin group-hover:dark:text-intorange-600 group-hover:fill-white"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                </button>
              </div>
            </form>
          </>
        ) : (
          <Loading />
        )}
      </div>
    </main>
  );
};

export default NewBook;
