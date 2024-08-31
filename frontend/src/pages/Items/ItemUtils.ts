import * as yup from "yup";

export const categoryOptions = ['FOOD', 'CLEANING', 'HARDWARE'] as const;

export type category = typeof categoryOptions[number];

export const titleUri = 'items';

export type ItemModel = {
    id?: number;
    name: string;
    cost: number;
    weight: number; 
    category: category;
}

export const ItemSchema = yup.object<ItemModel>({
    name: yup.string().required(),
    cost: yup.number().required(),
    weight: yup.number().required(),
    category: yup.string().oneOf(categoryOptions)
});

export const ItemColumnDefintion = [
    { field: 'id' },
    { field: 'name' },
    { field: 'cost' },
    { field: 'weight' },
    { field: 'category' }, 
];
