import React, { useState } from "react";
import Card from '../layout/Card';
import MotionContainer from "../layout/motionContainer";
import ProfileCard from "../features/profileCard";
import { profiles } from "../../constants/profiles";
import Button from "../common/Button";
import SwipeArrows from "../features/SwipeArrows";

export default function ProfileFrom() {
    const [profile, setProfile] = useState(0);
    const [likedProfiles, setLikedProfiles] = useState([]);

    const handleLike = () => {
        setProfile((prev) => prev + 1); // Change for the fetch from the database.
        setLikedProfiles((prev) => [...prev, profiles[profile]])
    }

    const handleDislike = () => {
        setProfile((prev) => prev+1)
    }

    return (
        <Card step={2}>
            <MotionContainer handleLike={handleLike} handleDislike={handleDislike}>
                <ProfileCard profile={profiles[profile]} />
            </MotionContainer>
            <SwipeArrows handleDislike={handleDislike} handleLike={handleLike}/>
            {
                likedProfiles.length >= 3 ? <>
                    <Button to="/occupations">
                        Continuar
                    </Button>
                </>: ''
            }
        </Card>
    );
}