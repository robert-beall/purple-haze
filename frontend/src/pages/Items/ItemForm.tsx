import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosPromise } from "axios";
import { Button, Label, Select, TextInput } from "flowbite-react";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from "yup";
import { ModalInfo } from "../../components/LazyModal";
import PurpleClient from "../../utils/PurpleClient";
import { category, categoryOptions } from "./ItemUtils";

interface Props {
    id?: number;
    modal: ModalInfo;
    onSuccess?: () => void;
}

type ItemModel = {
    name: string;
    cost: number;
    weight: number; 
    category: category;
}

const ItemSchema = yup.object({
    name: yup.string().required(),
    cost: yup.number().required(),
    weight: yup.number().required(),
    category: yup.string().oneOf(categoryOptions).required()
}).required();


const ItemForm: FC<Props> = ({id, modal, onSuccess}: Props): JSX.Element => {
    const [item, setItem] = useState<ItemModel>({
        name: '',
        cost: 0,
        weight: 0,
        category: 'FOOD' as category
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            if (typeof id !== 'undefined') {
                setItem((await PurpleClient.get<ItemModel>(`/items/${id}`)).data);
            }

            setLoading(false);
        }

        if (loading) {
            void getData();
        }
    }, [loading, item, id]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(ItemSchema),
        defaultValues: typeof id !== 'undefined' 
            ? async (): Promise<ItemModel> => (await PurpleClient.get(`/items/${id}`)).data 
            : {
                name: '',
                cost: 0,
                weight: 0,
                category: 'FOOD' as category
            },
    });
      
    const onSubmit = (data: ItemModel) => {
        const Request: AxiosPromise<ItemModel> = typeof id === 'undefined' ? PurpleClient.post('/items', data) : PurpleClient.put(`/items/${id}`, data);
        
        Request.then(() => {
            const action = typeof id === 'undefined' ? 'added' : 'updated';
            
            toast.success(`Item ${data.name} has been ${action}`, {position: 'top-center'});

            if (typeof onSuccess !== 'undefined') {
                onSuccess();
            }

            modal.close();
        })
        .catch(e => toast.error(e, {position: 'top-center'}));
    }

    return (
        <div className="flex">
            <div className="w-full">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid-cols-1">
                        <Label>
                            Name
                            <TextInput {...register("name")} title="Name"/>
                            <p className="text-red-500">{errors.name?.message}</p>
                        </Label>
                        <Label>
                            Cost
                            <TextInput {...register('cost')} title="Cost" type="number" step=".01"/>
                            <p className="text-red-500">{errors.cost?.message}</p>
                        </Label>
                        <Label>
                            Weight
                            <TextInput {...register('weight')} title="Weight" type="number" step=".001" />
                            <p className="text-red-500">{errors.weight?.message}</p>
                        </Label>
                        <Label>
                            Category
                            <Select {...register('category')} title="Category" >
                                {categoryOptions.map(o => {
                                    return (<option key={o} id={o} value={o}>{o}</option>)
                                })}
                            </Select>
                            <p className="text-red-500">{errors.category?.message}</p>
                        </Label>
                    </div>
                    <div className="modal-foot">
                        <div className="w-100 my-10 float-end">
                            <Button type="reset" color="dark" className="inline-block mr-4" onClick={() => modal.close()}>Close</Button>
                            <Button type="submit" color="purple" className="inline-block">Submit</Button>
                        </div>
                    </div>
                </form> 
            </div>
        </div>
        
    );
}

export default ItemForm;