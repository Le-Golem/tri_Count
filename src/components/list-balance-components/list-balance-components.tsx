import { IEventData } from "@/core/model/IEventData";
import JaugeLinéaire from "../jauge/jauge";
import "./ListBalancesComponent.css"
import CardBalanceDetail from "../cardBalanceDetail/cardBalanceDetail";
import { useState } from "react";

const ListBalancesComponents = ({ event }: { event: IEventData | undefined }) => {
    const [tempoEvent , setEvent] : [event : IEventData | undefined , setEvent : Function] = useState();

    return (
        <>
        
        {event && event?.event.transactions?.length > 0 ? (
        <div className="containerEvent">
            {event && event.participate.map((participate) => {
                return (
                    <>
                        <CardBalanceDetail participate={participate}/>
                    </>
                )
            })}
            </div>) : 
            (
            <div className="transactions-table-container">
                <div className="no-transactions-message">
                    <h2>Il n'y a pas de transactions pour le moment.</h2>
                </div>
            </div>
            )
        }
        </>
    )
}

export default ListBalancesComponents;
