/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import React from 'react';
export default function ProfileCard({ profile }) {
    const { name, education, categories, occupations, languages } = profile;
    const image = profile.image || '/constants/pngegg.png'; 
    return (
        <article className="h-full w-full max-w-80 bg-white rounded-2xl text-black flex flex-col shadow-md">
            <div className="h-1/2 w-full rounded-t-2xl ">
                <img className="h-full w-full max-h-45 rounded-t-2xl object-cover object-center" src={image} alt='/constants/pngegg.png'></img>
                <section className="w-full flex-grow p-2 pl-4 space-y-1 overflow-hidden">
                    <h2 className="text-2xl font-bold font-mono" data-testid="name" >{name.length > 15 ? name.slice(0, 15) + '...' : name}</h2>
                    <div className="flex justify-start ml-0.5 font-medium text-gray-700 text-md">
                        <small className="pr-2" data-testid="category">📕 {categories[0].name}</small>
                        <small data-testid="area">🎓 {education.area}</small>
                    </div>
                    <div className="flex justify-start ml-0.5 font-medium text-gray-700 text-md">
                        <small data-testid="languages">🗣️ {languages}</small>
                    </div>
                    <div className="text-sm h-32 space-y-1">
                        <p className="text-base text-gray-700 leading-snug">Me desempeño en:</p>
                        <ul className='text-sm text-gray-700 h-32 leading-snug list-disc overflow-y-scroll scrollbar-hide'>
                            {
                                occupations.map((o, index) => (
                                    <li key={index} data-testid="occ-item" className="break-words">- {o.name}.</li>
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