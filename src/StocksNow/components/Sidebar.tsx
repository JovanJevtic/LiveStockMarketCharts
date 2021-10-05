import React from 'react';

interface Props {

}

const Sidebar: React.FC<Props> = () => {
    return(
        <div className="sidebar">
            <div className="sidebar-heading-wrapp">
                <p className="sidebar-heading">MarketCap</p>
            </div>
            <div className="sidebar-list-wrapp">

                <ul>
                    <li>
                        <div> 
                            <p>Latest News</p>
                        </div>
                    </li>
                    <li>
                        <div>
                            <p>Quotes</p>
                        </div>
                    </li>
                    <li>
                        <div>
                            <p>Holders</p>
                        </div>
                    </li>
                    <li>
                        <div>
                            <p>Analysis</p>
                        </div>
                    </li>
                    <li>
                        <div>
                            <p>Statistics</p>
                        </div>
                    </li>
                </ul>

            </div>
            <div className="sidebar-footer-wrapp">

            </div>
        </div>
    );
}

export default Sidebar;