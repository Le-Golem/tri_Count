import { IEvent } from "@/core/model/IEvent"
import styles from "./event-page-details.module.css"

const EventPageDetails = ({event , setDisplayDetails} : {event : IEvent , setDisplayDetails : Function}) => {
    const fakeEventData = {
        Label: 'Événement',
        description: 'Description de l\'événement',
        users: [
          { username: 'Utilisateur 1', email: 'utilisateur1@example.com' },
          { username: 'Utilisateur 2', email: 'utilisateur2@example.com' },
        ],
      };
    return(
        <>
        <figure onClick={() => setDisplayDetails(false)} className={styles.backGroud} />
            <section className={styles.FondFiltre}>
                <article style={{display : "flex" , justifyContent: "space-between"}}>
                    <div>
                        <h1 style={{margin : "30px 16px 16px 16px" , height : "50px"}}>{event.Label}</h1>
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
                        {event.users?.map((user, index) => (
                            <div style={{margin: "16px"}} key={index}>
                                <p>Nom: {user.username}</p>
                                <p>Email: {user.email}</p>
                            </div>
                        ))}
                    <h1 style={{margin : "16px"}}>{fakeEventData.Label}</h1>
                        {fakeEventData.users?.map((user, index) => (
                            <div style={{margin: "16px"}} key={index}>
                                <p>Nom: {user.username}</p>
                                <p>Email: {user.email}</p>
                            </div>
                        ))}
                    </div>
                </div>

                
            </section>
        </>
    )
}
export default EventPageDetails