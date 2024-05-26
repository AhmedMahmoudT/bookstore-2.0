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
        <body className={outfit.className}>
          <CartnNavBar />
          {children}
        </body>
      </Provider>
    </html>
  );
}
