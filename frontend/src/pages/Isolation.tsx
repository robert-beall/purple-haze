import { IconCircleDashedNumber1, IconCircleDashedNumber2 } from "@tabler/icons-react";
import { Button } from "flowbite-react";
import { FC, useState } from "react";

const Isolation: FC = (): JSX.Element => {
    const [displayOneOnClick, setDisplayOneOnClick] = useState(false);
    const [displayTwoOnClick, setDisplayTwoOnClick] = useState(false);

    return (<div className="text-left">
        <div className="mb-5">
            <Button color="purple" className="mb-3" data-testid="button1" onClick={() => setDisplayOneOnClick(true)}>Click One!</Button>
            <div className={`${!displayOneOnClick ? 'hidden' : ''} text-left`}><IconCircleDashedNumber1 /> TADA!</div>
        </div>
        <div>
            <Button color="dark" className="mb-3" data-testid="button2" onClick={() => setDisplayTwoOnClick(true)}>Click Two!</Button>
            <div className={`${!displayTwoOnClick ? 'hidden' : ''} text-left`}><IconCircleDashedNumber2 /> WHOO HOO!</div>
        </div>
    </div>)
};

export default Isolation;