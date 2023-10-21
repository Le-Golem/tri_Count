import React from 'react';
import styles from "./display-event-style.module.css"
import { IEvent } from '@/core/model/IEvent';

const DisplayEventComponent: React.FC<{ event: IEvent, functionClick: Function }> = ({ event, functionClick }) => {
    return (
        <section className={styles.container} onClick={() => functionClick(event)}>
            <div key={event.eventId} className={styles.eventContent}>
                <p className={styles.fontTitle}>{event.label}</p>
                <p className={styles.fontDescription}>{event.description}</p>
                <div className={styles.footer}>
                    <span className={styles.date}>{"10/12/2021"}</span>
                    <span className={styles.participants}>{8} Participants</span>
                </div>
            </div>
        </section>
    );
};

export default DisplayEventComponent;
