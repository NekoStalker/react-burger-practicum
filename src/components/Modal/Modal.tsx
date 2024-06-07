import React, {FC, useState,useEffect} from "react";
import ReactDOM from 'react-dom';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import modalStyles from './Modal.module.css';
import ModalOverlay from "../ModalOverlay/ModalOverlay";

interface IModal {
    onClose: () => void;
    children: React.ReactNode;
    title: string;
}
const Modal: FC<IModal> = ({onClose, title, children}) => {
    const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);
    useEffect(() => {
        const element = document.getElementById('modal-root');
        setModalRoot(element); 

        const onEscDown = (e: KeyboardEvent) => {
            if(e.key === 'Escape') {
                onClose();
            }
        }

        document.addEventListener('keydown',onEscDown);
        return () =>{
            document.removeEventListener('keydown',onEscDown);
        }
       
    }, [onClose]);

    if (!modalRoot) {
        return null; 
    }
    return ReactDOM.createPortal(
        (
        <>    
            <ModalOverlay onClose={onClose} />
            <div className={modalStyles.modal}>
                    <div className={`${modalStyles.modal_header}`}>
                        <h2 className="text text_type_main-large">{title}</h2>
                        <button type="button"  className={modalStyles.modal_close_button} onClick={onClose}><CloseIcon  type="primary"/></button>
                    </div>
                    <div className={modalStyles.modal_body}>
                        {children}
                    </div>
            </div>
        </>
        ),
        modalRoot
    );
}

export default Modal;