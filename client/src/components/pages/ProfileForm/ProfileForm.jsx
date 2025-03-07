import { useCallback, useEffect, useState, useContext } from 'react';
import { FormContext } from '../../../context/context';
import Card from '../../layout/Card';
import MotionContainer from '../../layout/MotionContainer';
import ProfileCard from './ProfileCard';
import Button from '../../common/Button';
import SwipeArrows from './SwipeArrows';
import PropTypes from 'prop-types';
import axios from 'axios';
import Loading from '../../common/Loading';
import BackButton from '../../common/BackButton';

export default function ProfileFrom({ nextStep }) {
  const [likedProfiles, setLikedProfiles] = useState([]);
  const [dislikedProfiles, setDislikedProfiles] = useState([]);
  const [superlikedProfiles, setSuperlikedProfiles] = useState([]);

  const [categoryProfiles, setCategoryProfiles] = useState(null);
  const [profile, setProfile] = useState(null);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [userData, setUserData] = useContext(FormContext);

  const removeProfile = (profile) => {
    setCategoryProfiles((prev) => prev.filter((p) => p.name !== profile.name))
    if (categoryProfiles.length === 0) {
      setIsLoading(true);
    }
  }

  const handleLike = () => {
    setLikedProfiles((prev) => [...prev, profile]);
    removeProfile(profile);
    getRandomProfile(categoryProfiles);
  };

  const handleDislike = () => {
    setDislikedProfiles((prev) => [...prev, profile]);
    removeProfile(profile);
    getRandomProfile(categoryProfiles);
  };

  const handleSuperlike = () => {
    setSuperlikedProfiles((prev) => [...prev, profile]);
    removeProfile(profile);
    getRandomProfile(categoryProfiles);
  };

  const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  // UseCallback caches the definition of a function between re-renders.
  const getRandomProfile = useCallback((array) => {
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
        name: userData.category,
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
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/users/categories?category=${userData.category}`
        );
        setCategoryProfiles(response.data);

        if (response.data.length >= 1) {
          getRandomProfile(response.data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [getRandomProfile]);


  return (
    <Card step={2} rem={25}>
      <div className="flex align-left w-full">
        <BackButton
          onClick={() => {
            nextStep(1);
            resetProfiles();
          }}
        />
        <p className='text-xs font-bold text-gray-700 leading-snug flex justify-center items-center w-[68%]'>
          Haz click y desliza!
        </p>
      </div>

      <MotionContainer
        handleLike={handleLike}
        handleDislike={handleDislike}
        handleSuperlike={handleSuperlike}
      >
        {!isLoading && profile !== null ? <ProfileCard profile={profile} /> : <Loading message={'Buscando perfiles'} />}
      </MotionContainer>
      <SwipeArrows handleDislike={handleDislike} handleLike={handleLike} handleSuperlike={handleSuperlike} />
      {likedProfiles.length + superlikedProfiles.length >= 7 ? (
        <>
          <Button onClick={handleSubmit}>Continuar</Button>
        </>
      ) : (
        ''
      )}
    </Card>
  );
}

ProfileFrom.propTypes = {
  nextStep: PropTypes.func,
};
