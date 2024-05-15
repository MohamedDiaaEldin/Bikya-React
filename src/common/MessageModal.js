import React from 'react';
import './messageModal.css';

const MessageModal = ({ message, onCancel }) => {
    const handleOverlayClick = () => {
        onCancel();
    };

    const handleCancelButtonClick = () => {
        onCancel();
    };

    return (
        <div className="message-overlay" onClick={handleOverlayClick}>
            <div className="message">
                <p>{message}</p>
                <button className="cancel-button" onClick={handleCancelButtonClick}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default MessageModal;
