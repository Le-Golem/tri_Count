"use client"
import React, { useState, useEffect } from "react";
import styles from "./event-page-components.module.css";
import { IEvent } from "@/core/model/IEvent";
import DisplayEventComponent from "@/components/display-event-components/display-event-components";
import EventAddPopup from "./addEventPopup/event-add-popup";
import { IUser } from "@/core/model/IUser";
import userService from "@/core/services/userService";
import { IToken } from "@/core/model/IToken";
import waitingGIF from "../../../public/img/waiting.gif"

const EventPageComponents = () => {
    
    const [userConnected, setUserConnected] : [IUser | undefined, setUserList : Function] = useState()
    const [selectedEvent, setSelectedEvent] : [selectedEvent : IEvent | undefined , setSelectedEvent : Function] = useState();
    const [displayDetails , setDisplayDetails] : [displayDetails : boolean , setDisplayDetails : Function] = useState(false)

    const [displayPopupAddForm  , setDisplyPopupAddForm] : [displayPopupAddForm : boolean , setDisplayPopupAddForm : Function] = useState(false)
    const [trigger , setTrigger] : [trigger : boolean , setTrigger : Function] = useState(false)
    const [token, setToken] : [token : IToken | undefined, setToken : Function] = useState();
    const [displayEvent , setDisplayEvent] : [displayEvent : boolean, setDisplayEvent : Function] = useState(false)
    const [loader, setLoader]: [loader: boolean, setLoader: Function] = useState(true);
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
            userService.getUserById(tempoId).then(res => {setUserConnected(res) }).finally(() => {setLoader(false)});
        }
    }, [token]);

    function refreshUserConnected(){
        if (userConnected){
            userService.getUserById(userConnected.userId).then(res => setUserConnected(res));
        }
    }

    function handleClick(event :  IEvent) {
        setSelectedEvent(event);
        setDisplayDetails(true)
        window.location.href = `http://localhost:3000/homePage/eventPage/${event.eventId}`;
    }

    const background: React.CSSProperties = {
        position: "fixed",
        backgroundColor: "#000000",
        width: "100%",
        height: "100%",
        top: "0px",
        left: "0px",
        opacity: "20%",
        zIndex: "15",
        userSelect: "none",
      };
    
      const waiting: React.CSSProperties = {
        opacity: "100%",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: "15",
        userSelect: "none",
      };

      return (
        <>  

        <section className={styles.container}>
            <div className={styles.headerContainer}>
                <h2>Liste des événements</h2>
                <button onClick={() => setDisplyPopupAddForm(true)}>Ajouter un événement</button>
            </div>
            {loader ? (
                <div>
                    <figure style={background}></figure>
                    <img style={waiting} src={waitingGIF.src} alt="Waiting GIF" />
                </div>
            ) : (
            <>
              {userConnected && userConnected.participate.length > 0 ? (
                  <section className={styles.containerEvent}>
                            {userConnected.participate.map((participate) => (
                                <DisplayEventComponent event={participate.event} functionClick={handleClick} key={participate.event.eventId} />
                                ))}
                        </section>
                    ) : (
                        <div className={styles.noTransactionsMessage}>
                            <h2 className={styles.h2Container}>Il n'y a pas d'Evenements pour le moment.</h2>
                        </div>
                    )}
                </>
            )}
        </section>
        {displayPopupAddForm && <EventAddPopup setDisplyPopupAddForm={setDisplyPopupAddForm} setTrigger={setTrigger} trigger={trigger} refreshUserConnected={refreshUserConnected} titre="Ajouter un Événement" event={0} /> }
        </>
    );
    
};

export default EventPageComponents;
