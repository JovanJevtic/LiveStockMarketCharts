import React, { useEffect } from "react";
import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import useWindowDimensions from "../hooks/useWindowDimensions";
import Chart, { DataObject } from "./Chart";

interface Props {
    stockQuery: string;
}

interface Range {
  range: '1d' | '5d' | '1mo' | '3mo' | '6mo' | '1y' | '2y' | '5y' | 'max';
}

const StockChart: React.FC<Props> = ({ stockQuery }) => {

  const { windowHeight, windowWidth } = useWindowDimensions();

    const [symbol, setSymbol] = useState('');
    // const [range, setRange] = useState<Range>({range: '1d'});
    const [range, setRange] = useState<string>('1d');

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
            range: range,
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

    return(
        <div className="stockChart-wrapp">
            <div>
              <div className="chart-nav">
                <ul>
                  <li>
                    <div onClick={() => setRange('1d')}>
                        <p>1d</p>
                    </div> 
                  </li>
                  <li>
                      <div onClick={() => setRange('5d')}>
                          <p>5d</p>    
                      </div> 
                  </li>
                  <li>
                      <div>
                          <p>1mo</p>    
                      </div> 
                  </li>
                  <li>
                      <div>
                          <p>3mo</p>
                      </div> 
                  </li>
                  <li>
                      <div>
                          <p>6mo</p>
                      </div> 
                  </li>
                  <li>
                      <div>
                          <p>1y</p>
                      </div> 
                  </li>
                    <li>
                      <div>
                          <p>2y</p>    
                      </div> 
                  </li>
                  <li>
                      <div>
                          <p>5y</p>    
                      </div> 
                  </li>
                  <li>
                      <div>
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