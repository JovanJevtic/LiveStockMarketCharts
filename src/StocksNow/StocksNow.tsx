import React from "react";
import { useEffect } from "react";
import { useFetch } from "./hooks/useFetch";

interface Props {

}

interface PostObject {
    title: string;
    id: number;
}

const StocksNow: React.FC<Props> = () => {

    const { data, isLoading, error } = useFetch('https://jsonplaceholder.typicode.com/todos/');

    useEffect(() => {
        console.log(data);
        console.log(typeof(data));
    }, [data]);

    return(
        <div className="app">
            <h1>Stocks Now</h1>
            { data && data.map((object) => (
                <div key={object.id}> {object.title} </div>
            ))}
        </div>
    );
}

export default StocksNow;