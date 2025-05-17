"use client";
import { useState, useEffect } from 'react';
import posthog from 'posthog-js';
import { useSearchParams } from 'next/navigation';

export default function NavBar() {
    const [searchText, setSearchText] = useState('');
    const [email, setEmail] = useState('');
    const searchParams = useSearchParams();

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && searchText.trim() !== '') {
            posthog.capture('User searched event', { jobSearched: searchText });
            console.log("event captured");
        }
    };

    const handleBlur = () => {
        if (searchText.trim() !== '') {
            posthog.capture('User job searched event', { jobSearched: searchText });
            console.log("event captured");
        }
    };

    useEffect(() => {
        const emailParam = searchParams.get('email') || 'Guest';
        setEmail(emailParam);
    }, [searchParams]);


    return (
        <nav className="w-full h-22 flex border-b-1 border-gray-200">
            <section className="w-1/4 flex justify-center items-center">
                <img src="/b6d16be0c4412d5f.svg" alt="" className="w-1/2 h-1/2" />
            </section>
            <section className="w-1/2 p-4 flex justify-center items-center">
                <input
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}
                    className="appearance-none border-none focus:outline-none w-2/3 bg-[#F4F4FA] h-11 p-2 pl-3 rounded-md text-[#757575] placeholder:text-[#757575]"
                    placeholder="Busca empleo por categoria o educación"
                />
            </section>
            <section className="w-1/4 flex justify-center items-center space-x-2">
                {email === 'Guest' ? (
                    <>
                        <a href="" className="rounded-2xl hover:bg-[#F4F4FA] text-[#002D5A] p-2 px-5 font-semibold">Iniciar sesión</a>
                        <a href="http://localhost:5173/" className="rounded-2xl bg-[#9EE4B8] text-[#002D5A] p-2 px-5 font-semibold">Crear cuenta</a>
                    </>
                ) : (
                    <>
                        <p className="text-[#002D5A] p-2 px-5 font-semibold">{email.split('@')[0]}</p>
                        <a href="" className="rounded-2xl bg-[#9EE4B8] text-[#002D5A] hover:bg-[#9EE4B8] p-2 px-5 font-semibold">Cerrar sesión</a>
                    </>
                )}
            </section>
        </nav>
    );
}
