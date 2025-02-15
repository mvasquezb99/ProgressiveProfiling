import React, { useState } from "react";
import Card from './Card';
import MotionContainer from "./motionContainer";
import ProfileCard from "./ProfileCard";
import { profiles } from "../constants/profiles";
export default function ProfileFrom() {
    const [profile, setProfile] = useState(0);
    const [likedProfiles, setLikedProfiles] = useState([]);

    const handleLike = () => {
        setProfile((prev) => prev + 1);
        setLikedProfiles((prev) => [...prev, profiles[profile]])
    }
    
    const handleDislike = () => {
        setProfile(profile+1)
    }
    
    return (
        <Card>
            <MotionContainer handleLike={handleLike} handleDislike={handleDislike}>
                <ProfileCard profile={profiles[profile]}/>
            </MotionContainer>
            <div className="w-full h-8 flex mt-4 items-center justify-center space-x-9">
                <i class="fa-solid fa-thumbs-down fa-2xl mt-3" style={{color: "#d02224"}}></i>
                <i class="fa-solid fa-thumbs-up fa-2xl" style={{color: "#090467"}}></i>
            </div>
        </Card>
    );
}