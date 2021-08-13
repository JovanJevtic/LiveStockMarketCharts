import React, { useEffect } from "react";
import { useState } from "react";
import { useFetch } from "../hooks/useFetch";

interface Props {
    stockQuery: string;
}

const StockChart: React.FC<Props> = ({ stockQuery }) => {

    const [symbol, setSymbol] = useState('');

    const { data: symbolData, isLoading: isLoadingSymbol, error: symbolError } = useFetch(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete`, {
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
        setSymbol(symbolData?.quotes[0].symbol as string);
    }, [symbolData])

    const { data, isLoading, error } = useFetch(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-chart`, {
        json: true,
        gzip: true,
        headers: {
            "x-rapidapi-key": process.env.REACT_APP_X_RAPIDAPI_KEY as string,
            "x-rapidapi-host": process.env.REACT_APP_X_RAPIDAPI_HOST as string
        },
        params: {
            symbol: symbol,
            interval: '5m',
            range: '1d',
            region: 'US'
        }
    });

    useEffect(() => {
        console.log(data);
    }, [data]);

    return(
        <>
        </>
    );
}

export default StockChart;