import React, { useState } from "react";
import StockChart from "./StockChart";
import StockNews from "./StockNews";

interface Props {}

const MainContent: React.FC<Props> = () => {
  const [stockQuery, setStockQuery] = useState("tesla");

  const onStockQueryChange = (e: React.FormEvent<HTMLInputElement>) => {
    setStockQuery(e.currentTarget.value);
  };

  return (
    <div className="main-content">
      <div className="main-content-input-wrapp">
        <input
          name="stockQuery"
          value={stockQuery}
          onChange={onStockQueryChange}
        />
      </div>
      <StockChart stockQuery={stockQuery} />
      {/* <StockNews stockQuery={stockQuery} /> */}
    </div>
  );
};

export default MainContent;
