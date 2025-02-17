import React from "react";

export default function ProgressTracker({ step }) {
    return (
        <div className="flex w-full h-2.5 rounded-b-xl space-x-1 justify-center mt-1.5">
            <div className={`w-[30%] h-2 ${step >= 1 ? "opacity-100 " : "opacity-65 animate-pulse"} bg-[#090467] rounded-xl`}></div>
            <div className={`w-[30%] h-2 ${step >= 2 ? "opacity-100" : "opacity-65 animate-pulse"} bg-[#090467] rounded-xl`}></div>
            <div className={`w-[30%] h-2 ${step === 3 ? "opacity-100" : "opacity-65 animate-pulse"} bg-[#090467] rounded-xl`}></div>
        </div>
    )
}