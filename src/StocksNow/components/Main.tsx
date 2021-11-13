import React from 'react';
import { useState } from 'react';
import useWindowDimensions from '../hooks/useWindowDimensions';
import MainAside from './MainAside';
import MainContent from './MainContent';

interface Props {}

const Main: React.FC<Props> = () => {
  const [stockQuery, setStockQuery] = useState('tesla');

  const onStockQueryChange = (e: React.FormEvent<HTMLInputElement>) => {
    setStockQuery(e.currentTarget.value);
  };

  const { windowHeight, windowWidth } = useWindowDimensions();

  return (
    <div className='main'>
      <MainContent />

      { windowWidth > 1359 && <MainAside stockQuery={stockQuery} /> }
    </div>
  );
};

export default Main;
