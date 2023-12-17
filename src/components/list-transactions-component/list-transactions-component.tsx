import React, { useEffect, useState } from "react";
import { IEventData } from "@/core/model/IEventData";
import { ITransaction } from "@/core/model/ITransaction";
import "./ListTransactionsComponent.css"; 
import { IParticipate } from "@/core/model/IParticipate";
import waitingGIF from "../../../public/img/waiting.gif"
import transactionService from "@/core/services/transactionService";

const ListTransactionsComponent = ({ event , setEvent }: { event: IEventData | undefined , setEvent : Function }) => {
    const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);

    const [loader, setLoader]: [loader: boolean, setLoader: Function] =
    useState(true);

    let transactions: ITransaction[] = [];
    let participants: IParticipate[] = [];

    if (event && event.event && event.event.transactions && event.participate) {
        transactions = event.event.transactions;
        participants = event.participate;
    }

    const findUserName = (userId: number): string => {
        const participant = participants.find(participant => participant.userId === userId);
        return participant ? participant.username : `User ${userId}`;
    };

    const handleTransactionClick = (index: number) => {
        if (selectedRowIndex === index) {
            setSelectedRowIndex(null);
        } else {
            setSelectedRowIndex(index);
        }
    };

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
      useEffect(() => {
        if (typeof transactions !== 'undefined' && typeof participants !== 'undefined' ) {
            setLoader(false);
        }
    }, [transactions, participants]);

    const handleDeleteTransaction = (transactionId: number) => {
        // Appelez le service pour supprimer la transaction côté serveur
        transactionService.deleteTransaction(transactionId).then(() => {
            if (event && event.event && event.event.transactions) {
                const updatedTransactions = event.event.transactions.filter(transaction => transaction.transactionId !== transactionId);
                setEvent((prevEvent : IEventData) => {
                    if (prevEvent) {
                        return {
                            ...prevEvent,
                            event: {
                                ...prevEvent.event,
                                transactions: updatedTransactions
                            }
                        };
                    }
                    return prevEvent;
                });
            }
        }).catch(error => {
            console.error("Erreur lors de la suppression de la transaction :", error);
        });
    };
    
    


    return (
        <div>
            {loader ? (
                <div>
                    <figure style={background}></figure>
                    <img style={waiting} src={waitingGIF.src} alt="Waiting GIF" />
                </div>
            ) : transactions.length > 0 ? (
            <>
                <table className="transactions-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Label</th>
                            <th>Amount</th>
                            <th>Sender</th>
                            <th>Receivers</th>
                            <th></th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {transactions.map((transaction, index) => (
                            <tr
                                key={transaction.transactionId}
                                onClick={() => handleTransactionClick(index)}
                                style={{
                                backgroundColor: index === selectedRowIndex ? "grey" : "transparent"
                            }}
                            >
                            <td>{transaction.date}</td>
                            <td>{transaction.label}</td>
                            <td>{transaction.amount}</td>
                            <td>{findUserName(transaction.sender.userId)}</td>
                            <td>
                            {transaction.receivers && transaction.receivers.length > 0 ? (
                            transaction.receivers.map(receiver => findUserName(receiver.userId)).join(", ")
                            ) : (
                            "Tous"
                            )}
                            </td>
                            <td>
                                <button className="buttonDeleteStyle"
                                        onClick={() => handleDeleteTransaction(transaction.transactionId)}>
                                    X
                                </button>
                            </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>
            ) : (
                <div>
                    <h2 className="fontH2">Il n'y a pas de transactions pour le moment.</h2>
                </div>
            )}
        </div>
    );
};

export default ListTransactionsComponent;
