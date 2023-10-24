import React, { useState, useEffect } from "react";
import styles from "./add-transaction-popup.module.css";
import DisplayUserInput from "@/components/displayUserInput";
import { IAddTransaction } from "@/core/model/IAddTransactions";
import { IEventWithTransactions } from "@/core/model/IEventWithTransactions";
import { IUser } from "@/core/model/IUser";
import { IToken } from "@/core/model/IToken";
import userService from "@/core/services/userService";
import { IEvent } from "@/core/model/IEvent";
import { IParticipate } from "@/core/model/IParticipate";
import DisplayUserinputTransactions from "../displayUserInputTransactions";

const TransactionsAddPopup  = ({setDisplyPopupAddForm , event } : {setDisplyPopupAddForm : Function , event : IEventWithTransactions | undefined }) => {

  const [userConnected, setUserConnected] : [IUser | undefined, setUserList : Function] = useState()
  const [label , setLabel] : [label : string, setLabel : Function] = useState("")
  const [amount, setAmount] : [amount : number , setAmount : Function] = useState(0)
  const [senderId, setSenderId] : [senderId : number , setSenderId : Function] = useState(0)
  const [eventId, setEventId] : [eventId : number , setEventId : Function] = useState(0)
  const [receiverId, setReceiverId] : [receiverId : number[] | undefined, setReceiverId : Function] = useState()
  const [date, setDate] : [date : Date | undefined, setDate : Function] = useState()
  const [token, setToken] : [token : IToken | undefined, setToken : Function] = useState();
  const [displayUserInput , setDisplayUserInput] : [displayUserInput : boolean , setDisplayUserInput : Function] = useState(false)
  const [users , setUsers] : [users : IUser[] , setUsers : Function] = useState([])
  const [userList , setUserList] : [userList : IUser[] , setUserList : Function] = useState([])
  const [userChoice , setUserChoice] : [userChoice : IUser | undefined , setUserChoice : Function] = useState()
  const [userSelected , setUserSelected] : [userSelected : IUser[] , setUserSelected : Function] = useState([])
  const [description , setDescription] : [description : string  , setDescription : Function] = useState("")
  const [eventWithoutUserConnected , setEventWithoutUserConnected] : [eventWithoutUserConnected : IParticipate[]| undefined , setEventWithoutUserConnected : Function] = useState(event?.event.participate.filter(event => event.user.userId != userConnected?.userId))


  const [isSelectAll, setIsSelectAll] : [isSelectAll : boolean, setIsSelectAll : Function] = useState(true)
  const [isSelectList, setIsSelectList] : [isSelectList : boolean, setIsSelectList : Function] = useState(true)

  useEffect(() => {
    console.clear()
    console.log(userChoice?.username)
    // console.log(userSelected)
    if (!userChoice){
      setIsSelectAll(true)
      setIsSelectList(true)
    }

 if (userChoice?.username === "Tous"){
      console.log("je suis ici")
      setIsSelectAll(true)
      setIsSelectList(false)
    }else {
      console.log("je suis not")
      // setIsSelectAll(false)
      setIsSelectList(true)
    }
    if (userChoice && userSelected.every(user => user.userId !== userChoice.userId)) {
      setUserSelected((prevUsers : IUser[]) => [...prevUsers, userChoice]);
    }
  }, [userChoice]);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
        const parsedToken: IToken = JSON.parse(storedToken);
        setToken(parsedToken);

        if (parsedToken && parsedToken.sub) {
            const tempoId = parsedToken.sub;
            userService.getUserById(tempoId).then((res) => {
                setUserConnected(res);
            });
        }
    }
}, []);

useEffect(() => {
    if (token) {
        const tempoId = token.sub;
        userService.getUserById(tempoId).then(res => {setUserConnected(res)});
    }
}, [token]);

const handleLabelChange = (event : any) => {
  setLabel(event.target.value); 
};

const handleUsers = (event : any) =>  {
  setUsers(event.target.value)
}

const handleDelete = (index: number) => {
  const updatedUserSelected = [...userSelected];
  const removedUser = updatedUserSelected.splice(index, 1)[0];
  setUserList((prevUserList : IUser[]) => [...prevUserList, removedUser]);
  setUserSelected(updatedUserSelected);
};

const handleAmountChange = (event : any) => {
  setAmount(event.target.value); 
};

  const sendForm = () => {
    const tempoUserId = userSelected.map(user => user.userId);

    if (typeof label !== 'string' || typeof description !== 'string') {
      alert("Le label et la description doivent être des chaînes de caractères valides.");
      return;
  }
  if (tempoUserId.length === 0) {
      alert("Veuillez sélectionner au moins un utilisateur.");
      return;
  }

    if (userConnected){
      const filteredUsers = userSelected.filter(user => user.userId !== userConnected.userId);

      const transactionToCreate: IAddTransaction = {
        date: new Date(Date.now()),
        label: label,
        amount: amount,
        senderId: userConnected.userId,
        eventId: eventId,
        receiverId: filteredUsers.map(user => user.userId)
      };
    }
  };

  useEffect(() => {
    if (userChoice) {
        if (userChoice.userId === -1) {
            // Si l'utilisateur choisi est "Tous" (-1), filtrez tous les utilisateurs sauf l'utilisateur connecté
            const filteredParticipate = event?.event.participate.filter(e => e.user.userId !== userChoice.userId);
            setEventWithoutUserConnected(filteredParticipate);
        } else {
            // Si un utilisateur spécifique est choisi, utilisez la liste de participations complète
            setEventWithoutUserConnected(event?.event.participate);
        }
    }
}, [userChoice, event?.event.participate, userChoice]);

  // const eventWithoutUserConnected : IParticipate[] | undefined = ;

  return (
    <>
        <figure onClick={() => setDisplyPopupAddForm(false)} className={styles.backGroud} />
        <section className={styles.FondFiltre} style={{display : "flex" , flexDirection : "column" , justifyContent:'space-between'}}>

        <section style={{marginLeft :"25px"}}>
                <div style={{display : "flex" , justifyContent : "space-between"}}>
                    <p style={{marginTop : "10px"}}>Ajouter une transaction</p>
                    <button onClick={() => setDisplyPopupAddForm(false)}  style={{width : "40px" , height : "40px" , margin : "10px"}}>X</button>
                </div>
                <section style={{display : "flex" , gap : "10%"}}>
                    <div className={`${styles.inputContainer} ${styles.ic1}`}>
                        <input autoComplete="off"  type="Label" className={styles.input} id="Label" onChange={handleLabelChange}  />
                        <div className={styles.cut}></div>
                        <label className={styles.iLabel} htmlFor="Label">Label</label>
                    </div>

                    <div className={`${styles.inputContainer} ${styles.ic1}`} >
                        <input autoComplete="off"  type="text" className={styles.input} id="users" onChange={handleUsers} onClick={() => setDisplayUserInput(true)}/>
                        {displayUserInput && <DisplayUserinputTransactions participate={eventWithoutUserConnected} setUserChoice={setUserChoice} setDisplayUserInput={setDisplayUserInput} selectAll={isSelectAll} selectList={isSelectList}/>}
                        <button onClick={() => setDisplayUserInput(false)} style={{transform: 'translate(207px, -45px)' , width : "40px" , height : "40px"}} >X</button>
                        <div className={styles.cut}></div>
                        <label className={styles.iLabel} htmlFor="users">users</label>
                    </div>
                    
                    <div>
                        <ul style={{ margin : "15px 45px 0px 0px", position: "fixed", maxHeight: "35vh", overflow: "auto", width: "25vh", listStyleType: "none", padding: 0 }}>
                        <h1 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px", borderBottom: "2px solid #333", paddingBottom: "5px" }}>Participants</h1>                            
                            {userSelected.map((user, index) => (
                                <li style={{ marginTop: "5px", padding: "10px", borderBottom: "1px solid #ccc" , display : "flex" , justifyContent : "space-between" }} key={user.userId}>
                                    <span style={{ marginRight: "10px" }}>{user.username}</span>
                                        <button style={{ marginLeft: '5px', padding: "5px 10px", background: "#ff5858", color: "#fff", border: "none", cursor: "pointer", borderRadius: "5px" }} onClick={() => handleDelete(index)}>Supprimer</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
                <div className={`${styles.inputContainer} ${styles.ic1}`}>
                    <input autoComplete="off"  type="decimal" min={0} className={styles.input} id="Amount" onChange={handleAmountChange}  />
                    <div className={styles.cut}></div>
                    <label className={styles.iLabel} htmlFor="Amount">Montant</label>
                </div>
                <p style={{transform : "translate(225px, -35px)"}}>€</p>
            </section>

            <section style={{marginBottom : "10px" , display : "flex" , justifyContent :"center" , textAlign : "center"}}>
                <button className={styles.submit} onClick={sendForm} type="submit">submit</button>
            </section>

        </section>
    </>
  );
};

export default TransactionsAddPopup;