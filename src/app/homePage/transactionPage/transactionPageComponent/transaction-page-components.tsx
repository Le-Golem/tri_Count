"use client"
import { ITransaction } from "@/core/model/ITransaction"
import transactionService from "@/core/services/transactionService"
import { useEffect, useState } from "react"
import styles from "./transaction-page-components.module.css"
import { IToken } from "@/core/model/IToken"

const TransactionsPageComponents = () => {

    const [transactionList , setTransactionslist] : [transactionslist : ITransaction[] , setTransactionsList : Function] = useState([])
    const [token, setToken]: [IToken | undefined, React.Dispatch<React.SetStateAction<IToken | undefined>>] = useState<IToken | undefined>(
        JSON.parse(localStorage.getItem('token') || 'null')
      );

      useEffect(() => {
        const storedToken = JSON.parse(localStorage.getItem('token') || 'null');
        if (storedToken && storedToken !== token) {
          setToken(storedToken);
        }

        if (token){
            transactionService.getUserById(token.sub).then(res => {
                if (res) {
                    setTransactionslist(res);
                }
            });}
      }, []);

    const handleClick = (transaction: ITransaction) => {
        console.log('Transaction cliquée :', transaction);
    };

    return(
        <>
        <section style={{ width : "100%" , height : "100%"}}>
            <div>
                <h1>Liste des Transactions</h1>
                <table className={styles.tableStyle}>
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