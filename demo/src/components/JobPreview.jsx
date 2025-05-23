import posthog from "posthog-js";
import { useEffect, useState } from "react"

export default function JobPreview({ job, email, openExtraInfoPanel }) {
    const [jobInfo, setJobInfo] = useState(undefined);

    useEffect(() => {
        setJobInfo(job);
    }, [job])

    useEffect(() => {
        posthog.identify(email);
        console.log("Identified with:", email);
    }, [])

    const tutorialClick = () => {
        openExtraInfoPanel(jobInfo);
        posthog.capture('Job offer event', { name: jobInfo.name, category: jobInfo.category, occupations: jobInfo.occupations });
        console.log("event captured");
    }

    return (
        jobInfo ?
            <a onClick={tutorialClick} className="hover:bg-[#F4F4FA] w-full p-3 rounded-lg flex h-30 items-center transition-colors ease-in delay-75" key={jobInfo.name}>
                <div className="w-1/5 flex items-center space-x-6 pl-3">
                    <h3 className="font-semibold">{jobInfo.name}</h3>
                </div>
                <div className="w-1/5">
                    <h3>Company‼</h3>
                </div>
                <div className="w-1/5">
                    <h3>{jobInfo.category}</h3>
                </div>
                <div className="w-1/5">
                    <h3>{jobInfo.occupations}</h3>
                </div>
                <div className="w-1/5">
                    <h3>{jobInfo.description}</h3>
                </div>
            </a>
            : <></>
    )
}
