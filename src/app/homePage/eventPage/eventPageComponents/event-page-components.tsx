"use client"
import React, { useState, useEffect } from "react";
import EventPageDetails from "./eventPageDetails/event-page-details";

import styles from "./event-page-components.module.css"; // Assurez-vous d'importer correctement les styles
import eventService from "@/core/services/eventService";
import { IEvent } from "@/core/model/IEvent";
import DisplayEventComponent from "@/components/display-event-components/display-event-components";
import EventAddPopup from "./addEventPopup/event-add-popup";

const EventPageComponents = () => {
    const [eventList, setEventList] = useState([]);
    const [selectedEvent, setSelectedEvent] : [selectedEvent : IEvent | undefined , setSelectedEvent : Function] = useState();
    const [displayDetails , setDisplayDetails] : [displayDetails : boolean , setDisplayDetails : Function] = useState(false)

    const [displayPopupAddForm  , setDisplyPopupAddForm] : [displayPopupAddForm : boolean , setDisplayPopupAddForm : Function] = useState(false)
    const [trigger , setTrigger] : [trigger : boolean , setTrigger : Function] = useState(false)

    useEffect(() => {
        eventService.getAll().then((res) => setEventList(res));
    }, [trigger]);

    function handleClick(event :  IEvent) {
        setSelectedEvent(event);
        setDisplayDetails(true)
    }

    return (
        <>  
            <section style={{marginTop : "10px" , display : "flex" , justifyContent : "space-between"}}>
                <h1>Evenements en cours</h1>
                <button onClick={() => setDisplyPopupAddForm(true)} className={styles.displayPopup}>Ajouter un Event</button>
            </section>
            <section className={styles.containerEvent}>
                {eventList.map((event : IEvent) => (
                    <DisplayEventComponent event={event} key={event.eventId} functionClick={handleClick} />
                ))}
            </section>
            
            {displayPopupAddForm && <EventAddPopup setDisplyPopupAddForm={setDisplyPopupAddForm} setTrigger={setTrigger} trigger={trigger} /> }
            {displayDetails && selectedEvent && <EventPageDetails event={selectedEvent} setDisplayDetails={setDisplayDetails} />}
        </>
    );
};

export default EventPageComponents;