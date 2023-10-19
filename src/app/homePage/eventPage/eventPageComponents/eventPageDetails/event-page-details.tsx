import { IEvent } from "@/core/model/IEvent"
import styles from "./event-page-details.module.css"
import { useEffect, useState } from "react"
import { IEventWithUser } from "@/core/model/IeventWithUser"
import userService from "@/core/services/userService"
import eventService from "@/core/services/eventService"

const EventPageDetails = ({event , setDisplayDetails} : {event : IEvent , setDisplayDetails : Function}) => {

    const [eventUserList, setEventUserList] : [ eventUserList :IEventWithUser | undefined, setEventUserList : Function] = useState()
    console.log("🚀 ~ file: event-page-details.tsx:11 ~ EventPageDetails ~ eventUserList:", eventUserList)

    useEffect(() => {
        eventService.getByEventId(event.eventId).then(event => {setEventUserList(event)})
    }, [event])

    return(
        <>
        <figure onClick={() => setDisplayDetails(false)} className={styles.backGroud} />
            <section className={styles.FondFiltre}>
                <article style={{display : "flex" , justifyContent: "space-between"}}>
                    <div>
                        <h1 style={{margin : "30px 16px 16px 16px" , height : "50px"}}>{event.label}</h1>
                    </div>
                    <div style={{display : "flex" , gap: "20px" , width : "300px" , marginRight : "16px"}}>
                        <button className={styles.submit}>Historique des transactions</button>
                        <button className={styles.submitConfirm}>Ajouter une transactions</button>
                    </div>
                </article>
                <div style={{display : "flex"}}>
                    <div style={{margin : "16px" , width : "500px" , height : "300px" }}>
                    <p style={{margin : "16px" , maxHeight: "300px" , overflow : "auto"}}>{event.description}</p>
                    </div>
                    <div style={{margin : "16px" , width : "500px" , height : "300px" }}>
                        {eventUserList?.participate.map((participate, index) => (
                            <div style={{margin: "16px"}} key={index}>
                                <p>Nom: {participate.user.username}</p>
                                <p>Email: {participate.user.email}</p>
                            </div>
                        ))}
                    </div>
                </div>

                
            </section>
        </>
    )
}
export default EventPageDetails