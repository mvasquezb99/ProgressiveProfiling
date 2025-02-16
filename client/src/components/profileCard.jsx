import React, { useEffect } from "react";
import prop from '../assets/prop.jpg'
export default function ProfileCard({profile}) {
    return (
        <div className="h-full w-full bg-white rounded-2xl text-black flex flex-col shadow-md">
            <div className="h-1/2 w-full rounded-2xl">
                <img className="h-full w-full rounded-t-2xl object-cover object-center" src={prop} alt="prop"></img>
                <div className="w-full h-full p-2 pl-4 space-y-1">
                    <h2 className="text-xl font-semibold">{profile.nombre}</h2>
                    <div className="flex justify-start ml-0.5 font-medium text-gray-600">
                        <small className="pr-2">📕 {profile.educacion[0].grado}</small>
                        <small>💼 {profile.educacion[0].area}</small>
                    </div>
                    <div className="text-md overflow-y-hidden space-y-1">
                        <p className="text-sm text-gray-700">Actualmente trabajo como {profile.trabajo[0].posicion} en {profile.trabajo[0].organizacion} cuento con experiencia en {profile.educacion[0].area} y puedo aportar:
                        </p>
                        <div className="h-max overflow-y-hidden">
                            {
                                profile.habilidades.map((h) => (
                                    <li className="text-sm text-gray-700">{h}</li>
                                ))
                            }
                        </div>
                    </div>  
                </div>
            </div>
        </div>
    )
}