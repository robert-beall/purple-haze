import { AxiosResponse } from "axios";
import { FC, useEffect, useState } from "react";
import PurpleClient from "../../utils/PurpleClient";
import { ItemModel, titleUri } from "./ItemUtils";

import { IconSettings } from "@tabler/icons-react";
import { Button, Dropdown } from "flowbite-react";
import { FilterMatchMode } from "primereact/api";
import { Column } from 'primereact/column';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import LazyModal from "../../components/LazyModal";
import { ToastContainer } from "react-toastify";
        

const ItemTable: FC = (): JSX.Element => {
    const [itemData, setItemData] = useState<Array<ItemModel>>([]);
    const [loading, setLoading] = useState(true);

    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const [editId, setEditId] = useState(NaN);
    const [deleteId, setDeleteId] = useState(NaN);

    const filters: DataTableFilterMeta = {
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'id': { value: null, matchMode: FilterMatchMode.EQUALS },
        'name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'cost': { value: null, matchMode: FilterMatchMode.EQUALS },
        'weight': { value: null, matchMode: FilterMatchMode.EQUALS },
        'category': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'verified': { value: null, matchMode: FilterMatchMode.EQUALS }
    };

    useEffect(() => {
        const fetchData = () => {
            PurpleClient.get(`/${titleUri}`)
            .then((res: AxiosResponse) => {
                setItemData(res.data);
            })
            .catch((e: Error) => { console.error(e); })
            .finally(() => setLoading(false));
        }
        
        if (loading) {
            console.log('loading reset -- get data');
            fetchData();
            setLoading(false);
        }
    }, [loading]);

    const resetLoading = () => {
        setLoading(true);
    }

    return (
        <>
            <ToastContainer />
            <LazyModal
                component={{
                        importer: () => import('./ItemForm'),
                        props: {onSuccess: resetLoading}
                }}
                isOpen={showAdd}
                setIsOpen={setShowAdd}
                title="Add Item"
            />
            <LazyModal
                component={{
                        importer: () => import('./ItemForm'),
                        props: {id: editId, onSuccess: resetLoading}
                }}
                isOpen={showEdit}
                setIsOpen={setShowEdit}
                title="Edit Item"
            />
            <LazyModal
                component={{
                        importer: () => import('./ItemDelete'),
                        props: {id: deleteId, onSuccess: resetLoading}
                }}
                isOpen={showDelete}
                setIsOpen={setShowDelete}
                title="Delete Item"
            />
            <h1 className="text-purple-800 text-4xl text-left mb-2">Items</h1>
            <DataTable 
                header={
                    <Button 
                        color="purple" 
                        onClick={() => {
                            setShowAdd(true);
                        }}
                    >
                        Add Item
                    </Button>
                }
                value={itemData} 
                showGridlines 
                stripedRows
                paginator
                rows={5} 
                rowsPerPageOptions={[5, 10, 25, 50]} 
                sortMode="multiple"
                removableSort
                filters={filters}
                filterDisplay="row"
                tableStyle={{ minWidth: '50rem' }}
            >
                <Column 
                    body={(data) => {
                        return (<Dropdown color="purple"
                                    data-testid={data.id} 
                                    label={<IconSettings />}
                                    dismissOnClick={false}
                                >
                            <Dropdown.Item onClick={() => {
                                setShowEdit(true);
                                setEditId(data.id);
                            }}>
                                Edit
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => {
                                setShowDelete(true);
                                setDeleteId(data.id);
                            }}>
                                Delete
                            </Dropdown.Item>
                        </Dropdown>)
                    }}
                    headerStyle={{ width: '10%', minWidth: '8rem' }} 
                    bodyStyle={{ textAlign: 'center' }}
                />
                <Column 
                    field="id" 
                    header="ID" 
                    sortable 
                    filter 
                    filterPlaceholder="ID" 
                />
                <Column 
                    field="name" 
                    header="Name" 
                    sortable
                    filter
                    filterPlaceholder="Name"
                />
                <Column 
                    field="cost" 
                    header="Cost" 
                    sortable
                    filter
                    filterPlaceholder="Cost"
                />
                <Column 
                    field="weight" 
                    header="Weight" 
                    sortable
                    filter
                    filterPlaceholder="Weight"
                />
                <Column 
                    field="category" 
                    header="Category" 
                    sortable 
                    filter
                    filterPlaceholder="Category"
                />
            </DataTable>
        </>
        
        );
}

export default ItemTable;