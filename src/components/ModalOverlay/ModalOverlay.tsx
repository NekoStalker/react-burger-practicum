import React, { FC } from "react";
import modalOverlayStyles from './ModalOverlay.module.css';

interface IModalOverlay {
    onClose: () => void;
}

const ModalOverlay: FC<IModalOverlay> = ({ onClose }) => {
    return <div className={modalOverlayStyles.overlay} onClick={onClose} />;
};

export default ModalOverlay;
