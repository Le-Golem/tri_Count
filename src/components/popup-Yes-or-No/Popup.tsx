import React from 'react';
import styles from './Popup.module.css'; // Assurez-vous d'importer vos styles CSS

const Popup = ({ message, onYesClick, onNoClick } : {message : string , onYesClick : Function , onNoClick : Function}) => {
    return (
        <div className={styles.popupOverlay}>
            <div className={styles.popup}>
                <p style={{color : "black"}}>{message}</p>
                <div className={styles.buttonContainer}>
                    <button className={styles.button} onClick={() => onYesClick()}>Oui</button>
                    <button className={styles.button} onClick={() => onNoClick(false)}>Non</button>
                </div>
            </div>
        </div>
    );
};

export default Popup;
