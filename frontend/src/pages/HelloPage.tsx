import { FC, useEffect, useState } from "react";
import PurpleClient from "../utils/PurpleClient";
import PageTitle from "../components/PageTitle";

const HelloPage: FC = (): JSX.Element => {
    const [helloContent, setHelloContent] = useState('');

    useEffect(() => {
        PurpleClient.get('hello')
        .then((res) => {
            console.log(`data: ${res.data}`);
            setHelloContent(res.data);
        })
        .catch(e => setHelloContent(e.message));
    });

    return (
        <>
            <PageTitle title="Hello" />
            <div>{helloContent}</div>  
        </>
    );
}

export default HelloPage;