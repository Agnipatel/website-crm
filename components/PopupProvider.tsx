"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

interface PopupContextType {
  isPopupOpen: boolean;
  setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PopupContext = createContext<PopupContextType | undefined>(
  undefined
);

export function PopupProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <PopupContext.Provider
      value={{
        isPopupOpen,
        setIsPopupOpen,
      }}
    >
      {children}
    </PopupContext.Provider>
  );
}

export function usePopup() {
  const context = useContext(PopupContext);

  if (!context) {
    throw new Error(
      "usePopup must be used within a PopupProvider"
    );
  }

  return context;
}