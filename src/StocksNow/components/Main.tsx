import React from 'react';
import { useState } from 'react';
import StockChart from './StockChart';
import StockNews from './StockNews';

interface Props {

}

const Main: React.FC<Props> = () => {

    const [ stockQuery, setStockQuery ] = useState('tesla');

    const onStockQueryChange = (e: React.FormEvent<HTMLInputElement>) => {
        setStockQuery(e.currentTarget.value);
    }

    return(
        <div className="main">
            <input name="stockQuery" value={stockQuery} onChange={onStockQueryChange} />
            <StockChart stockQuery={stockQuery} />
            <StockNews stockQuery={stockQuery} />
        </div>
    );
}

export default Main;