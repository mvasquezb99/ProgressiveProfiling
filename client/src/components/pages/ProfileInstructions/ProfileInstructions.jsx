import Card from "../../layout/Card";
import CardTitle from "../../common/CardTitle";
import Button from "../../common/Button";
import PropTypes from 'prop-types';
import { useState, useEffect } from "react";
import React from "react";

export default function ProfileInstructions({ nextStep }) {
    const [buttonDisabled, setButtonDisabled] = useState(true);


    useEffect(() => {
        const timer = setTimeout(() => {
            setButtonDisabled(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);
    return (
        <Card step={1}>
            <section className="flex flex-col justify-between h-[38rem]">
                <div className="w-[20rem] flex flex-col flex-grow text-black">
                    <CardTitle title={"¡Descubre tu perfil ideal! 🎯"} />
                    <video width="100%" controls className="rounded-lg shadow-md mt-2 w-full h-[550px] object-cover pointer-events-none" autoPlay loop>
                        <source src="video/IMG_0419.mp4" type="video/mp4" />
                        Tu navegador no soporta el video.
                    </video>
                    <Button onClick={() => nextStep(3)} disabled={buttonDisabled}>
                        {buttonDisabled ? "Espera..." : "Iniciar"}
                    </Button>
                </div>
            </section>
        </Card>
    )
}


ProfileInstructions.propTypes = {
    nextStep: PropTypes.func,
}
