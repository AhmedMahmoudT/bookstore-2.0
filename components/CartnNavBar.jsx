"use client"
import { useEffect, useState } from "react"
import NavBar from "./NavBar"
import Cart from "./Cart"

const CartnNavBar = () => {

  const [hidden, setHidden] = useState(true)

  return (
    <div>
        <NavBar setHidden={setHidden}/>
        <Cart hidden={hidden} setHidden={setHidden}/>
    </div>
  )
}

export default CartnNavBar