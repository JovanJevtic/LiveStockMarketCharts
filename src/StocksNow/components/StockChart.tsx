import React, { useEffect } from "react";
import { useState } from "react";
import { useFetch } from "../hooks/useFetch";

import { ResponsiveLine } from '@nivo/line';
import { isTypeOnlyImportOrExportDeclaration } from "typescript";

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

    const [items, setItems] = useState<Array<Object>>([]);
    
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
        setHigh(data?.chart.result[0].indicators.quote[0].high);
        setVolume(data?.chart.result[0].indicators.quote[0].volume);
    }, [data]);

    useEffect(() => {
      const dataItems = timestamp?.map((timestamp, index) => {

        if (close && open && high && low && volume) {
          return {
            x: timestamp,
            y: close[index],
            // open: open[index],
            // high: open[index],
            // low: low[index],
            // volume: volume[index]
          }
        }
      });

      setItems(dataItems as Array<Object>);
    }, [timestamp, close, high, open, low, volume]);

    const dats = [
        {
          "id": "japan",
          "color": "hsl(233, 70%, 50%)",
          "data": items
        }
    ];

    return(
        <div style={{height: '500px', width: '900px'}}>
          { items && <ResponsiveLine 
                data={dats} 
                pointSize={10}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={3}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabelYOffset={-12}
                useMesh={true}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: 'point' }}
                yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
                yFormat=" >-.2f"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'transportation',
                    legendOffset: 36,
                    legendPosition: 'middle'
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'count',
                    legendOffset: -40,
                    legendPosition: 'middle'
                }}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(255, 255, 255, .5)',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemBackground: 'rgba(255, 255, 255, .03)',
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}

                colors={{ scheme: 'yellow_green' }}
            /> }
        </div>
    );
}

export default StockChart;