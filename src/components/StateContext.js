import React, { createContext, useState } from "react";
export const SaveOptionContext = createContext();

export function SaveOptionProvider(props) {
  const [saveOptionn, setSaveOptionn] = useState("");
  //
  const [userName, setUserName] = useState("");
  const [isLearn, setIsLearn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showLogIn, setShowLogIn] = useState(false);
  const [learnAbout, setLearnAbout] = useState("");
  const [namePlace, setNamePlace] = useState("");
  const [deletFeatuer, setDeletFeatuer] = useState("To delete");

  const contextValue = {
    deletFeatuer,
    setDeletFeatuer,
    learnAbout,
    setLearnAbout,
    namePlace,
    setNamePlace,
    showLogIn,
    setShowLogIn,
    isLoading,
    setIsLoading,
    saveOptionn,
    setSaveOptionn,
    userName,
    setUserName,
    isLearn,
    setIsLearn,
  };
  return (
    <SaveOptionContext.Provider value={contextValue}>
      {props.children}
    </SaveOptionContext.Provider>
  );
}
