import React from "react";
import { Link } from "react-router-dom";

interface Props {}

const Sidebar: React.FC<Props> = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-heading-wrapp">
        <p className="sidebar-heading">
          <Link to="/">MarketCap</Link>
        </p>
      </div>
      <div className="sidebar-list-wrapp">
        <ul>
          <li>
            <Link to="/latest-news" className="sidebar-link">
              <div>
                <p>Latest News</p>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/quotes" className="sidebar-link">
              <div>
                <p>Quotes</p>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/holders" className="sidebar-link">
              <div>
                <p>Holders</p>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/analysis" className="sidebar-link">
              <div>
                <p>Analysis</p>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/statistics" className="sidebar-link">
              <div>
                <p>Statistics</p>
              </div>
            </Link>
          </li>
        </ul>
      </div>
      <div className="sidebar-footer-wrapp"></div>
    </div>
  );
};

export default Sidebar;
