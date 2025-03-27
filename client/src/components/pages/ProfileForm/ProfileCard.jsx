import PropTypes from 'prop-types';
import React from 'react';
export default function ProfileCard({ profile }) {
    const { name, image, education, categories, occupations, languages} = profile;
    return (
        <article className="h-full w-full max-w-80 bg-white rounded-2xl text-black flex flex-col shadow-md">
            <div className="h-1/2 w-full rounded-t-2xl ">
                <img className="h-full w-full max-h-45 rounded-t-2xl object-cover object-center" src={image} alt='https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/female/512/80.jpg'></img>
                <section className="w-full h-full p-2 pl-4 space-y-1">
                    <h2 className="text-2xl font-bold font-mono">{name}</h2>
                    <div className="flex justify-start ml-0.5 font-medium text-gray-700 text-md">
                        <small className="pr-2">📕 {categories[0].name}</small>
                        <small>🎓 {education.area}</small>
                    </div>
                    <div className="flex justify-start ml-0.5 font-medium text-gray-700 text-md">
                        <small>🗣️ {languages}</small>
                    </div>
                    <div className="text-sm overflow-y-hidden space-y-1">
                        <p className="text-base text-gray-700 leading-snug">Me desempeño en:</p>
                        <ul className='text-sm text-gray-700 leading-snug list-disc'>
                            {
                                occupations.map((o, index) => (
                                    <li  key={index}>- {o.name}.</li>
                                ))
                            }
                        </ul>
                    </div>
                </section>
            </div>
        </article>
    )
}


ProfileCard.propTypes = {
    profile: PropTypes.object.isRequired,
}