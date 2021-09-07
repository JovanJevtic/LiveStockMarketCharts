import React, { useEffect } from "react";
import { useState } from "react";
import { useFetch } from "../hooks/useFetch";

interface Props {
    stockQuery: string;
}

const StockChart: React.FC<Props> = ({ stockQuery }) => {

    const [symbol, setSymbol] = useState('');

    const [timestamp, setTimestamp] = useState<Array<number> | undefined >([]);
    const [close, setClose] = useState<Array<number> | undefined>([]);
    const [open, setOpen] = useState<Array<number> | undefined>([]);
    const [high, setHigh] = useState<Array<number> | undefined>([]);
    const [low, setLow] = useState<Array<number> | undefined>([]);
    const [volume, setVolume] = useState<Array<number> | undefined>([]);

    const [previousClose, setPreviousClose] = useState<number>();
    
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

    const { data, isLoading, error } = useFetch(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-charts`, {
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
        setTimestamp(data?.chart.result[0].timestamp);
        setClose(data?.chart.result[0].indicators.quote[0].close);
        setLow(data?.chart.result[0].indicators.quote[0].low);
        setOpen(data?.chart.result[0].indicators.quote[0].open);
        setClose(data?.chart.result[0].indicators.quote[0].close);
        setHigh(data?.chart.result[0].indicators.quote[0].high);
        setVolume(data?.chart.result[0].indicators.quote[0].volume);
    }, [data]);

    return(
        <>
        </>
    );
}

export default StockChart;