import React from 'react';
import { IParticipate } from "@/core/model/IParticipate";
import styles from "./cardBalanceDetail.module.css"

const CardBalanceDetail = ({participate}: {participate: IParticipate | undefined}) => {
    return (
        <>
            <section className={styles.container}>
                <div className={styles.eventContent}>
                    <div className={styles.header}>
                        <p className={styles.fontTitle}>{participate?.username}</p>
                    </div>
                    <div className={styles.containerCard}>
                        <p className={styles.balanceLabel}>Balance</p>
                        <p className={participate && participate?.balance > 0 ? styles.positive : styles.negative}>
                            {participate && participate?.balance > 0 ? `+ ${participate?.balance}` : `${participate?.balance}`}
                        </p>
                    </div>
                </div>
                <div className={styles.footer}>
                    <span className={styles.date}>Total Payé : {participate?.totalContribution}</span>
                    <span className={styles.participants}>Total a Payé : {participate?.totalDue}</span>
                </div>  
            </section>
        </>
    );
}

export default CardBalanceDetail;
