import React from "react";
import modalOvelayStyles from './ModalOverlay.module.css'
function ModalOvelay(props) {
    return ( 
        <>
            <div className={modalOvelayStyles.overlay} onClick={props.onClose}></div>
        </>
     );
}

export default ModalOvelay;