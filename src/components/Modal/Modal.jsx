import React from "react";
import ReactDOM from 'react-dom';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import modalStyles from './Modal.module.css'
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import PropTypes from 'prop-types';
function Modal (props) {

    return ReactDOM.createPortal(
        (
        <>    
            <ModalOverlay onClose={props.onClose} />
            <div className={modalStyles.modal}>
                    <div className={`${modalStyles.modal_header}`}>
                        <h2 className="text text_type_main-large">{props.title}</h2>
                        <button type="button"  className={modalStyles.modal_close_button} onClick={props.onClose}><CloseIcon /></button>
                    </div>
                    <div className={modalStyles.modal_body}>
                        {props.children}
                    </div>
            </div>
        </>
        ),
        document.getElementById('modal-root')
    );
}
Modal.propTypes = {
    onClose: PropTypes.func.isRequired, 
    title: PropTypes.string, 
    children: PropTypes.node
};
export default Modal;