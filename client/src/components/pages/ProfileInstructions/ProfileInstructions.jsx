/* eslint-disable no-unused-vars */
import Button from '../../common/Button';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import React from 'react';
import { profiles } from '../../../constants/profiles';
import MotionContainer from '../../layout/MotionContainer';
import ProfileCard from '../ProfileForm/ProfileCard';
import SwipeArrows from '../ProfileForm/SwipeArrows';

export default function ProfileInstructions({ nextStep }) {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [inDemo, setInDemo] = useState(false);
  const [missionsCompleted, setMissionsCompleted] = useState(0);
  const [progress, setProgress] = useState(0.0);
  const [profileIndex, setProfileIndex] = useState(0);
  const [currentMission, setCurrentMission] = useState(0);

  useEffect(() => {
    if (progress === 0) {
      let seconds = 0;
      const interval = setInterval(() => {
        seconds += 0.05;
        setProgress((prev) => prev + 0.00332);
        if (seconds >= 15) {
          setButtonDisabled(false);
          clearInterval(interval);
        }
      }, 50);
      return () => clearTimeout(interval);
    }
  }, []);

  const handleClick = () => {
    setInDemo(!inDemo);
    setCurrentMission('arrowLeft');
    let missionText = document.getElementById('arrowUp-mission-text');
    missionText.classList.add('hidden');
    missionText = document.getElementById('arrowRight-mission-text');
    missionText.classList.add('hidden');
  };

  const handleMissionCheck = (evt) => {
    const missionId = evt.target.id;
    if (currentMission !== missionId) {
      return;
    }
    const missionElement = document.getElementById(missionId + '-mission');
    if (missionId === 'arrowLeft') {
      missionElement.classList.add('hidden');
      missionElement.classList.remove('flex');
      const nextMissionElement = document.getElementById('arrowUp-mission');
      nextMissionElement.classList.remove('hidden');
      nextMissionElement.classList.add('flex');
      setCurrentMission('arrowUp');
    } else if (missionId === 'arrowUp') {
      missionElement.classList.add('hidden');
      missionElement.classList.remove('flex');
      const nextMissionElement = document.getElementById('arrowRight-mission');
      nextMissionElement.classList.remove('hidden');
      nextMissionElement.classList.add('flex');
      setCurrentMission('arrowRight');
    } else if (missionId === 'arrowRight') {
      let nextMissionElement = document.getElementById('arrowLeft-mission');
      nextMissionElement.classList.remove('hidden');
      nextMissionElement.classList.add('flex');
      nextMissionElement = document.getElementById('arrowUp-mission');
      nextMissionElement.classList.remove('hidden');
      nextMissionElement.classList.add('flex');
    }

    const missionTextId = evt.target.id;
    const missionText = document.getElementById(missionTextId + '-mission-text');
    if (missionId === 'arrowLeft') {
      missionText.classList.add('hidden');
      const nextMissionText = document.getElementById('arrowUp-mission-text');
      nextMissionText.classList.remove('hidden');
    } else if (missionId === 'arrowUp') {
      missionText.classList.add('hidden');
      const nextMissionText = document.getElementById('arrowRight-mission-text');
      nextMissionText.classList.remove('hidden');
    } else if (missionId === 'arrowRight') {
      let nextMissionText = document.getElementById('arrowLeft-mission-text');
      nextMissionText.classList.remove('hidden');
      nextMissionText = document.getElementById('arrowUp-mission-text');
      nextMissionText.classList.remove('hidden');
    }

    setMissionsCompleted(missionsCompleted + 1);
    setProfileIndex(profileIndex + 1);
  };

  return (
    <section className="xl:w-2/3 xl:h-3/4 lg:w-2/3 lg:h-3/4 bg-[#f4f4fa] flex max-h-[35rem] max-w-[49rem] ">
      <div
        className={`w-1/2 h-full p-10 flex flex-col justify-between ${
          !inDemo ? 'shadow-sm' : 'shadow-none'
        } `}
      >
        <div className="w-fit h-fit xl:text-base lg:text-sm">
          <h2 className="xl:text-3xl lg:text-2xl font-bold mb-2 text-[#090467]">
            Encuentra tu perfil ideal 🚀
          </h2>
          <p className="xl:text-lg lg:text-base mb-2 text-[#090467]">
            Lee atentamente y realiza las siguientes misiones para continuar
          </p>
          <div className="flex flex-col space-y-4 mt-8">
            <div className="flex items-center space-x-4">
              {!inDemo ? (
                <div className="p-3 w-12 bg-white shadow-md rounded-xl cursor-pointer text-red-500 hover:text-white hover:bg-red-500  transition-colors">
                  <i className="fa-solid fa-arrow-left text-2xl h-full w-full"></i>
                </div>
              ) : (
                <div className="p-3 w-12 flex justify-center items-center">
                  <div
                    id="arrowLeft-mission"
                    className={`w-6 h-6 flex items-center justify-center border-2 rounded-md bg-gray-300 border-gray-400`}
                  >
                    <i className="fa-solid fa-check"></i>
                  </div>
                </div>
              )}
              <p className="text-l h-full text-[#090467]" id="arrowLeft-mission-text">
                Haz click o desliza si este perfil
                <span className="font-bold text-red-500"> no te representa</span>.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {!inDemo ? (
                <div className="p-3 w-12 bg-white shadow-md rounded-xl cursor-pointer text-yellow-500 hover:text-white hover:bg-yellow-500  transition-colors">
                  <i className="fa-solid fa-star text-2xl"></i>
                </div>
              ) : (
                <div className="p-3 w-12 flex justify-center items-center">
                  <div
                    id="arrowUp-mission"
                    className="w-6 h-6 items-center justify-center border-2 rounded-md bg-gray-300 border-gray-400 hidden"
                  >
                    <i className="fa-solid fa-check"></i>
                  </div>
                </div>
              )}

              <p className="text-l h-full text-[#090467]" id="arrowUp-mission-text">
                Haz clic o desliza si este perfil
                <span className="font-bold text-yellow-500"> te representa completamente</span>.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {!inDemo ? (
                <div className="p-3 w-12 bg-white shadow-md rounded-xl cursor-pointer text-green-500 hover:text-white hover:bg-green-500  transition-colors">
                  <i className="fa-solid fa-arrow-right text-2xl "></i>
                </div>
              ) : (
                <div className="p-3 w-12 flex justify-center items-center">
                  <div
                    id="arrowRight-mission"
                    className="w-6 h-6 items-center justify-center border-2 rounded-md bg-gray-300 border-gray-400 hidden"
                  >
                    <i className="fa-solid fa-check"></i>
                  </div>
                </div>
              )}

              <p className="text-l h-full text-[#090467]" id="arrowRight-mission-text">
                Haz clic o desliza si este perfil
                <span className="font-bold text-green-500"> te representa parcialmente</span>.
              </p>
            </div>
          </div>
        </div>
        <div>
          {!buttonDisabled ? (
            !inDemo ? (
              <Button onClick={handleClick}>Iniciar demostración!</Button>
            ) : missionsCompleted < 3 ? (
              <Button customStyles={'bg-gray-400'}>Cumple las misiones para avanzar!</Button>
            ) : (
              <Button onClick={() => nextStep(3)}>Continuar</Button>
            )
          ) : (
            <Button customStyles={'bg-gray-400 opacity-30 cursor-not-allowed'}>
              <i className="fa-solid fa-lock text-2xl h-full w-full"></i>
            </Button>
          )}
          <div className="w-full h-1 mt-1 rounded-2xl">
            <div className={`h-full bg-[#090467] rounded-2xl`} style={{ width: `${progress * 100}%` }}></div>
          </div>
        </div>
      </div>
      <div
        className={`w-1/2 h-full flex flex-col justify-center items-center ${
          !inDemo ? 'bg-gray-100/30 opacity-25 backdrop-blur-md cursor-not-allowed' : 'shadow-sm'
        } `}
      >
        <MotionContainer
          handleLike={() => {}}
          handleDislike={() => {}}
          handleSuperlike={() => {}}
          motionStyles={'xl:w-[18rem] xl:h-[25rem] lg:w-[18rem] lg:h-[25rem] '}
        >
          <ProfileCard profile={profiles[profileIndex]} />
        </MotionContainer>
        <SwipeArrows
          handleDislike={handleMissionCheck}
          handleLike={handleMissionCheck}
          handleSuperlike={handleMissionCheck}
        />
      </div>
    </section>
  );
}

ProfileInstructions.propTypes = {
  nextStep: PropTypes.func,
};
