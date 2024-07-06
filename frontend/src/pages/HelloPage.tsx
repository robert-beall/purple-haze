import { FC, useEffect, useState } from "react";
import PurpleClient from "../utils/PurpleClient";

const HelloPage: FC = (): JSX.Element => {
    const [helloContent, setHelloContent] = useState('');

    // const client = axios.create({
    //     baseURL: 'http://backend:5000',
    // });

    useEffect(() => {
        PurpleClient.get('hello')
        .then((res) => {
            console.log(`data: ${res.data}`);
            setHelloContent(res.data);
        })
        .catch(e => setHelloContent(e.message));
    });

    return (
        <div>
            {helloContent}
        </div>  
    );
}

export default HelloPage;