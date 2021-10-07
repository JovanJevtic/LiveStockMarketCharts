import React from 'react';
import { useFetch } from '../hooks/useFetch';

interface Props {
  stockQuery: string;
}

const StockNews: React.FC<Props> = ({ stockQuery }) => {
  const { data, isLoading, error } = useFetch(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete`, {
    json: true,
    gzip: true,
    headers: {
      'x-rapidapi-key': process.env.REACT_APP_X_RAPIDAPI_KEY as string,
      'x-rapidapi-host': process.env.REACT_APP_X_RAPIDAPI_HOST as string,
    },
    params: {
      q: stockQuery,
      region: 'US',
    },
  });

  return (
    <>
      {data &&
        data.news.map((ob) => (
          <div key={ob.uuid} style={{ marginTop: '20px' }}>
            <a style={{ fontSize: '22px', fontWeight: 'bold' }} href={ob.link}>
              {ob.title}
            </a>
            <p>Publisher: {ob.publisher}</p>
          </div>
        ))}
    </>
  );
};

export default StockNews;
