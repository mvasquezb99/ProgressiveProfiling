import Card from "../../layout/Card";
import CardTitle from "../../common/CardTitle";
import Button from "../../common/Button";
import PropTypes from 'prop-types';
import { useState, useEffect } from "react";
import React from "react";
import { profiles } from "../../../constants/profiles";
import MotionContainer from "../../layout/MotionContainer";
import ProfileCard from "../ProfileForm/ProfileCard";
import SwipeArrows from "../ProfileForm/SwipeArrows";

export default function ProfileInstructions({ nextStep }) {
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [inDemo, setInDemo] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setButtonDisabled(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    const handleClick = () => {
        setInDemo(!inDemo);
    }
    return (
        <section className="w-1/2 h-2/3 lg:w-2/3 lg:h-3/4 bg-[#f4f4fa] flex">
            <div className={`w-1/2 h-full p-10 flex flex-col justify-between ${!inDemo ? "shadow-sm" : "shadow-none"} `}>
                <div className="w-fit h-fit md:text-lg lg:text-sm">
                    <h2 className="text-2xl font-bold mb-2 text-[#090467]">Encuentra tu perfil ideal 🚀</h2>
                    <div className="flex flex-col space-y-4 mt-8">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 w-12 bg-white shadow-md rounded-xl cursor-pointer text-red-500 hover:text-white hover:bg-red-500  transition-colors">
                                <i className="fa-solid fa-arrow-left text-2xl h-full w-full"></i>
                            </div>
                            <p className="text-l h-full text-[#090467]">Haz click o desliza si este perfil<span className="font-bold"> no te representa</span>.</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="p-3 w-12 bg-white shadow-md rounded-xl cursor-pointer text-yellow-500 hover:text-white hover:bg-yellow-500  transition-colors">
                                <i className="fa-solid fa-star text-2xl"></i>
                            </div>
                            <p className="text-l h-full text-[#090467]">Haz clic o desliza si este perfil<span className="font-bold"> te representa completamente</span>.</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="p-3 w-12 bg-white shadow-md rounded-xl cursor-pointer text-green-500 hover:text-white hover:bg-green-500  transition-colors">
                                <i className="fa-solid fa-arrow-right text-2xl "></i>
                            </div>
                            <p className="text-l h-full text-[#090467]">Haz clic o desliza si este perfil<span className="font-bold"> te representa parcialmente</span>.</p>
                        </div>
                    </div>
                </div>
                <Button onClick={handleClick}>Iniciar demo!</Button>
            </div>
            <div className={`w-1/2 h-full flex flex-col justify-center items-center ${!inDemo ? "bg-gray-100/30 opacity-25 backdrop-blur-md cursor-not-allowed" : ""} `}>
                <MotionContainer
                    handleLike={() => { }}
                    handleDislike={() => { }}
                    handleSuperlike={() => { }}
                    motionStyles={'lg:w-[17rem] lg:h-[24rem] '}
                >
                    <ProfileCard profile={profiles[0]} />
                </MotionContainer>
                <SwipeArrows
                    handleDislike={() => { }}
                    handleLike={() => { }}
                    handleSuperlike={() => { }}
                />
            </div>
        </section>
    )
}


ProfileInstructions.propTypes = {
    nextStep: PropTypes.func,
}
