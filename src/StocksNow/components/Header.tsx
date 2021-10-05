import React from "react";

interface Props {}

const Header: React.FC<Props> = () => {
  return (
    <div className="header">
      <nav className="container">
        <div className="logo-wrapp">
          <a href="/" id="logo">
            StocksNow
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Header;
