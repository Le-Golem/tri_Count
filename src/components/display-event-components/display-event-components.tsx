import React, { useEffect } from 'react';
import styles from "./display-event-style.module.css"
import { IEvent } from '@/core/model/IEvent';
import Popup from '../popup-Yes-or-No/Popup';
import eventService from '@/core/services/eventService';
import { IEventData } from '@/core/model/IEventData';

const DisplayEventComponent: React.FC<{ event: IEvent, functionClick: Function , key : number  }> = ({ event, functionClick , key }) => {
    const [displayPopup, setDisplayPopup] = React.useState(false);
    const [eventDetail , setEventDetail] : [eventDetail : IEventData | undefined , setEventDetail : Function] = React.useState();
    const [number , setNumber] : [number : number, setNumber : Function] = React.useState(0)
    const handleDeleteEvent : Function = (e :  React.MouseEvent, id : number) => {
        eventService.deleteEvent(id)
        window.location.href = "http://localhost:3000/homePage/eventPage"
    }
    const handleNoClick: Function = () => {
        setDisplayPopup(false);
    };
    
    useEffect(() => {
        eventService.getByEventId(event.eventId).then(res => setEventDetail(res));
    }, []);
    useEffect(() => {
        if (eventDetail){
            setNumber(eventDetail.participate.length) 
        }
    } , [eventDetail])
    const formattedDate = new Date(event.date).toLocaleDateString();

    return (
        <section className={styles.container} onClick={() => displayPopup ? "" :  functionClick(event)}>
            <div key={event.eventId} className={styles.eventContent}>
                <div className={styles.header}>
                    <p className={styles.fontTitle}>{event.label}</p>
                    <button
                        style={{marginLeft: '5px', padding: "5px 10px", background: "#ff5858", color: "#fff", border: "none", cursor: "pointer", borderRadius: "5px" }}
                        className={styles.deleteButton}
                        onClick={(e) => {
                            e.stopPropagation(); 
                            setDisplayPopup(true)
                        }}
                    >
                        Supprimer
                    </button>
                </div>
                <p className={styles.fontDescription}>{event.description}</p>
                <div className={styles.footer}>
                    <span className={styles.date}>{formattedDate}</span>
                    <span className={styles.participants}>{number} Participants</span>
                </div>
            {displayPopup && (
                <Popup
                    message='Voulez-vous vraiment supprimer cet événement ?'
                    onNoClick={() => {
                        handleNoClick();
                    }}
                    onYesClick={(e:  React.MouseEvent) => handleDeleteEvent(e, event.eventId)}
                />
            )}        
            </div>
        </section>

    );
};

export default DisplayEventComponent;
