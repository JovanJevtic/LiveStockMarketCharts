import React from 'react';
import { format } from 'd3-format';
import { timeFormat } from "d3-time-format";
import {
    elderRay,
    ema,
    discontinuousTimeScaleProviderBuilder,
    Chart as Char,
    ChartCanvas,
    CurrentCoordinate,
    BarSeries,
    CandlestickSeries,
    ElderRaySeries,
    LineSeries,
    MovingAverageTooltip,
    OHLCTooltip,
    SingleValueTooltip,
    lastVisibleItemBasedZoomAnchor,
    XAxis,
    YAxis,
    CrossHairCursor,
    EdgeIndicator,
    MouseCoordinateX,
    MouseCoordinateY,
    ZoomButtons,
    withDeviceRatio,
    withSize,
} from "react-financial-charts";

interface Props {
    data: Array<DataObject>;
    height: number;
    dateTimeFormat?: string;
    width: number;
    ratio: number;
}

export interface DataObject {
    timestamp: number;
    close: number;
    open: number;
    high: number;
    low: number;
    volume: number;
}

const Chart: React.FC<Props> = ({ data: initialData, dateTimeFormat="%d %b", height, ratio, width }) => {
    const margin = { left: 0, right: 48, top: 12, bottom: 24 };
    const pricesDisplayFormat = format(".2f");
    const xScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor(
        (d: DataObject) => new Date(d.timestamp),
    );

    const ema12 = ema()
            .id(1)
            .options({ windowSize: 12 })
            .merge((d: any, c: any) => {
                d.ema12 = c;
            })
            .accessor((d: any) => d.ema12);

    const ema26 = ema()
        .id(2)
        .options({ windowSize: 136 })
        .merge((d: any, c: any) => {
            d.ema26 = c;
        })
        .accessor((d: any) => d.ema26);

        const elder = elderRay();

        const calculatedData = elder(ema26(ema12(initialData)));


        const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(calculatedData);

        const max = xAccessor(data[data.length - 1]);
        const min = xAccessor(data[Math.max(0, data.length - 100)]);
        const xExtents = [min, max + 5];

        const gridHeight = height - margin.top - margin.bottom;

        const elderRayHeight = 100;
        const elderRayOrigin = (_: number, h: number) => [0, h - elderRayHeight];
        const barChartHeight = gridHeight / 4;
        const barChartOrigin = (_: number, h: number) => [0, h - barChartHeight - elderRayHeight];
        const chartHeight = gridHeight - elderRayHeight;

        const timeDisplayFormat = timeFormat(dateTimeFormat);

        const barChartExtents = (data: DataObject) => {
            return data.volume;
        };
    
        const candleChartExtents = (data: DataObject) => {
            return [data.high, data.low];
        };
    
        const yEdgeIndicator = (data: DataObject) => {
            return data.close;
        };
    
        const volumeColor = (data: DataObject) => {
            return data.close > data.open ? "rgba(38, 166, 154, 0.3)" : "rgba(239, 83, 80, 0.3)";
        };
    
        const volumeSeries = (data: DataObject) => {
            return data.volume;
        };
    
        const openCloseColor = (data: DataObject) => {
            return data.close > data.open ? "#26a69a" : "#ef5350";
        };

    return(
        <>
        <ChartCanvas 
            clamp={false}
                height={height}
                ratio={ratio}
                width={width}
                margin={margin}
                data={data}
                displayXAccessor={displayXAccessor}
                seriesName="Data"
                xScale={xScale}
                xAccessor={xAccessor}
                xExtents={xExtents}
                zoomAnchor={lastVisibleItemBasedZoomAnchor}
            >
                <Char id={2} height={barChartHeight} origin={barChartOrigin} yExtents={barChartExtents}>
                    <BarSeries fillStyle={volumeColor} yAccessor={volumeSeries} />
                </Char>
                <Char id={3} height={chartHeight} yExtents={candleChartExtents}>
                    <XAxis showGridLines={true} showTicks={false} showTickLabel={false} gridLinesStrokeStyle="#0d1117"
                        strokeStyle="#4A5568"
                    />
                    <YAxis showGridLines={true} tickFormat={pricesDisplayFormat} gridLinesStrokeStyle="#0d1117"
                        strokeStyle="#4A5568"
                        tickLabelFill="#718096"
                        tickStrokeStyle="#718096"
                    />
                    <CandlestickSeries />
                    <LineSeries yAccessor={ema26.accessor()} strokeStyle={ema26.stroke()} />
                    <CurrentCoordinate yAccessor={ema26.accessor()} fillStyle={ema26.stroke()} />
                    <LineSeries yAccessor={ema12.accessor()} strokeStyle={ema12.stroke()} />
                    <CurrentCoordinate yAccessor={ema12.accessor()} fillStyle={ema12.stroke()} />
                    <MouseCoordinateY rectWidth={margin.right} displayFormat={pricesDisplayFormat} />
                    <EdgeIndicator
                        itemType="last"
                        rectWidth={margin.right}
                        fill={openCloseColor}
                        lineStroke={openCloseColor}
                        displayFormat={pricesDisplayFormat}
                        yAccessor={yEdgeIndicator}
                    />
                    <MovingAverageTooltip
                        origin={[8, 24]}
                        options={[
                            {
                                yAccessor: ema26.accessor(),
                                type: "EMA",
                                stroke: ema26.stroke(),
                                windowSize: ema26.options().windowSize,
                            },
                            {
                                yAccessor: ema12.accessor(),
                                type: "EMA",
                                stroke: ema12.stroke(),
                                windowSize: ema12.options().windowSize,
                            },
                        ]}
                    />

                    <ZoomButtons />
                    <OHLCTooltip origin={[8, 16]} />
                </Char>
                <Char
                    id={4}
                    height={elderRayHeight}
                    yExtents={[0, elder.accessor()]}
                    origin={elderRayOrigin}
                    padding={{ top: 8, bottom: 8 }}
                >
                    <XAxis showGridLines gridLinesStrokeStyle="#222222" />
                    <YAxis ticks={4} tickFormat={pricesDisplayFormat} />

                    <MouseCoordinateX displayFormat={timeDisplayFormat} />
                    <MouseCoordinateY rectWidth={margin.right} displayFormat={pricesDisplayFormat} />

                    <ElderRaySeries yAccessor={elder.accessor()} />

                    {/* <SingleValueTooltip
                        yAccessor={elder.accessor()}
                        yLabel="Elder Ray"
                        yDisplayFormat={(d: any) =>
                            `${pricesDisplayFormat(d.bullPower)}, ${pricesDisplayFormat(d.bearPower)}`
                        }
                        origin={[8, 16]}
                    /> */}
                </Char>
                <CrossHairCursor />
            </ChartCanvas>
        </>
    );   
}

export default Chart;