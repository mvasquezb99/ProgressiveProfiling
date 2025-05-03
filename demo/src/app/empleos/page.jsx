'use client'; // Don't remove
import JobPreview from "@/components/JobPreview";
import { useEffect, useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import { categories } from "@/constants/educationCategories";

export default function index() {
    const [uri, setUri] = useState(null);
    const { data: jobsOffers, isLoading, error, setData: setJobOffers } = useFetch(uri);

    useEffect(() => {
        setUri(`http://localhost:8000/api/jobOffers`);
    }, []);

    return (
        <section className="w-full flex-grow flex">
            <div id="filter-side-bar" className="w-1/4 h-full p-4 space-y-4 border-r-1 border-gray-200">
                <section className="bg-[#F4F4FA] w-full p-3 rounded-lg">
                    <h2 className="font-semibold text-xl">Filtrar empleos</h2>
                </section>
                <section className="bg-[#F4F4FA] w-full h-76 p-3 rounded-lg space-y-2">
                    <h2 className="font-semibold text-lg">Categorias</h2>
                    <input type="text" placeholder="Busca por categoria" className="appearance-none focus:outline-none border border-gray-300 w-full bg-gray-50 p-2 rounded-lg pl-3" />
                    <div className="w-full h-fit">
                        {
                            categories.map((c) => (
                                <p className="p-1 rounded-md hover:bg-gray-200 " key={c}>{c}</p>
                            ))
                        }
                    </div>
                </section>
                <section className="bg-[#F4F4FA] w-full p-3 rounded-lg">
                    <h2 className="font-semibold text-lg">Educación</h2>
                </section>
            </div>
            <div id="job-offers" className="w-10/12 h-[90vh] p-4 overflow-scroll">
                {
                    isLoading ? <></> :
                        jobsOffers.data.map((job) => (
                            <JobPreview job={job} />
                        ))
                }
                <JobPreview />
                <JobPreview />
            </div>
        </section>
    )
}