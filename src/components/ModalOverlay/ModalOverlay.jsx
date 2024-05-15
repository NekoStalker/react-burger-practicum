import React from "react"
import PropTypes from 'prop-types'
import modalOvelayStyles from './ModalOverlay.module.css'
function ModalOverlay({onClose,...props}) {
    return ( 
        <>
            <div className={modalOvelayStyles.overlay} onClick={onClose}></div>
        </>
     );
}
ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired, 
}

export default ModalOverlay;