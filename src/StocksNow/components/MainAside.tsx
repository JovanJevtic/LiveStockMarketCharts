import React from 'react';
import { useFetch } from '../hooks/useFetch';

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
            {
                data && 

                <ul className="main-aside-cards-list">
                    <div className="main-aside-card">
                        <div key={data.news[0].uuid} style={{marginTop: '20px'}}>
                            <a style={{fontSize: '22px', fontWeight: 'bold'}} href={data.news[0].link}>{data.news[0].title}</a>
                            <p>Publisher: {data.news[0].publisher}</p>
                        </div>
                    </div>

                    <div className="main-aside-card">
                        <div key={data.news[1].uuid} style={{marginTop: '20px'}}>
                            <a style={{fontSize: '22px', fontWeight: 'bold'}} href={data.news[1].link}>{data.news[1].title}</a>
                            <p>Publisher: {data.news[1].publisher}</p>
                        </div>
                    </div>

                    <div className="main-aside-card">
                        <div key={data.news[2].uuid} style={{marginTop: '20px'}}>
                            <a style={{fontSize: '22px', fontWeight: 'bold'}} href={data.news[2].link}>{data.news[2].title}</a>
                            <p>Publisher: {data.news[2].publisher}</p>
                        </div>
                    </div>
                </ul>
            }

        </div>
    );
}

export default MainAside;