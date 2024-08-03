import { FC } from "react";
import { Helmet } from "react-helmet";

interface Props {
    title?: string;
}

const PageTitle: FC<Props> = ({title = undefined}: Props): JSX.Element => {
    return (
        <Helmet>
            <title>Purple Haze{typeof title !== 'undefined' ? ` - ${title}` : ''}</title>
        </Helmet>
    );
};

export default PageTitle;