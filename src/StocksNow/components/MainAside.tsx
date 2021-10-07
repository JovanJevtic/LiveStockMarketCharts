import React from 'react';
import { useFetch } from '../hooks/useFetch';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useEffect } from 'react';

interface Props {
  stockQuery: string;
}

const MainAside: React.FC<Props> = ({ stockQuery }) => {
  const { data, isLoading, error } = useFetch(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/news/list`, {
    json: true,
    gzip: true,
    headers: {
      'x-rapidapi-key': process.env.REACT_APP_X_RAPIDAPI_KEY as string,
      'x-rapidapi-host': process.env.REACT_APP_X_RAPIDAPI_HOST as string,
    },
    params: {
      q: 'generalnews',
      region: 'US',
    },
  });

  const {
    data: stockNews,
    isLoading: isStockNewsLoading,
    error: isStockNewsError,
  } = useFetch(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete`, {
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
    <div className='main-aside'>
      <div className='main-aside-cards-stockNews-wrapp'>
        <div className='stockNews-card'>
          <a href={stockNews?.news[0].link}>
            <div className='stockNews-headline-wrapp'>
              <p className='stockNews-headline'>
                {' '}
                Most recent from: <b style={{ color: '#27ffbc' }}>{stockQuery}</b>{' '}
              </p>
            </div>
            <div className='stockNews'>
              <div className='stockNews-title-wrapp'>
                <h1 className='stockNews-title'>
                  {stockNews?.news[0].title || (
                    <SkeletonTheme color='#202020' highlightColor='#444'>
                      <Skeleton count={3} />
                      <Skeleton width={200} />
                    </SkeletonTheme>
                  )}
                </h1>
              </div>

              <div className='stockNews-publisher-wrapp'>
                <p className='stockNews-publisher'>
                  {(stockNews?.news[0].publisher && <p>Publisher: {stockNews?.news[0].publisher} </p>) || (
                    <SkeletonTheme color='#202020' highlightColor='#444'>
                      <Skeleton width={160} />
                    </SkeletonTheme>
                  )}
                </p>
              </div>
            </div>
          </a>
        </div>
      </div>

      <ul className='main-aside-cards-list'>
        <div className='main-aside-card'>
          <p>Trending topics:</p>
        </div>

        <div className='main-aside-card'>
          <div key={data?.items.result[0].uuid}>
            <a className='main-aside-card-href' href={data?.items.result[0].link}>
              <div className='main-aside-card-title-wrapp'>
                <h1 className='main-aside-card-title'>
                  {data?.items.result[0].title || (
                    <SkeletonTheme color='#202020' highlightColor='#444'>
                      <Skeleton count={3} />
                      <Skeleton width={200} />
                    </SkeletonTheme>
                  )}
                </h1>
              </div>

              <div className='main-aside-card-publisher-wrapp'>
                <p className='main-aside-card-publisher'>
                  {(data?.items.result[0].publisher && <p>Publisher: {data?.items.result[0].publisher} </p>) || (
                    <SkeletonTheme color='#202020' highlightColor='#444'>
                      <Skeleton width={160} />
                    </SkeletonTheme>
                  )}
                </p>
              </div>
            </a>
          </div>
        </div>

        <div className='main-aside-card'>
          <div key={data?.items.result[1].uuid}>
            <a className='main-aside-card-href' href={data?.items.result[1].link}>
              <div className='main-aside-card-title-wrapp'>
                <h1 className='main-aside-card-title'>
                  {data?.items.result[1].title || (
                    <SkeletonTheme color='#202020' highlightColor='#444'>
                      <Skeleton count={3} />
                      <Skeleton width={200} />
                    </SkeletonTheme>
                  )}
                </h1>
              </div>

              <div className='main-aside-card-publisher-wrapp'>
                <p className='main-aside-card-publisher'>
                  {(data?.items.result[1].publisher && <p>Publisher: {data?.items.result[1].publisher} </p>) || (
                    <SkeletonTheme color='#202020' highlightColor='#444'>
                      <Skeleton width={160} />
                    </SkeletonTheme>
                  )}
                </p>
              </div>
            </a>
          </div>
        </div>

        <div className='main-aside-card'>
          <div key={data?.items.result[2].uuid}>
            <a className='main-aside-card-href' href={data?.items.result[2].link}>
              <div className='main-aside-card-title-wrapp'>
                <h1 className='main-aside-card-title'>
                  {data?.items.result[2].title || (
                    <SkeletonTheme color='#202020' highlightColor='#444'>
                      <Skeleton count={3} />
                      <Skeleton width={200} />
                    </SkeletonTheme>
                  )}
                </h1>
              </div>

              <div className='main-aside-card-publisher-wrapp'>
                <p className='main-aside-card-publisher'>
                  {(data?.items.result[2].publisher && <p>Publisher: {data?.items.result[2].publisher} </p>) || (
                    <SkeletonTheme color='#202020' highlightColor='#444'>
                      <Skeleton width={160} />
                    </SkeletonTheme>
                  )}
                </p>
              </div>
            </a>
          </div>
        </div>

        <div className='main-aside-card'>
          <a href='#'>
            <p>See more</p>
          </a>
        </div>
      </ul>

      <div className='main-aside-cards-footer-wrapp'>
        <p>read more below:</p>
      </div>
    </div>
  );
};

export default MainAside;
