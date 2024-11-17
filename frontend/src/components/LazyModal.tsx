import { Modal } from "flowbite-react";
import { Dispatch, FC, lazy, SetStateAction, Suspense, useState } from "react";

interface Component {
    importer: Parameters<typeof import('react').lazy>[0];
    props: Record<string, unknown>;
}

interface Props {
    id: string;
    component: Component;
    isOpen: boolean; 
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    title: string;
    onClose?: () => void;
}

export interface ModalInfo {
    isOpen: boolean;
    close: () => void;
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const LazyModal: FC<Props> = ({id, component, isOpen, setIsOpen, title, onClose}: Props): JSX.Element => {
    const [isLoading, setIsLoading] = useState(true);

    const closeProcedure = (): void => {
        setIsOpen(false);

        if (typeof onClose !== 'undefined') {
            onClose();
        }
    }

    const Comp = lazy(component.importer);
    return (
        <Modal
            id={id}
            position="top-center"
            show={isOpen}
            onClose={closeProcedure}
        >
            <Modal.Header data-testid="modal-header">
                {title}
            </Modal.Header>
            <Modal.Body data-testid="modal-body">
                <Suspense fallback={<div>Loading...</div>}>
                    {isOpen ? <Comp {...component.props} modal={{ isOpen, close: closeProcedure, isLoading, setIsLoading }} /> : null }
                </Suspense>
            </Modal.Body>
        </Modal>
    );
};

export default LazyModal;