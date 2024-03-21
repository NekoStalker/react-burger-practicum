import React from "react";
import ReactDOM from 'react-dom';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import modalStyles from './Modal.module.css'
import ModalOvelay from "../ModalOverlay/ModalOverlay";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import OrderDetails from "../OrderDetails/OrderDetails";
function Modal (props) {

    //  const [title, setTitle] = React.useState('');
    // React.useEffect(() => {
    //     if (props.type === 'ingredient') {
    //         setTitle('Детали ингредиента');
    //     } else {
    //         setTitle('');
    //     }
    // }, [props.type]);

    // let ModalBody;
    // switch (props.type) {
    //     case 'order':
    //         ModalBody = <OrderDetails {...props} />;
    //         break;
    //     case 'ingredient':
    //         ModalBody = <IngredientDetails ingredient={testIngredient} />;
    //         break;
    //     default:
    //         ModalBody = props.children;
    //         break;
    // }
    return ReactDOM.createPortal(
        (
        <>    
            <ModalOvelay onClose={props.onClose} />
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

export default Modal;