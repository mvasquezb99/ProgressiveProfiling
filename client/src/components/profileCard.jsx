import React, { useEffect } from "react";
import prop from '../assets/prop.jpg'
export default function ProfileCard({profile}) {
    return (
        <div className="h-full w-full bg-white rounded-2xl text-black flex flex-col">
            <div className="h-1/2 w-full rounded-2xl">
                <img className="h-full w-full rounded-t-2xl object-cover object-center" src={prop} alt="prop"></img>
                <div className="w-full h-full p-2 pl-4 space-y-1">
                    <h2 className="text-lg">{profile.nombre}</h2>
                    <div className="flex justify-start ml-0.5 text-md">
                        <small className="pr-2">
                            📕 {profile.educacion[0].grado}
                        </small>
                        <small>
                            💼 {profile.educacion[0].area}
                        </small>
                    </div>
                    <div className="text-md overflow-y-hidden space-y-1">
                        <p className="text-sm">Actualmente trabajo como {profile.trabajo[0].posicion} en {profile.trabajo[0].organizacion} Cuento con experiencia en {profile.educacion[0].area} y puedo aportar:
                        </p>
                        <div className="h-max overflow-y-hidden">
                            {
                                profile.habilidades.map((h) => (
                                    <li className="text-sm">{h}</li>
                                ))
                            }
                        </div>
                    </div>  
                </div>
            </div>
        </div>
    )
}