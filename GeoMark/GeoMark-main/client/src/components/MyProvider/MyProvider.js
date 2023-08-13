import React, { createContext, useState } from "react";

export const MyContext = createContext();

export const MyProvider = (props) => {
    const [flags, setFlags] = useState({
        sidebar: false,
        addStudent: false,
        createSession: false,
        liveSession: false,
        attendance: false,
        logout: false
    });
  
    return (
      <MyContext.Provider value={[flags, setFlags]}>
        {props.children}
      </MyContext.Provider>
    );
  };
