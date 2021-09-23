import React from 'react';

interface Props {

}

const Sidebar: React.FC<Props> = () => {
    return(
        <div className="sidebar">
            <div className="sidebar-heading-wrapp">
                <p className="sidebar-heading">StocksNow</p>
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
                            <p>1d</p>
                        </div> 
                    </li>
                    <li>
                        <div>
                            <p>5d</p>    
                        </div> 
                    </li>
                    <li>
                        <div>
                            <p>1mo</p>    
                        </div> 
                    </li>
                    <li>
                        <div>
                            <p>3mo</p>
                        </div> 
                    </li>
                    <li>
                        <div>
                            <p>6mo</p>
                        </div> 
                    </li>
                    <li>
                        <div>
                            <p>1y</p>
                        </div> 
                    </li>
                    <li>
                        <div>
                            <p>2y</p>    
                        </div> 
                    </li>
                    <li>
                        <div>
                            <p>5y</p>    
                        </div> 
                    </li>
                    <li>
                        <div>
                            <p>max</p>    
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