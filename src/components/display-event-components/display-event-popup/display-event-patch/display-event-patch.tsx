import { useEffect, useState } from "react";
import styles from "./display-event-patch-styles.module.css"
import { IUser } from "@/core/model/IUser";
import userService from "@/core/services/userService";
import { IAddEvent } from "@/core/model/IAddEvent";
import eventService from "@/core/services/eventService";

const DisplayEventPatch = ({refresh , setRefresh ,setDisplayPopup} : {refresh : boolean , setRefresh : Function , setDisplayPopup : Function}) => {
    const [label, setLabel] = useState('');
    const [solde, setSolde] = useState(0);
    const [displayUserInput, setDisplayUserInput] = useState('');
    const [userList , setUserList] : [userList : IUser[] | undefined, setUserList : Function] = useState()
    const [usersSelectedList , setUsersSelectedList ] : [usersSelectedList : IUser[] , setUsersSelectedList : Function] = useState([])
    const [displayUserInputBool , setDisplayUserInputBool] : [displayUserInputBool : boolean , setDisplayUserInputBool : Function] = useState(false)
    const [selection , setSelection] : [selection : number[] , setSelection : Function] = useState([])
    
  useEffect(() => {
   userService.getAll().then(res => setUserList(res)) 
  } , [])

    // Create a function to handle changes in the Label input
    const handleLabelChange = (event : any) => {
      setLabel(event.target.value);
    };
  
    // Create a function to handle changes in the Solde input
    const handleSoldeChange = (event : any) => {
      setSolde(Number(event.target.value)); // Convert the value to a number
    };
  
    // Create a function to handle changes in the displayUserInput input
    const handleDisplayUserInputChange = (event : any) => {
      setDisplayUserInput(event.target.value);
    };
  
    // Function to send the form data
    const sendForm = () => {
      const EventToCreate : IAddEvent = {
        label: label,
        solde: solde,
        users: selection,
        isActive: true,
      };
      eventService.create(EventToCreate).then(res => console.log(res))
      setRefresh(!refresh)
      setDisplayPopup(false)
    };
  
    return (
      <>
        <h2 className={styles.FontH2}>Création d'événements</h2>
        
        <section style={{display : "flex" , gap : "20px" , marginLeft : "16px"}}>
          <div className={styles.inputContainer}>
            <label className={styles.fontLabel}>Label</label>
            <input
              type="text"
              className={styles.input}
              value={label}
              onChange={handleLabelChange}
            />
          </div>

          <div style={{marginLeft : "16px"}} className={styles.inputContainer}>
            <label className={styles.fontLabel}>Solde</label>
            <input
              type="number"
              className={styles.input}
              value={solde}
              onChange={handleSoldeChange}
            />
          </div>
            <button className={styles.button} onClick={sendForm}>Send Form</button>
        </section>

      <section style={{margin : "10px 0 0 16px" , display : "flex"}}>
            <div className={styles.inputContainer}>
              <label className={styles.fontLabel}>displayUserInput</label>
              <input
                type="text"
                className={styles.input}
                value={displayUserInput}
                onChange={handleDisplayUserInputChange}
                onClick={() => setDisplayUserInputBool(true)}
              />
              {/* {displayUserInputBool ? (
                          <DisplayUserInput usersList={userList} usersSelectedList={usersSelectedList} setUsersSelectedList={setUsersSelectedList} setSelection={setSelection} />
              ) : null}  */}
            </div>
            <div style={{marginLeft : "50px" , maxHeight : "200px" , overflow : "auto" }} className={styles.inputContainer}>
               {usersSelectedList.length !== 0 ? (
                  usersSelectedList.map((list) => (
                    <p key={list.userId}>{list.username}</p>
                    ))
                ) : null}
            </div>
      </section>
      </>
    );
}
export default DisplayEventPatch