'use client'
import eventService from '@/core/services/eventService';
import React, { useEffect, useState } from 'react';
import styles from './style.module.css'; 
import TransactionsAddPopup from '@/components/addTransactionPopup/add-transaction-popup';
import ListTransactionsComponent from '@/components/list-transactions-component/list-transactions-component';
import ListBalancesComponents from '@/components/list-balance-components/list-balance-components';
import { IEventData } from '@/core/model/IEventData';
import EventPatchDetails from '@/components/eventPatchDetails/eventPatchDetails';

interface PageProps {
    params: {
        event: number;
    };
}

const Page: React.FC<PageProps> = ({ params }) => {
    const [eventId , setEventId] : [eventId : number, setEventId : Function] = useState(params.event);
    const [event, setEvent] : [event : IEventData | undefined, setEvent : Function] = useState();
    const [showTransactions, setShowTransactions] : [showTransactions : boolean, setShowTransactions : Function] = useState(true);

    const [displayPopupAddTransaction, setDisplayPopupAddTransaction] : [displayPopupAddTransaction : boolean, setDisplayPopup : Function] = useState(false);
    const [displayPopupPatchEvent , setDisplayPopupPatchEvent] : [displayPopupPatchEvent : boolean, setDisplayPopup : Function] = useState(false)

    useEffect(() => {
        eventService.getByEventId(eventId).then(event => (setEvent(event)));
    }, [eventId]);

    const functionRefresh = () => {
        eventService.getByEventId(eventId).then(event => (setEvent(event)));
    }

    return (
        <section className={styles.sectionContainer}>
            <section className={styles.sectionHeader} >
                <article className={styles.articleFlex}>
                    <h1 className={styles.h1Font}>{event?.event.label}</h1> 
                    <p>Cout total de l'évenements : {event?.totalExpenses}€</p>
                    <div className={styles.divContainer}>
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
                </article>
            </section>
            <section className={styles.contentContainer}>
                {showTransactions ? 
                    <ListTransactionsComponent event={event} setEvent={setEvent} />
                    :  
                    <ListBalancesComponents event={event} />   
                }
            </section>
                <div className={styles.buttonContainer} >
                    <button onClick={() => setDisplayPopupPatchEvent(true)} className={styles.patchButton}>
                        Modifier l'evenement 
                    </button>
                    <button  onClick={() => setDisplayPopupAddTransaction(true)} className={styles.submitConfirm}>
                        Ajouter une transaction
                 </button>
                </div>
            {displayPopupAddTransaction && <TransactionsAddPopup setDisplyPopupAddForm={setDisplayPopupAddTransaction} event={event} functionRefresh={functionRefresh} />}
            {displayPopupPatchEvent && <EventPatchDetails setDisplayPopupPatchEvent={setDisplayPopupPatchEvent} event={event} refreshUserConnected={functionRefresh}  /> }
        </section>
    );
};

export default Page;
