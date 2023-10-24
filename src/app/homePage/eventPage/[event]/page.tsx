'use client'
import eventService from '@/core/services/eventService';
import React, { useEffect, useState } from 'react';
import styles from './style.module.css'; 
import { IEventWithTransactions } from '@/core/model/IEventWithTransactions';
import TransactionsAddPopup from '@/components/addTransactionPopup/add-transaction-popup';

interface PageProps {
    params: {
        event: number;
    };
}

const Page: React.FC<PageProps> = ({ params }) => {
    const [eventId , setEventId] : [eventId : number, setEventId : Function] = useState(params.event);
    const [event, setEvent] : [event : IEventWithTransactions | undefined, setEvent : Function] = useState();
    console.log("🚀 ~ file: page.tsx:17 ~ event:", event)
    const [showTransactions, setShowTransactions] : [showTransactions : boolean, setShowTransactions : Function] = useState(true);

    const [displayPopupAddTransaction, setDisplayPopupAddTransaction] : [displayPopupAddTransaction : boolean, setDisplayPopup : Function] = useState(false);

    useEffect(() => {
        eventService.getByEventId(eventId).then(event => setEvent(event));
    }, [eventId]);

    return (
        <section className={styles.pageContainer}>
            <div className={styles.header}>
                <div className={styles.title}>
                    <h1>{event?.event.label}</h1> 
                </div>
                <div className={styles.buttonsGroup}>
                    <button
                        className={`${styles.button} ${styles.transactionsButton} ${showTransactions ? styles.activeButton : ''}`}
                        onClick={() => setShowTransactions(true)}
                    >
                        Transactions
                    </button>
                    <button
                        className={`${styles.button} ${styles.balanceButton} ${!showTransactions ? styles.activeButton : ''}`}
                        onClick={() => setShowTransactions(false)}
                    >
                        Équilibre
                    </button>
                </div>
                <div>
                    <button onClick={() => setDisplayPopupAddTransaction(true)} className={styles.submitConfirm}>
                        Ajouter une transaction
                    </button>
                </div>
            {displayPopupAddTransaction && <TransactionsAddPopup setDisplyPopupAddForm={setDisplayPopupAddTransaction} event={event} />}
            </div>
        </section>
    );
};

export default Page;
