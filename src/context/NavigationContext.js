import React, { useState, createContext, Children } from "react";

export const NavContext = createContext()

export const NavProvider = (({ children }) => {
  const [menuOptions, setMenuOptions] = useState({
    homeOutline: true,
    footballOutline: false,
    trophyOutline: false,
    chatboxOutline: false,
    personOutline: false
  })

  return (
    <NavContext.Provider value={{ menuOptions, setMenuOptions }}>
      {children}
    </NavContext.Provider>
  )

})