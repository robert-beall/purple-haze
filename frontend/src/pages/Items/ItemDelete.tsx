import { FC } from "react";
import { ModalInfo } from "../../components/LazyModal";
import { Button } from "flowbite-react";
import PurpleClient from "../../utils/PurpleClient";
import { toast } from "react-toastify";

interface Props {
    id?: number;
    modal: ModalInfo;
    onSuccess?: () => void;
}

const ItemDelete: FC<Props> = ({id, modal, onSuccess}: Props): JSX.Element => {
    const onClick = async () => {
        PurpleClient.delete(`/items/${id}`)
            .then(() => {
                toast.success(`item ${id} has been deleted`, {position: 'top-center'});

                if (typeof onSuccess !== 'undefined') {
                    onSuccess();
                }

                modal.close();
            })
            .catch((e) => toast.error(e, {position: 'top-center'}));
    }
    
    return (
        <>
            <div className="text-xl mb-2">
                Do you want to delete item {id}?
            </div>
            <div className="w-100 float-right">
                <Button type="reset" color="dark" className="inline-block mr-4" onClick={() => modal.close()}>Cancel</Button>
                <Button type="button" color="purple" className="inline-block" onClick={onClick}>Delete</Button>
            </div>
        </>
       
    );
}

export default ItemDelete;