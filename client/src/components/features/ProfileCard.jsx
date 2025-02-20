import prop from '../../assets/prop.jpg'
import PropTypes from 'prop-types';

export default function ProfileCard({ profile }) {
    return (
        <div className="h-full w-full bg-white rounded-2xl text-black flex flex-col shadow-md">
            <div className="h-1/2 w-full rounded-t-2xl ">
                <img className="h-full w-full max-h-45 rounded-t-2xl object-cover object-center" src={prop} alt="prop"></img>
                <div className="w-full h-full p-2 pl-4 space-y-1">
                    <h2 className="text-2xl font-bold font-mono">{profile.nombre}</h2>
                    <div className="flex justify-start ml-0.5 font-medium text-gray-700 text-md">
                        <small className="pr-2">📕 {profile.educacion[0].grado}</small>
                        <small>💼 {profile.educacion[0].area}</small>
                    </div>
                    <div className="text-sm overflow-y-hidden space-y-1">
                        <p className="text-base text-gray-700 leading-snug">Actualmente trabajo como  <strong>{profile.trabajo[0].posicion}</strong> en {profile.trabajo[0].organizacion} cuento con experiencia en {profile.educacion[0].area} y puedo aportar:
                        </p>
                        <div className="h-max overflow-y-hidden list-disc pl-5 text-sm text-gray-700 space-y-1 ">
                            {
                                profile.habilidades.map((h) => (
                                    <li key={h} className="text-sm text-gray-700 ">{h}</li>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


/**
 * Expand in propTypes when the connection to the db is established
 */
ProfileCard.propTypes = {
    profile: PropTypes.object.isRequired,
}