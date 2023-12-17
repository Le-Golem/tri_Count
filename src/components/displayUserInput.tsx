import { IUser } from "@/core/model/IUser";
import React from "react";
import styles from "./displayUserInput.module.css"

const DisplayUserInput = ({usersList , setUserChoice , setDisplayUserInput , displayUserInput }: { displayUserInput : boolean , usersList: IUser[] , setUserChoice : Function , setDisplayUserInput : Function}) => {

  function handleClick (user : IUser , event : any) {
    setUserChoice(user);
    setDisplayUserInput(false);
  }

    return (
      <>
        <article className={styles.componentContainer}>
          {usersList.length != 0 && usersList.map((user) => {
              return (
                <div key={user.userId}>
                  <p onClick={(event) => handleClick(user, event)} className={styles.FontP}>
                    {user.username} 
                  </p>
                </div>
              );
          })}
        </article>
      </>
    );
};

export default DisplayUserInput;