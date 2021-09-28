import React, { useEffect } from "react";
import { useState } from "react";
import { createLanguageServiceSourceFile } from "typescript";
import { useFetch } from "../hooks/useFetch";
import useWindowDimensions from "../hooks/useWindowDimensions";
import Chart, { DataObject } from "./Chart";

interface Props {
    stockQuery: string;
}

const StockChart: React.FC<Props> = ({ stockQuery }) => {

  const { windowHeight, windowWidth } = useWindowDimensions();

    const [symbol, setSymbol] = useState('');
    // const [range, setRange] = useState<Range>({range: '1d'});
    const [range, setRange] = useState<string>('1mo');
    const [interval, setInterval] = useState<string>('5m');

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
            interval: interval,
            range: range,
            region: 'US'
        }
    });

    useEffect(() => {
      if (data) {
          setTimestamp(data?.chart?.result[0]?.timestamp);
          setClose(data?.chart?.result[0]?.indicators?.quote[0]?.close);
          setLow(data?.chart?.result[0]?.indicators?.quote[0]?.low);
          setOpen(data?.chart?.result[0]?.indicators?.quote[0]?.open);
          setHigh(data?.chart?.result[0]?.indicators?.quote[0]?.high);
          setVolume(data?.chart?.result[0]?.indicators?.quote[0]?.volume); 
      }
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

    const rangeIntervalOnClick = (range: string, interval: string) => {
      setRange(range);
      setInterval(interval);
      setTimestamp([0]);
      setClose([0]);
      setLow([0]);
      setOpen([0]);
      setHigh([0]);
      setVolume([0]); 
    }

    return(
        <div className="stockChart-wrapp">
            <div>
              <div className="chart-nav">
                <ul>
                  <li>
                    <div onClick={() => rangeIntervalOnClick('1d', '5m')}>
                        <p>1d</p>
                    </div> 
                  </li>
                  <li>
                      <div onClick={() => rangeIntervalOnClick('5d', '5m')}>
                          <p>5d</p>    
                      </div> 
                  </li>
                  <li>
                      <div onClick={() => rangeIntervalOnClick('1mo', '5m')}> 
                          <p>1mo</p>    
                      </div> 
                  </li>
                  <li>
                      <div onClick={() => rangeIntervalOnClick('3mo', '60m')}>
                          <p>3mo</p>
                      </div> 
                  </li>
                  <li>
                      <div onClick={() => rangeIntervalOnClick('6mo', '60m')}> 
                          <p>6mo</p>
                      </div> 
                  </li>
                  <li>
                      <div onClick={() => rangeIntervalOnClick('1y', '60m')}>
                          <p>1y</p>
                      </div> 
                  </li>
                    <li>
                      <div onClick={() => rangeIntervalOnClick('2y', '60m')}>
                          <p>2y</p>    
                      </div> 
                  </li>
                  <li>
                      <div onClick={() => rangeIntervalOnClick('5y', '1d')}>
                          <p>5y</p>    
                      </div> 
                  </li>
                  <li>
                      <div onClick={() => rangeIntervalOnClick('max', '1d')}>
                          <p>max</p>    
                      </div> 
                  </li>
                </ul>
              </div>
              <div className="chart-wrapp">
                {items &&  <Chart height={windowHeight/1.4} ratio={5} width={windowWidth/1.8} data={items} />   }
              </div>
            </div>
            
        </div>
    );
}

export default StockChart;