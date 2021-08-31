import React from 'react';
import { useFetch } from '../hooks/useFetch';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

interface Props {
    stockQuery: string;
}

const MainAside: React.FC<Props> = ({ stockQuery }) => {
    
    const { data, isLoading, error } = useFetch(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete`, {
        json: true,
        gzip: true,
        headers: {
            "x-rapidapi-key": process.env.REACT_APP_X_RAPIDAPI_KEY as string,
            "x-rapidapi-host": process.env.REACT_APP_X_RAPIDAPI_HOST as string
        },
        params: {
            q: stockQuery,
            region: 'US'
        }
    });

    return(
        <div className="main-aside">

            <div className="main-aside-cards-headline-wrapp">
                <h1 className="main-aside-cards-headline">Most Recent:</h1>
            </div>

            <ul className="main-aside-cards-list">

                <div className="main-aside-card">
                    <div key={data?.news[0].uuid} >
                        <a className="main-aside-card-href" href={data?.news[0].link}>
                            <div className="main-aside-card-title-wrapp">
                                <h1 className="main-aside-card-title">{data?.news[0].title || 
                                    <SkeletonTheme color="#202020" highlightColor="#444"> 
                                        <Skeleton count={3} />
                                        <Skeleton width={200} />
                                    </SkeletonTheme>}
                                </h1>
                            </div>

                            <div className="main-aside-card-publisher-wrapp">
                                <p className="main-aside-card-publisher">{ data?.news[0].publisher && <p>Publisher: {data?.news[0].publisher} </p> || 
                                    <SkeletonTheme color="#202020" highlightColor="#444"> 
                                        <Skeleton width={160} />
                                    </SkeletonTheme>}
                                </p> 
                            </div>
                        </a>
                    </div>
                </div>

                <div className="main-aside-card">
                    <div key={data?.news[1].uuid} >
                        <a className="main-aside-card-href" href={data?.news[1].link}>
                            <div className="main-aside-card-title-wrapp">
                                <h1 className="main-aside-card-title">{data?.news[1].title || 
                                    <SkeletonTheme color="#202020" highlightColor="#444"> 
                                        <Skeleton count={3} />
                                        <Skeleton width={200} />
                                    </SkeletonTheme>}
                                </h1>
                            </div>

                            <div className="main-aside-card-publisher-wrapp">
                                <p className="main-aside-card-publisher">{ data?.news[1].publisher && <p>Publisher: {data?.news[1].publisher} </p> || 
                                    <SkeletonTheme color="#202020" highlightColor="#444"> 
                                        <Skeleton width={160} />
                                    </SkeletonTheme>}
                                </p> 
                            </div>
                        </a>
                    </div>
                </div>

                <div className="main-aside-card">
                    <div key={data?.news[2].uuid} >
                        <a className="main-aside-card-href" href={data?.news[2].link}>
                            <div className="main-aside-card-title-wrapp">
                                <h1 className="main-aside-card-title">{data?.news[2].title || 
                                    <SkeletonTheme color="#202020" highlightColor="#444"> 
                                        <Skeleton count={3} />
                                        <Skeleton width={200} />
                                    </SkeletonTheme>}
                                </h1>
                            </div>

                            <div className="main-aside-card-publisher-wrapp">
                                <p className="main-aside-card-publisher">{ data?.news[2].publisher && <p>Publisher: {data?.news[2].publisher} </p> || 
                                    <SkeletonTheme color="#202020" highlightColor="#444"> 
                                        <Skeleton width={160} />
                                    </SkeletonTheme>}
                                </p> 
                            </div>
                        </a>
                    </div>
                </div>
            </ul>

            <div className="main-aside-cards-footer-wrapp">
                <p>see more below:</p>
            </div>

        </div>
    );
}

export default MainAside;