import React from "react";
import { useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";

interface Props {

}

const StocksNow: React.FC<Props> = () => {

    return(
        <div className="app">
            <Header />

            <div className="content-wrapp">
                <div className="content">
                    <Sidebar />
                    <Main />
                </div>
            </div>
        </div>
    );
}

export default StocksNow;