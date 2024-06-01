"use client"
import { Outfit } from "next/font/google";
import "./globals.css";
import CartnNavBar from "@/components/CartnNavBar";
import { Provider } from "react-redux";
import { store } from "@/features/cartStore";

const outfit = Outfit({ subsets: ["latin"] });

export default function RootLayout({ children }) {


  return (
    <html lang="en">
      <Provider store={store}>
        <body className={`${outfit.className} overflow-hidden`}>
		  <div className="md:block hidden">
          <CartnNavBar />
          {children}
	      </div>
	      <div className="h-screen md:hidden flex text-intorange-600">
			<p className="m-auto text-xl">Adjust the display size for a better experience :^)</p>
		  </div>
        </body>
      </Provider>
    </html>
  );
}
