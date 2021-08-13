import { useEffect, useState } from "react";
import axios from 'axios';

interface Error {
    isError: boolean;
    errMessage: string;
}

interface PostObject {
    title: string;
    id: number;
}

export const useFetch = (uri: string) => {
    const [ data, setData ] = useState<Array<PostObject>>([]);
    const [ isLoading, setIsLoading ] = useState<boolean | null>(null);
    const [ error, setError ] = useState<Error>({ isError: false, errMessage: '' });

    useEffect(() => {
        setIsLoading(true);

        const source = axios.CancelToken.source();
        
        async function fetchData () {
            try {
                let res = await axios.get(uri, {
                    cancelToken: source.token
                });
                setIsLoading(false);
                setData(res.data);
            } catch(err) {
                setIsLoading(false);
                if (err) setError({ isError: true, errMessage: err.message });
            }
        }

        fetchData();
        return () => {
            source.cancel();
        }
    }, []); 

    return { data, isLoading, error };
}

