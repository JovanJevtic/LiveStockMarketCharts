import React, { useEffect } from "react";
import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import useWindowDimensions from "../hooks/useWindowDimensions";
import Chart, { DataObject } from "./Chart";

interface Props {
    stockQuery: string;
}

const StockChart: React.FC<Props> = ({ stockQuery }) => {

  const { windowHeight, windowWidth } = useWindowDimensions();

    const [symbol, setSymbol] = useState('');

    const [timestamp, setTimestamp] = useState<Array<number> | undefined >([]);
    const [close, setClose] = useState<Array<number> | undefined>([]);
    const [open, setOpen] = useState<Array<number> | undefined>([]);
    const [high, setHigh] = useState<Array<number> | undefined>([]);
    const [low, setLow] = useState<Array<number> | undefined>([]);
    const [volume, setVolume] = useState<Array<number> | undefined>([]);

    const [previousClose, setPreviousClose] = useState<number>();

    const [items, setItems] = useState<Array<DataObject>>([]);
    
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
            range: '5d',
            region: 'US'
        }
    });

    useEffect(() => {
        setTimestamp(data?.chart.result[0].timestamp);
        setClose(data?.chart.result[0].indicators.quote[0].close);
        setLow(data?.chart.result[0].indicators.quote[0].low);
        setOpen(data?.chart.result[0].indicators.quote[0].open);
        setHigh(data?.chart.result[0].indicators.quote[0].high);
        setVolume(data?.chart.result[0].indicators.quote[0].volume);
    }, [data]);

    useEffect(() => {
      const dataItems = timestamp?.map((timestamp, index) => {

        if (close && open && high && low && volume) {
          return {
            timestamp: timestamp,
            close: close[index],
            open: open[index],
            high: open[index],
            low: low[index],
            volume: volume[index]
          }
        }
      });

      setItems(dataItems as Array<DataObject>);
    }, [timestamp, close, high, open, low, volume]);

    useEffect(() => {
      console.log('data:', data);
    }, [data])

    return(
        <div className="stockChart-wrapp">
          { items &&
            <div className="chart-wrapp">
              <Chart height={windowHeight/1.4} ratio={5} width={windowWidth/1.8} data={items} />   
            </div>}
        </div>
    );
}

export default StockChart;