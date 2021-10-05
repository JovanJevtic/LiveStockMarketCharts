import React from "react";
import { useState } from "react";
import MainAside from "./MainAside";
import MainContent from "./MainContent";

interface Props {}

const Main: React.FC<Props> = () => {
  const [stockQuery, setStockQuery] = useState("tesla");

  const onStockQueryChange = (e: React.FormEvent<HTMLInputElement>) => {
    setStockQuery(e.currentTarget.value);
  };

  return (
    <div className="main">
      <MainContent />

      <MainAside stockQuery={stockQuery} />
    </div>
  );
};

export default Main;
