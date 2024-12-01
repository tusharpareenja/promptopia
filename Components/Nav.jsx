"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

function Nav() {
    const isUserLoggedin = true;
    const {data: session} = useSession();
    const [providers, setProviders] = useState(null);
    const [toggleDropDown, setToggeDropDown] = useState(false);

    useEffect(() => {
        const fetchProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        };
        fetchProviders();
    }, []); // Added dependency array

    return (
        <nav className="flex-between w-full mb-16 pt-3">
            <Link href="/" className="flex gap-2 flex-center">
                <Image
                    src="/assets/images/logo.svg"
                    width={30}
                    height={30}
                    className="object-contain"
                    alt="Promptopia Logo"
                />
                <p className="logo_text">Promptopia</p>
            </Link>

            

            <div className="sm:flex hidden">
                {session?.user ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link href="/create-prompt" className="black_btn">
                            Create Prompt
                        </Link>

                        <button
                            type="button"
                            onClick={signOut}
                            className="outline_btn"
                        >
                            Sign Out
                        </button>

                        <Link href="/profile">
                            <img
                                src={session?.user.image}
                                width={37}
                                height={37}
                                className="rounded-full"
                                alt="Profile"
                            />
                        </Link>
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type="button"
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className="black_btn"
                                >
                                    Sign in
                                </button>
                            ))}
                    </>
                )}
            </div>

            <div className="sm:hidden flex relative">
                {session?.user ? (
                    <div className="flex">
                        <img
                            src= {session?.user.image}
                            width={37}
                            height={37}
                            className="rounded-full"
                            alt="Profile"
                            onClick={() => setToggeDropDown((prev) => !prev)}
                        />
                        {toggleDropDown && (
                            <div className="dropdown">
                                <Link
                                    href="/profile"
                                    className="dropdown_link"
                                    onClick={() => setToggeDropDown(false)}
                                >
                                    My Profile
                                </Link>
                                <Link
                                    href="/create-prompt"
                                    className="dropdown_link"
                                    onClick={() => setToggeDropDown(false)}
                                >
                                    Create Prompt
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setToggeDropDown(false);
                                        signOut();
                                    }}
                                    className="mt-5 w-full black_btn"
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type="button"
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className="black_btn"
                                >
                                    Sign in
                                </button>
                            ))}
                    </>
                )}
            </div>
        </nav>
    );
}

export default Nav;
