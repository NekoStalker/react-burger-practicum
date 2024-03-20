import React from "react";
import ReactDOM from 'react-dom';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import modalStyles from './Modal.module.css'
function Modal (props) {
    //return ReactDOM.createPortal(
    return (
        <div className={modalStyles.modal}>
            <div className={modalStyles.modal_content}>
                <div className={`${modalStyles.modal_header}`}>
                    <p className="text text_type_main-large">Детали ингредиента</p>
                    <CloseIcon />
                </div>
                <div className={modalStyles.modal_body}>{props.children}</div>
            </div>
        </div>
    );
}

export default Modal;