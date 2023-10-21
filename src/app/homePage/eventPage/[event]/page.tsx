'use client'
import { IEvent } from '@/core/model/IEvent';
import eventService from '@/core/services/eventService';
import React, { useEffect, useState } from 'react';
import styles from './style.module.css'; 

interface PageProps {
    params: {
        event: number;
    };
}

const Page: React.FC<PageProps> = ({ params }) => {
    const [eventId , setEventId] : [eventId : number, setEventId : Function] = useState(params.event);
    const [event, setEvent] : [event : IEvent | undefined, setEvent : Function] = useState();
    const [showTransactions, setShowTransactions] : [showTransactions : boolean, setShowTransactions : Function] = useState(true);

    useEffect(() => {
        eventService.getByEventId(eventId).then(event => setEvent(event));
    }, [eventId]);

    return (
        <section className={styles.pageContainer}>
    <div className={styles.header}>
        <div className={styles.title}>
            <h1>{event?.label}</h1> 
        </div>
        <div className={styles.buttonsGroup}>
            <button
                className={`${styles.button} ${showTransactions ? styles.activeButton : ''}`}
                onClick={() => setShowTransactions(true)}
            >
                Transactions
            </button>
            <button
                className={`${styles.button} ${!showTransactions ? styles.activeButton : ''}`}
                onClick={() => setShowTransactions(false)}
            >
                Équilibre
            </button>
        </div>
        <div className={styles.addButtonContainer}>
            <button className={styles.submitConfirm}>
                Ajouter une transaction
            </button>
        </div>
    </div>
</section>

    );
};

export default Page;
