'use client'
import { IAddEvent } from "@/core/model/IAddEvent";
import styles from "./event-add-popup.module.css"
import { useEffect, useState } from "react";
import { IUser } from "@/core/model/IUser";
import DisplayUserInput from "@/components/displayUserInput";
import userService from "@/core/services/userService";
import eventService from "@/core/services/eventService";

const EventAddPopup = ({setDisplyPopupAddForm , setTrigger , trigger , refreshUserConnected} : {setDisplyPopupAddForm : Function , setTrigger : Function , trigger : boolean , refreshUserConnected : Function}) => {

    const [label , setLabel] : [label : string  , setLabel : Function] = useState("")
    const [description , setDescription] : [description : string  , setDescription : Function] = useState("")
    const [users , setUsers] : [users : IUser[] , setUsers : Function] = useState([])
    const [displayUserInput , setDisplayUserInput] : [displayUserInput : boolean , setDisplayUserInput : Function] = useState(false)
    const [userList , setUserList] : [userList : IUser[] , setUserList : Function] = useState([])
    const [userChoice , setUserChoice] : [userChoice : IUser | undefined , setUserChoice : Function] = useState()
    const [userSelected , setUserSelected] : [userSelected : IUser[] , setUserSelected : Function] = useState([])

    useEffect(() => {
        if (userChoice !== undefined && userChoice !== null) {
            setUserSelected((prevUserSelected : IUser[]) => [...prevUserSelected, userChoice]);
        }
    }, [userChoice]);

    useEffect(() => {
        userService.getAllUsers().then(res => setUserList(res))
    }, []);

    const handleLabelChange = (event : any) => {
        setLabel(event.target.value); 
    };
    const handleDescription = (event : any) => {
        setDescription(event.target.value)
    }
    const handleUsers = (event : any) =>  {
        setUsers(event.target.value)
    }

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

        const IEventToCreate : IAddEvent = {
            label: label,
            description: description,
            usersToParticipate: tempoUserId,
            isActive: true
        };
    
        if (label.length != 0 && description.length != 0 && userSelected.length != 0 ){
            eventService.create(IEventToCreate).then(res => console.log(res))
            refreshUserConnected()
            setDisplyPopupAddForm(false)
        }else {
            alert("Veuillez indiqué toutes les informations")
        }
    }

    function handleDelete(index : number) {
        const updatedUsers = [...userSelected];
        updatedUsers.splice(index, 1);
        setUserSelected(updatedUsers);
    }
    
    return(
        <>
        <figure onClick={() => setDisplyPopupAddForm(false)} className={styles.backGroud} />
        <section className={styles.FondFiltre} style={{display : "flex" , flexDirection : "column" , justifyContent:'space-between'}}>
            <section style={{marginLeft :"25px"}}>
                <div style={{display : "flex" , justifyContent : "space-between"}}>
                    <p style={{marginTop : "10px"}}>Ajouter un Evenement</p>
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
                        {displayUserInput && <DisplayUserInput usersList={userList} setUserChoice={setUserChoice} setDisplayUserInput={setDisplayUserInput} displayUserInput={displayUserInput} />}
                        <button onClick={() => setDisplayUserInput(false)} style={{transform: 'translate(207px, -45px)' , width : "40px" , height : "40px"}} >X</button>
                        <div className={styles.cut}></div>
                        <label className={styles.iLabel} htmlFor="users">users</label>
                    </div>
                    
                    <div>
                        {userSelected.length != 0 ? <p>Participants</p> : "" } 
                        <ul style={{marginTop : "15px" , position : "fixed" , maxHeight : "35vh" , overflow : "auto" , width : "20vh"}}>
                            {userSelected.map((user, index) => (
                            <li style={{marginTop : "5px"}} key={user.userId}>
                                {user.username}
                                <button style={{marginLeft : '5px'}} onClick={() => handleDelete(index)}>X</button>
                            </li>
                            ))}
                        </ul>
                    </div>

                </section>

                <div className={`${styles.inputContainer} ${styles.ic1}`}>
                    <textarea className={styles.textarea} id="description" onChange={handleDescription} style={{ width : "600px" , height : "600px" ,  maxWidth : "600px" , maxHeight : "200px" , minHeight : "50px" , minWidth : "50px" , marginTop : "10px" , resize : "none"}} ></textarea>
                    <div className={styles.cut}></div>
                    <label className={styles.iLabel} htmlFor="description">Description</label>
                </div>
            </section>

            <section style={{marginBottom : "10px" , display : "flex" , justifyContent :"center" , textAlign : "center"}}>
                <button className={styles.submit} onClick={sendForm} type="submit">submit</button>
            </section>
        </section>
        </>
    )
}
export default EventAddPopup 