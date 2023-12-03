'use client'
import { useCallback, useRef, useEffect, MouseEventHandler } from 'react'
import { useRouter } from 'next/navigation'
import ModalContext from '@/app/context/ModalContext';
import React, { useContext } from "react";
export default function Modal({ children }: { children: React.ReactNode }) {
    const overlay = useRef(null)
    const wrapper = useRef(null)
    const router = useRouter()
    const { modal, setModal } = useContext(ModalContext)!;

    useEffect(() => {
        if (modal.shouldCloseModal) {
            router.back();
            setModal({ shouldCloseModal: false });
        }
    }, [modal, router, setModal]);

    const onDismiss = useCallback(() => {
        router.back()
    }, [router])

    const onClick: MouseEventHandler = useCallback(
        (e) => {
            if (e.target === overlay.current || e.target === wrapper.current) {
                if (onDismiss) onDismiss()
            }
        },
        [onDismiss, overlay, wrapper]
    )

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') onDismiss()
        },
        [onDismiss]
    )

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown)
        return () => document.removeEventListener('keydown', onKeyDown)
    }, [onKeyDown])

    return (
         <div
            ref={overlay}
            className="fixed z-10 inset-0 bg-black/60 flex items-center justify-center px-4"
            onClick={onClick}
        >
            <div
                ref={wrapper}
                className="rounded-lg shadow-md m-2 p-6 max-w-sm w-full"
                onClick={(e) => e.stopPropagation()} // Prevent click from propagating to the overlay
            >
                {children}
            </div>
        </div>
    )
}