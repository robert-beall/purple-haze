import { Button } from "flowbite-react";
import { FC, useState } from "react";

const Actions: FC = (): JSX.Element => {
    const [displayOnClick, setDisplayOnClick] = useState(false);
    return (<>
       <div className="mb-5">
        <Button color="purple" onClick={() => {setDisplayOnClick(true)}}>Click Me!</Button>
       </div>
        <div className={`${!displayOnClick ? 'hidden' : ''} text-left`}>Surprise!</div>
    </>);
};

export default Actions;