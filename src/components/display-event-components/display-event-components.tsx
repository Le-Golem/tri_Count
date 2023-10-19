import React from 'react'; 
import styles from "./display-event-style.module.css"
import { IEvent } from '@/core/model/IEvent';

const DisplayEventComponent: React.FC<{event: IEvent , functionClick : Function}> = ({ event , functionClick}) => {
    return (
        <section className={styles.container} onClick={() => functionClick(event)}>
                <div key={event.eventId} style={{textAlign: "center" , marginTop :"10px" }}>
                    <p className={styles.fontTitle}>{event.label}</p>
                    <p className={styles.fontDescription}>{event.description}</p>
                </div>
        </section>
    );
};

export default DisplayEventComponent;