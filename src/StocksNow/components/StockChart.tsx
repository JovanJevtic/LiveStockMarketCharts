import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { createLanguageServiceSourceFile } from 'typescript';
import { useFetch } from '../hooks/useFetch';
import useWindowDimensions from '../hooks/useWindowDimensions';
import Chart, { DataObject } from './Chart';
import ChartNavBtn from './ChartNavBtn';

interface Props {
  stockQuery: string;
}

const StockChart: React.FC<Props> = ({ stockQuery }) => {
  const btnRef = useRef<Array<HTMLDivElement | null>>([]);
  const { windowHeight, windowWidth } = useWindowDimensions();

  const [symbol, setSymbol] = useState('');
  const [ranges, setRanges] = useState<Array<string>>(['1d', '5d', '1mo', '3mo', '6mo', '1y', '2y', '5y', 'max']);
  const [range, setRange] = useState<string>('1mo');
  const [interval, setInterval] = useState<string>('5m');

  const [timestamp, setTimestamp] = useState<Array<number> | undefined>([]);
  const [close, setClose] = useState<Array<number> | undefined>([]);
  const [open, setOpen] = useState<Array<number> | undefined>([]);
  const [high, setHigh] = useState<Array<number> | undefined>([]);
  const [low, setLow] = useState<Array<number> | undefined>([]);
  const [volume, setVolume] = useState<Array<number> | undefined>([]);

  const [previousClose, setPreviousClose] = useState<number>();

  const [items, setItems] = useState<Array<DataObject>>([]);

  const {
    data: symbolData,
    isLoading: isLoadingSymbol,
    error: symbolError,
  } = useFetch(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete`, {
    json: true,
    gzip: true,
    headers: {
      'x-rapidapi-key': process.env.REACT_APP_X_RAPIDAPI_KEY as string,
      'x-rapidapi-host': process.env.REACT_APP_X_RAPIDAPI_HOST as string,
    },
    params: {
      q: stockQuery,
      region: 'US',
    },
  });

  useEffect(() => {
    setSymbol(symbolData?.quotes[0].symbol as string);
  }, [symbolData]);

  const { data, isLoading, error } = useFetch(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-charts`, {
    json: true,
    gzip: true,
    headers: {
      'x-rapidapi-key': process.env.REACT_APP_X_RAPIDAPI_KEY as string,
      'x-rapidapi-host': process.env.REACT_APP_X_RAPIDAPI_HOST as string,
    },
    params: {
      symbol: symbol,
      interval: interval,
      range: range,
      region: 'US',
    },
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
          volume: volume[index],
        };
      }
    });

    setItems(dataItems as Array<DataObject>);
  }, [timestamp, close, high, open, low, volume]);

  const rangeIntervalOnClick = (range: string, interval: string, num: number) => {
    setRange(range);
    setInterval(interval);
    setTimestamp([0]);
    setClose([0]);
    setLow([0]);
    setOpen([0]);
    setHigh([0]);
    setVolume([0]);
  };

  return (
    <div className='stockChart-wrapp'>
      <div>
        <div className='chart-nav'>
          <ul>
            <li>
              <div onClick={() => rangeIntervalOnClick('1d', '5m', 0)} ref={(el) => (btnRef.current[0] = el)}>
                <p>1d</p>
              </div>
            </li>
            <li>
              <div ref={(el) => (btnRef.current[1] = el)} onClick={() => rangeIntervalOnClick('5d', '5m', 1)}>
                <p>5d</p>
              </div>
            </li>
            <li>
              <div ref={(el) => (btnRef.current[2] = el)} onClick={() => rangeIntervalOnClick('1mo', '5m', 2)}>
                <p>1mo</p>
              </div>
            </li>
            <li>
              <div ref={(el) => (btnRef.current[3] = el)} onClick={() => rangeIntervalOnClick('3mo', '60m', 3)}>
                <p>3mo</p>
              </div>
            </li>
            <li>
              <div ref={(el) => (btnRef.current[4] = el)} onClick={() => rangeIntervalOnClick('6mo', '60m', 4)}>
                <p>6mo</p>
              </div>
            </li>
            <li>
              <div ref={(el) => (btnRef.current[5] = el)} onClick={() => rangeIntervalOnClick('1y', '60m', 5)}>
                <p>1y</p>
              </div>
            </li>
            <li>
              <div ref={(el) => (btnRef.current[6] = el)} onClick={() => rangeIntervalOnClick('2y', '60m', 6)}>
                <p>2y</p>
              </div>
            </li>
            <li>
              <div ref={(el) => (btnRef.current[7] = el)} onClick={() => rangeIntervalOnClick('5y', '1d', 7)}>
                <p>5y</p>
              </div>
            </li>
            <li>
              <div ref={(el) => (btnRef.current[8] = el)} onClick={() => rangeIntervalOnClick('max', '1d', 8)}>
                <p>max</p>
              </div>
            </li>
          </ul>
        </div>
        <div className='chart-wrapp'>{items && <Chart height={windowHeight / 1.4} ratio={5} width={windowWidth / 1.8} data={items} />}</div>
      </div>
    </div>
  );
};

export default StockChart;
