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


            </div>
            <div className="sidebar-footer-wrapp">

            </div>
        </div>
    );
}

export default Sidebar;