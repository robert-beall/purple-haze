import { FC } from "react";

const HomePage: FC = (): JSX.Element => {
    return (
        <>
            <h1 className="text-purple-800 font-extrabold text-9xl">Purple Haze</h1>
            <h2 className="text-purple-500 font-extrabold text-4xl mt-6">
                A Simple and Fearless Playwright Testbed
            </h2>
        </>  
    );
}

export default HomePage;