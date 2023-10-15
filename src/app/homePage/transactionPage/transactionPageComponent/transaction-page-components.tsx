"use client"
import { ITransaction } from "@/core/model/ITransaction"
import transactionService from "@/core/services/transactionService"
import { useEffect, useState } from "react"
import styles from "./transaction-page-components.module.css"

const TransactionsPageComponents = () => {

    const [transactionList , setTransactionslist] : [transactionslist : ITransaction[] , setTransactionsList : Function] = useState([])

    useEffect(() => {
        transactionService.getAll().then(res => setTransactionslist(res))
    } , [])

    const handleClick = (transaction: ITransaction) => {
        // Faites quelque chose avec l'objet transaction lorsque la ligne est cliquée
        console.log('Transaction cliquée :', transaction);
    };

    return(
        <>
        <section style={{ width : "100%" , height : "100%"}}>
            <div>
                <h1>Liste des Transactions</h1>
                <table className={styles.tableStyle}> {/* Ajoutez une classe CSS pour le style du tableau */}
                    <thead>
                        <tr>
                            <th>Label</th>
                            <th>Montant</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactionList.map((transaction: ITransaction) => (
                            <tr key={transaction.transactionId} onClick={() => handleClick(transaction)}>
                            <td>{transaction.label}</td>
                            <td>{transaction.amount} €</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
        </>
    )
}
export default TransactionsPageComponents