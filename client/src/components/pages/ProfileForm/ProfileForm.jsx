import { useCallback, useEffect, useState, useContext } from 'react';
import { FormContext } from '../../../context/context';
import { getRandomInt } from '../../../utils/getRandom';
import { useFetch } from '../../../hooks/useFetch';

import Card from '../../layout/Card';
import MotionContainer from '../../layout/MotionContainer';
import ProfileCard from './ProfileCard';
import Button from '../../common/Button';
import SwipeArrows from './SwipeArrows';
import PropTypes from 'prop-types';
import axios from 'axios';
import Loading from '../../common/Loading';
import BackButton from '../../common/BackButton';
import React from 'react';

export default function ProfileFrom({ nextStep }) {
  const [likedProfiles, setLikedProfiles] = useState([]);
  const [dislikedProfiles, setDislikedProfiles] = useState([]);
  const [superlikedProfiles, setSuperlikedProfiles] = useState([]);
  const [uri, setUri] = useState(null);
  const [profile, setProfile] = useState(null);
  const [userData, setUserData] = useContext(FormContext);

  const { data: categoryProfiles, isLoading, error, setData: setCategoryProfiles } = useFetch(uri);

  const removeProfile = () => {
    if (categoryProfiles.length === 1) {
      setCategoryProfiles((prev) => prev.filter((p) => p.name !== profile.name));
      handleSubmit();
    } else {
      setCategoryProfiles((prev) => prev.filter((p) => p.name !== profile.name));
    }
  };

  const handleLike = () => {
    setLikedProfiles((prev) => [...prev, profile]);
    removeProfile();
    setRandomProfile(categoryProfiles);
  };

  const handleDislike = () => {
    setDislikedProfiles((prev) => [...prev, profile]);
    removeProfile();
    setRandomProfile(categoryProfiles);
  };

  const handleSuperlike = () => {
    setSuperlikedProfiles((prev) => [...prev, profile]);
    removeProfile();
    setRandomProfile(categoryProfiles);
  };

  const setRandomProfile = useCallback((array) => {
    const randomIndex = getRandomInt(0, array.length - 1);
    setProfile(array[randomIndex]);
  }, []);

  const fillUserData = (response) => {
    setUserData((prevData) => {
      return {
        ...prevData,
        category: response.categories[0],
        education: response.education[0],
        languages: response.languages.join(','),
        occupations: response.occupations,
        work: response.work[0],
      };
    });
  };

  const handleSubmit = async () => {
    const requestData = {
      ...userData,
      category: {
        name: userData.category.name,
      },
      likedUsers: likedProfiles,
      dislikedUsers: dislikedProfiles,
      superLikedUsers: superlikedProfiles,
    };

    const response = await axios.post('http://localhost:3000/users/generate', requestData);
    fillUserData(response.data);
    nextStep(4);
  };

  const resetProfiles = () => {
    setLikedProfiles([]);
    setDislikedProfiles([]);
    setSuperlikedProfiles([]);
    setCategoryProfiles(null);
  };

  useEffect(() => {
    if (userData.category.name) {
      setUri(`http://localhost:3000/users/categories?category=${userData.category.name}`);
    }
  }, [userData.category.name]);

  useEffect(() => {
    if (categoryProfiles && categoryProfiles.length >= 1) {
      setRandomProfile(categoryProfiles);
    }
  }, [categoryProfiles]);

  return (
    <Card step={2} rem={25}>
      <nav className="flex align-left w-full">
        <BackButton
          onClick={() => {
            nextStep(1);
            resetProfiles();
          }}
        />
        <p className="text-xs font-bold text-gray-700 leading-snug flex justify-center items-center w-[68%]">
          Haz click y desliza!
        </p>
        <p id="counter" className="text-base font-bold text-gray-700 leading-snug flex justify-center items-center flex-grow">
          {likedProfiles.length + superlikedProfiles.length}
        </p>
      </nav>

      <MotionContainer
        handleLike={handleLike}
        handleDislike={handleDislike}
        handleSuperlike={handleSuperlike}
      >
        {!isLoading && profile !== null ? (
          <ProfileCard profile={profile} />
        ) : (
          <Loading message={'Buscando perfiles'} />
        )}
      </MotionContainer>
      {!isLoading && (
        <>
          <SwipeArrows
            handleDislike={handleDislike}
            handleLike={handleLike}
            handleSuperlike={handleSuperlike}
          />
          {likedProfiles.length + superlikedProfiles.length >= 7 ? (
            <>
              <Button id="continueBtn" onClick={handleSubmit}>Continuar</Button>
            </>
          ) : (
            ''
          )}
        </>
      )}
    </Card>
  );
}

ProfileFrom.propTypes = {
  nextStep: PropTypes.func,
};
