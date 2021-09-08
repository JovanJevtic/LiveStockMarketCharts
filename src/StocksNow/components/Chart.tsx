import React from 'react';

interface Props {
    data: Array<DataObject>
}

export interface DataObject {
    timestamp: number;
    close: number;
    open: number;
    high: number;
    low: number;
    volume: number;
}

const Chart: React.FC<Props> = ({ data }) => {

    return(
        <>
        </>
    );   
}

export default Chart;