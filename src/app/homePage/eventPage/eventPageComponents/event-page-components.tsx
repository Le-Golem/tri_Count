"use client"
import React, { useState, useEffect } from "react";
import EventPageDetails from "./eventPageDetails/event-page-details";

import styles from "./event-page-components.module.css"; // Assurez-vous d'importer correctement les styles
import eventService from "@/core/services/eventService";
import { IEvent } from "@/core/model/IEvent";
import DisplayEventComponent from "@/components/display-event-components/display-event-components";
import EventAddPopup from "./addEventPopup/event-add-popup";
import { IUser } from "@/core/model/IUser";
import userService from "@/core/services/userService";
import { IToken } from "@/core/model/IToken";

const EventPageComponents = () => {
    const [userConnected, setUserConnected] : [IUser | undefined, setUserList : Function] = useState()
    const [selectedEvent, setSelectedEvent] : [selectedEvent : IEvent | undefined , setSelectedEvent : Function] = useState();
    const [displayDetails , setDisplayDetails] : [displayDetails : boolean , setDisplayDetails : Function] = useState(false)

    const [displayPopupAddForm  , setDisplyPopupAddForm] : [displayPopupAddForm : boolean , setDisplayPopupAddForm : Function] = useState(false)
    const [trigger , setTrigger] : [trigger : boolean , setTrigger : Function] = useState(false)
    const [token, setToken] : [token : IToken | undefined, setToken : Function] = useState();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            const parsedToken: IToken = JSON.parse(storedToken);
            setToken(parsedToken);
        }
    }, []);
    
    useEffect(() => {
        if (token) {
            const tempoId = token.sub;
            userService.getUserById(tempoId).then(res => setUserConnected(res));
        }
    }, [token]);

    function refreshUserConnected(){
        if (token) {
            const tempoId = token.sub;
            userService.getUserById(tempoId).then(res => setUserConnected(res));
        }
    }

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
            {userConnected && userConnected.participate && userConnected.participate.map((event) => (
                <DisplayEventComponent event={event.eventUser} functionClick={handleClick}/>
            ))}
            </section>
            {displayPopupAddForm && <EventAddPopup setDisplyPopupAddForm={setDisplyPopupAddForm} setTrigger={setTrigger} trigger={trigger} refreshUserConnected={refreshUserConnected} /> }
            {displayDetails && selectedEvent && <EventPageDetails event={selectedEvent} setDisplayDetails={setDisplayDetails} />}
        </>
    );
};

export default EventPageComponents;