import React, { useState } from "react";
import Card from './Card';
import MotionContainer from "./MotionContainer";
import ProfileCard from "./ProfileCard";
import { profiles } from "../constants/profiles";
import CardTitle from "./CardTitle";
import Button from "./Button";
import SwipeArrows from "./swipeArrows";

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