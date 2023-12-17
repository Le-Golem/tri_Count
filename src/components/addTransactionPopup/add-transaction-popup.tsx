import React, { useState, useEffect } from "react";
import styles from "./add-transaction-popup.module.css";
import { IAddTransaction } from "@/core/model/IAddTransactions";
import { IUser } from "@/core/model/IUser";
import { IToken } from "@/core/model/IToken";
import userService from "@/core/services/userService";
import { IParticipate } from "@/core/model/IParticipate";
import DisplayUserinputTransactions from "../displayUserInputTransactions";
import { IEventData } from "@/core/model/IEventData";
import transactionService from "@/core/services/transactionService";

const TransactionsAddPopup  = ({setDisplyPopupAddForm , event , functionRefresh } : {setDisplyPopupAddForm : Function , event : IEventData | undefined , functionRefresh : Function }) => {

  const [userConnected, setUserConnected] : [IUser | undefined, setUserList : Function] = useState()
  const [label , setLabel] : [label : string, setLabel : Function] = useState("")
  const [amount, setAmount] : [amount : number , setAmount : Function] = useState(0)
  const [senderId, setSenderId] : [senderId : number , setSenderId : Function] = useState(0)
  const [receiverId, setReceiverId] : [receiverId : number[] | undefined, setReceiverId : Function] = useState()
  const [date, setDate] : [date : Date | undefined, setDate : Function] = useState()
  const [token, setToken] : [token : IToken | undefined, setToken : Function] = useState();
  const [displayUserInput , setDisplayUserInput] : [displayUserInput : boolean , setDisplayUserInput : Function] = useState(false)
  const [users , setUsers] : [users : IUser[] , setUsers : Function] = useState([])
  const [userChoice , setUserChoice] : [userChoice : IUser | undefined , setUserChoice : Function] = useState()
  const [userSelected , setUserSelected] : [userSelected : IUser[] , setUserSelected : Function] = useState([])
  const [description , setDescription] : [description : string  , setDescription : Function] = useState("")
  const [eventWithoutUserConnected , setEventWithoutUserConnected] : [eventWithoutUserConnected : IParticipate[] | undefined , setEventWithoutUserConnected : Function] = useState(event?.participate.filter(event => event.userId != userConnected?.userId))
  const [eventWithoutUserConnectedSelect , setEventWithoutUserConnectedSelect] : [eventWithoutUserConnectedSelect : IParticipate[] | undefined , setEventWithoutUserConnectedSelect : Function] = useState(event?.participate.filter(event => event.userId != userConnected?.userId))

  const [userSelect , setUserSelect] : [userSelect : IUser | undefined , setUserSelect : Function] = useState()

useEffect(() => {
  if (!userSelect){
    setEventWithoutUserConnected(eventWithoutUserConnectedSelect)
  }else if (userSelect && eventWithoutUserConnectedSelect) {
    setEventWithoutUserConnected(eventWithoutUserConnectedSelect?.filter(e => e.userId != userSelect.userId))
  }
} , [userSelect])

useEffect(() => {
  if (userSelected.length === 0 ){
    setIsSelectAll(true)
    setIsSelectList(true)
  }
}, [userSelected])

  const [isSelectAll, setIsSelectAll] : [isSelectAll : boolean, setIsSelectAll : Function] = useState(true)
  const [isSelectList, setIsSelectList] : [isSelectList : boolean, setIsSelectList : Function] = useState(true)

  useEffect(() => {
  if (userChoice){
    if (userChoice.userId === -1 ){
      setIsSelectAll(true)
      setIsSelectList(false)
    }else {
      setIsSelectAll(false)
      setIsSelectList(true)
    }
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

useEffect(() => {
  if (eventWithoutUserConnected){
    const filteredUserList = eventWithoutUserConnected.filter(user => !userSelected.some(selectedUser => selectedUser.userId === user.userId));
    setEventWithoutUserConnected(filteredUserList);
  }
}, [userSelected]);

const handleLabelChange = (event : any) => {
  setLabel(event.target.value); 
};

const handleUsers = (event : any) =>  {
  setUsers(event.target.value)
}

const handleDelete = (index: number) => {
  const removedUser = userSelected[index];
  setEventWithoutUserConnected((prevUserList : IParticipate[]) => [...prevUserList, removedUser]);
  setUserSelected((prevUsers : IUser[]) => {
      const updatedUsers = [...prevUsers];
      updatedUsers.splice(index, 1);
      return updatedUsers;
  });
};

const handleEventChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  if (eventWithoutUserConnected){
    const selectedUserId = parseInt(event.target.value);
    const selectedUser = eventWithoutUserConnected.find((user) => user.userId === selectedUserId);
    setUserSelect(selectedUser);
  }
};

const handleAmountChange = (event : any) => {
  setAmount(Number(event.target.value)); 
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
  if (amount === 0 || isNaN(amount)) {
    alert("Veuillez saisir un montant.");
    return;
  }

    if (userConnected && event && userSelect){
      const filteredUsers = userSelected.filter(user => user.userId != -1);

      const transactionToCreate: IAddTransaction = {
        date: new Date(Date.now()),
        label: label,
        amount: amount,
        senderId: userSelect?.userId,
        eventId: event.event.eventId,
      };

      if (userChoice && userChoice?.userId > 0 ) {
       transactionToCreate.receiverId = filteredUsers.map(user => user.userId)
      }

      transactionService.create(transactionToCreate).then((res) => {console.log(res);}).finally(() => {functionRefresh() , setDisplyPopupAddForm(false)});
    }
  };

  return (
    <>
        <figure onClick={() => setDisplyPopupAddForm(false)} className={styles.backGroud} />
        <section className={styles.FondFiltre}>
          <div className={styles.headerContainer}>
            <p className={styles.pPlacement} >Ajouter une transaction</p>
            <button onClick={() => setDisplyPopupAddForm(false)} className={styles.buttonStyle} >X</button>
          </div>




          <div className={styles.contentContainer}>
            <div className={styles.leftContentContainer}>
              <div className={`${styles.inputContainer} ${styles.ic1}`}>
                  <input autoComplete="off"  type="Label" className={styles.input} id="Label" onChange={handleLabelChange}  />
                  <div className={styles.cut}></div>
                  <label className={styles.iLabel} htmlFor="Label">Label</label>
              </div>
              <div className={`${styles.inputContainer} ${styles.ic1}`}>
                  <input autoComplete="off"  type="decimal" min={0} className={styles.input} id="Amount" onChange={handleAmountChange}  />
                  <div className={styles.cut}></div>
                  <label className={styles.iLabel} htmlFor="Amount">Montant</label>
              </div>
              <p className={styles.translateImg}>€</p>
              <div className={styles.divContainer}>
                <select onChange={(event) => handleEventChange(event)} className={styles.select}>
                  <option  className={styles.iLabel} value={-1}>Payé par</option>
                  {eventWithoutUserConnectedSelect && eventWithoutUserConnectedSelect.map((participant) => (
                  <option key={participant.userId} value={participant.userId}>{participant.username}</option>
                  ))}
                </select>
                </div>
            </div>

            <div>
              <div className={`${styles.inputContainer} ${styles.ic1}`} >
                  <input autoComplete="off"  type="text" className={styles.input} id="users" onChange={handleUsers} onClick={() => setDisplayUserInput(true)}/>
                  {displayUserInput && <DisplayUserinputTransactions participate={eventWithoutUserConnected} setUserChoice={setUserChoice} setDisplayUserInput={setDisplayUserInput} selectAll={isSelectAll} selectList={isSelectList}/>}
                  <button onClick={() => setDisplayUserInput(false)} className={styles.buttonDelete} >X</button>
                  <div className={styles.cut}></div>
                  <label className={styles.iLabel} htmlFor="users">Pour qui </label>
              </div>
              <ul className={styles.listUl} >
              <h1 className={styles.h1Font}>Participants</h1>                            
                  {userSelected.map((user, index) => (
                      <li className={styles.listStyle} key={user.userId}>
                          <span className={styles.spanPlacement}>{user.username}</span>
                              <button className={styles.buttonStyleParticipate} onClick={() => handleDelete(index)}>X</button>
                      </li>
                  ))}
              </ul>
            </div>
          </div>





          <div className={styles.footerContainer}>
            <section className={styles.buttonSubmitContainer}>
                <button className={styles.submit} onClick={sendForm} type="submit">submit</button>
            </section> 
          </div>
        </section>
    </>
  );
};

export default TransactionsAddPopup;