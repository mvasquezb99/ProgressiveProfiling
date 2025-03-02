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
import CardTitle from '../../common/CardTitle';

export default function ProfileFrom({ nextStep }) {
  const [likedProfiles, setLikedProfiles] = useState([]);
  const [dislikedProfiles, setDislikedProfiles] = useState([]);
  const [superlikedProfiles, setSuperlikedProfiles] = useState([]);
  const [categoryProfiles, setCategoryProfiles] = useState(null);

  const [profile, setProfile] = useState(null);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [enteredData, setEnteredData] = useContext(FormContext);

  const handleLike = () => {
    setLikedProfiles((prev) => [...prev, profile]);
    getRandomProfile(categoryProfiles);
  };

  const resetProfiles = () => {
    setLikedProfiles([]);
    setDislikedProfiles([]);
    setSuperlikedProfiles([]);
    setCategoryProfiles(null);
  };

  const handleDislike = () => {
    setDislikedProfiles((prev) => [...prev, profile]);
    getRandomProfile(categoryProfiles);
  };

  const handleSuperlike = () => {
    setSuperlikedProfiles((prev) => [...prev, profile]);
    getRandomProfile(categoryProfiles);
  };

  const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  // UseCallback caches the definition of a function between re-renders.
  const getRandomProfile = useCallback((array) => {
    const randomIndex = getRandomInt(0, array.length - 1);
    setProfile(array[randomIndex]);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/users/categories?category=${enteredData.occupationCategory}`
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
      <BackButton
        onClick={() => {
          nextStep(1);
          resetProfiles();
        }}
      />

      <MotionContainer
        handleLike={handleLike}
        handleDislike={handleDislike}
        handleSuperlike={handleSuperlike}
      >
        {!isLoading ? <ProfileCard profile={profile} /> : <Loading />}
      </MotionContainer>
      <SwipeArrows handleDislike={handleDislike} handleLike={handleLike} handleSuperlike={handleSuperlike} />
      {likedProfiles.length >= 7 || superlikedProfiles >= 7 ? (
        <>
          <Button onClick={() => nextStep(4)}>Continuar</Button>
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
