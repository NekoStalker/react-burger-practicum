import React from "react";
import PropTypes from 'prop-types'; // Импортируйте PropTypes
import modalOvelayStyles from './ModalOverlay.module.css'
function ModalOverlay(props) {
    return ( 
        <>
            <div className={modalOvelayStyles.overlay} onClick={props.onClose}></div>
        </>
     );
}
ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired, // onClose должен быть функцией и обязателен
};

export default ModalOverlay;