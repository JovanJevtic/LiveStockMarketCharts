import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useFetch } from "./hooks/useFetch";

interface Props {

}

const StocksNow: React.FC<Props> = () => {

    const [ stockQuery, setStockQuery ] = useState('tesla');

    const onStockQueryChange = (e: React.FormEvent<HTMLInputElement>) => {
        setStockQuery(e.currentTarget.value);
    }

    const { data, isLoading, error } = useFetch(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete`, {
        json: true,
        gzip: true,
        headers: {
            "x-rapidapi-key": process.env.REACT_APP_X_RAPIDAPI_KEY as string,
            "x-rapidapi-host": process.env.REACT_APP_X_RAPIDAPI_HOST as string
        },
        params: {
            q: stockQuery,
            region: 'US'
        }
    });

    useEffect(() => {
        console.log(data);  
        console.log(typeof(data));
    }, [data]);

    return(
        <div className="app">
            <h1>Stocks Now</h1>

            <input name="stockQuery" value={stockQuery} onChange={onStockQueryChange} />

            {/* { data && data.map((object) => (
                <div key={object.id}> {object.title} </div>
            ))} */}
        </div>
    );
}

export default StocksNow;