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
    console.clear()
    const [userConnected, setUserConnected] : [IUser | undefined, setUserList : Function] = useState()
    const [selectedEvent, setSelectedEvent] : [selectedEvent : IEvent | undefined , setSelectedEvent : Function] = useState();
    const [displayDetails , setDisplayDetails] : [displayDetails : boolean , setDisplayDetails : Function] = useState(false)

    const [displayPopupAddForm  , setDisplyPopupAddForm] : [displayPopupAddForm : boolean , setDisplayPopupAddForm : Function] = useState(false)
    const [trigger , setTrigger] : [trigger : boolean , setTrigger : Function] = useState(false)
    const [token, setToken] : [token : IToken | undefined, setToken : Function] = useState();
    const [displayEvent , setDisplayEvent] : [displayEvent : boolean, setDisplayEvent : Function] = useState(false)

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
            userService.getUserById(tempoId).then(res => {setUserConnected(res) ; console.log(res)});
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
        window.location.href = `http://localhost:3000/homePage/eventPage/${event.eventId}`;
    }

    return (
        <>  
            <section style={{marginTop : "10px" , display : "flex" , justifyContent : "space-between"}}>
                <div>
                    <button onClick={() => {setDisplayEvent(true)}}>Evenements en cours </button>
                    <button onClick={() => {setDisplayEvent(false)}}>Historique des Evenements</button>
                </div>
                <button onClick={() => setDisplyPopupAddForm(true)} className={styles.displayPopup}>Ajouter un Event</button>
            </section>
            <section className={styles.containerEvent}>

            {userConnected && userConnected.participate && userConnected.participate.map((participate) => (
                <DisplayEventComponent event={participate.event} functionClick={handleClick} key={participate.event.eventId} />
            ))}
            </section>
            {displayPopupAddForm && <EventAddPopup setDisplyPopupAddForm={setDisplyPopupAddForm} setTrigger={setTrigger} trigger={trigger} refreshUserConnected={refreshUserConnected} /> }
        </>
    );
};

export default EventPageComponents;