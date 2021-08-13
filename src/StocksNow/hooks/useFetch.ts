import { useEffect, useState } from "react";
import axios from 'axios';

interface Error {
    isError: boolean;
    errMessage: string;
}

interface PostObject {
    news: Array<StockNewsObject>;
    quotes: Array<QuotesObject>
}

interface QuotesObject {
    symbol: string;
}

interface StockNewsObject {
    title: string;
    uuid: number;
    link: string;
    publisher: string;
}

interface ConfigTypes {
    params: {
        q?: string;
        region?: string;
        interval?: string; 
        symbol?: string; 
        range?: string;
    };
    headers: {
        'x-rapidapi-key': string;
        'x-rapidapi-host': string;
    }
    json: boolean;
    gzip: boolean;
}

export const useFetch = (uri: string, config: ConfigTypes) => {
    const [ data, setData ] = useState<PostObject>();
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
    }, [config.params.q, config.params.symbol]); 

    return { data, isLoading, error };
}

