import React from 'react';
import Header from './components/Header';
import Main from './components/Main';
import { PublicRoute, Routes } from './components/routes';
import Sidebar from './components/Sidebar';
import useWindowDimensions from './hooks/useWindowDimensions';
import { EmptyPage } from './pages/empty';

interface Props {}

const StocksNow: React.FC<Props> = () => {
  
  const { windowHeight, windowWidth } = useWindowDimensions();

  return (
    <div className='app'>
      {/* <Header /> */}
      <Routes>
        <div className='content-wrapp'>
          <div className='content'>

            { windowWidth > 899 && <Sidebar /> }
                    
            <PublicRoute exact path='/' component={Main} />
            <PublicRoute path='/latest-news' component={EmptyPage} />
            <PublicRoute path='/quotes' component={EmptyPage} />
            <PublicRoute path='/holders' component={EmptyPage} />
            <PublicRoute path='/analysis' component={EmptyPage} />
            <PublicRoute path='/statistics' component={EmptyPage} />
          </div>
        </div>
      </Routes>
    </div>
  );
};

export default StocksNow;
