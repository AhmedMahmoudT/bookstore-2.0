import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col h-screen overflow-hidden">
      <title>Page Not Found</title>
      <div className="m-auto text-center text-4xl">
      <h1 className="text-9xl mb-10 text-intorange-600 font-bold italic">404!</h1>
      <h1>This Page Could Not Be Found</h1>
      <div>
        Go back to <Link href="/" className="text-intorange-600 hover:font-semibold hover:underline transition-all">Home</Link>
      </div>
      </div>
    </main>
  );
}
