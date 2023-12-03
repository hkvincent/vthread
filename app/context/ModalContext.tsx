"use client";
import React, { useState } from 'react';

interface ModalContextProps {
    modal: { shouldCloseModal: boolean };
    setModal: React.Dispatch<React.SetStateAction<{ shouldCloseModal: boolean; }>>;
}

const ModalContext = React.createContext<ModalContextProps | undefined>(undefined);

export default ModalContext;


export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
    const [modal, setModal] = useState({ shouldCloseModal: false });
    return (
        <ModalContext.Provider
            value={{ modal, setModal }}
        >
            {children}
        </ModalContext.Provider>
    );
}