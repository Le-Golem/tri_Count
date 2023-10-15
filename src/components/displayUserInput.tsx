import { IUser } from "@/core/model/IUser";
import React from "react";

const DisplayUserInput = ({usersList , setUserChoice , setDisplayUserInput , displayUserInput }: { displayUserInput : boolean , usersList: IUser[] , setUserChoice : Function , setDisplayUserInput : Function}) => {

  function handleClick (user : IUser , event : any) {
    setUserChoice(user);
    setDisplayUserInput(false);
  }

    return (
      <>
        <article style={{ border: "1px solid #DFE0EB", borderRadius: "4px", backgroundColor: "white", padding: "10px", paddingBottom: "0", position: "absolute", zIndex: "1", width: "93%", overflow: "auto", maxHeight: "360px", marginTop: "5px", boxShadow: "0px 0px 10px 0px #66708559" }}>
          {usersList.length != 0 && usersList.map((user) => {
              return (
                <div key={user.userId}>
                  <p onClick={(event) => handleClick(user, event)} style={{ height: "32px", fontSize: "14px", fontFamily: "Inter", color: "#667085", cursor: "pointer" , width : "100%" }}>
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