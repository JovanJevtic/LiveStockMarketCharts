import React from "react";
import { useState } from "react";
import StockChart from "./components/StockChart";
import StockNews from "./components/StockNews";

interface Props {

}

const StocksNow: React.FC<Props> = () => {

    const [ stockQuery, setStockQuery ] = useState('tesla');

    const onStockQueryChange = (e: React.FormEvent<HTMLInputElement>) => {
        setStockQuery(e.currentTarget.value);
    }

    return(
        <div className="app">
            <h1>Stocks Now</h1>

            <input name="stockQuery" value={stockQuery} onChange={onStockQueryChange} />
            <StockChart stockQuery={stockQuery} />
            <StockNews stockQuery={stockQuery} />
        </div>
    );
}

export default StocksNow;