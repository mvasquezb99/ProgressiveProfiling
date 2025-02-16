import React, { useState } from "react";
import Card from './Card';
import MotionContainer from "./motionContainer";
import ProfileCard from "./profileCard";
import { profiles } from "../constants/profiles";
export default function ProfileFrom() {
    const [profile, setProfile] = useState(0);
    const [likedProfiles, setLikedProfiles] = useState([]);

    const handleLike = () => {
        setProfile((prev) => prev + 1);
        setLikedProfiles((prev) => [...prev, profiles[profile]])
    }

    const handleDislike = () => {
        setProfile((prev) => prev+1)
    }

    return (
        <Card>
            <MotionContainer handleLike={handleLike} handleDislike={handleDislike}>
                <ProfileCard profile={profiles[profile]} />
            </MotionContainer>
            <div className="flex justify-center items-center space-x-12 mt-4 w-full">
                <div className="flex flex-col items-center bg-red-500 w-1/3 p-1 rounded-2xl cursor-pointer" onClick={handleDislike}>
                    <i className="fa-solid fa-times text-white text-2xl"></i>
                </div>
                <div className="flex flex-col items-center bg-green-500 w-1/3 p-1 rounded-2xl cursor-pointer" onClick={handleLike}>
                    <i className="fa-solid fa-heart text-white text-2xl "></i>
                </div>
            </div>
        </Card>
    );
}