import { useState, useEffect } from "react";
import axios from "axios";

export const useFetch = (uri) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!uri) return;
        const fetchData = async () => {
            try {
                const response = await axios.get(uri);
                setData(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [uri])
 
    return { data, isLoading, error, setData }
}