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

interface ConfigTypes {
    params: {
        q?: string;
        region?: string;
    };
    headers: {
        'x-rapidapi-key': string;
        'x-rapidapi-host': string;
    }
    json: boolean;
    gzip: boolean;
}

export const useFetch = (uri: string, config: ConfigTypes) => {
    const [ data, setData ] = useState<Array<PostObject>>([]);
    const [ isLoading, setIsLoading ] = useState<boolean | null>(null);
    const [ error, setError ] = useState<Error>({ isError: false, errMessage: '' });

    useEffect(() => {
        setIsLoading(true);

        const source = axios.CancelToken.source();
        
        async function fetchData () {
            try {
                let res = await axios.get(uri, {
                    cancelToken: source.token, ...config
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
    }, [config.params.q]); 

    return { data, isLoading, error };
}

