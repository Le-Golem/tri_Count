import { useEffect, useState } from "react"
import styles from "./eventPatchDetailsStyle.module.css"
import { IUser } from "@/core/model/IUser"
import { IEventData } from "@/core/model/IEventData"
import DisplayUserInput from "../displayUserInput"
import { IEvent } from "@/core/model/IEvent"
import { IToken } from "@/core/model/IToken"
import userService from "@/core/services/userService"
import { IAddEvent } from "@/core/model/IAddEvent"
import eventService from "@/core/services/eventService"
import { IParticipate } from "@/core/model/IParticipate"
import { IPatchEvent } from "@/core/model/IPatchEvent"
const EventPatchDetails = ({setDisplayPopupPatchEvent , refreshUserConnected , event } : {setDisplayPopupPatchEvent : Function , refreshUserConnected : Function , event : IEventData | undefined }) => {
console.log("🚀 ~ file: eventPatchDetails.tsx:12 ~ EventPatchDetails ~ event:", event)

const [userConnected, setUserConnected] : [IUser | undefined, setUserList : Function] = useState()
const [label, setLabel] = useState(event?.event.label || '');
const [description, setDescription] = useState(event?.event.description || '');
const [users, setUsers] = useState(event?.participate || []);
const [displayUserInput , setDisplayUserInput] : [displayUserInput : boolean , setDisplayUserInput : Function] = useState(false)
const [userList , setUserList] : [userList : IUser[] , setUserList : Function] = useState([])
const [userChoice , setUserChoice] : [userChoice : IUser | undefined , setUserChoice : Function] = useState()
const [token, setToken] : [token : IToken | undefined, setToken : Function] = useState();
const [userSelected , setUserSelected] : [userSelected : IParticipate[] , setUserSelected : Function] = useState(event?.participate || [])

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
        let inputValue = event.target.value;
        let cleanedValue = inputValue.replace(/[^\w\s]/gi, '');
        event.target.value = cleanedValue;
        console.log(cleanedValue)
            setDescription(cleanedValue)
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
    
        const eventToUpdate: IPatchEvent = {
            eventId : event ? event.event.eventId : 0,
            label: label,
            description: String(description),
            isActive: true,
        };
        
        if (label.length !== 0 && description.length !== 0 && userSelected.length !== 0 && event) {
            console.log(event.event.eventId)
            eventService.updateEvent(eventToUpdate).then(res => {
                refreshUserConnected();
                setDisplayPopupPatchEvent(false);
            }).catch(error => {
                console.error(error);
                alert("Erreur lors de la mise à jour de l'événement. Veuillez réessayer.");
            });
        } else {
            alert("Veuillez indiquer toutes les informations.");
        }
    }

    useEffect(() => {
        const filteredUserList = userList.filter(user => !userSelected.some(selectedUser => selectedUser.userId === user.userId));
        setUserList(filteredUserList);
    }, [userSelected]);
    
    const handleDelete = (index: number) => {
        const currentUserIndex = userSelected.findIndex(user => user.userId === userConnected?.userId);
    
        if (currentUserIndex !== -1 && currentUserIndex === index) {
            alert("Vous ne pouvez pas vous supprimer de la liste.");
            return;
        }
    
        const updatedUserSelected = [...userSelected];
        const removedUser = updatedUserSelected.splice(index, 1)[0];
        setUserList((prevUserList : IUser[]) => [...prevUserList, removedUser]);
        setUserSelected(updatedUserSelected);
    };
    return(
        <>
        <figure onClick={() => setDisplayPopupPatchEvent(false)} className={styles.backGroud} />
        <section className={styles.FondFiltre} style={{display : "flex" , flexDirection : "column" , justifyContent:'space-between'}}>
            <section style={{marginLeft :"25px"}}>
                <div style={{display : "flex" , justifyContent : "space-between"}}>
                    <p style={{marginTop : "10px"}}>Modifier un evenement</p>
                    <button onClick={() => setDisplayPopupPatchEvent(false)}  style={{width : "40px" , height : "40px" , margin : "10px"}}>X</button>
                </div>
                <section style={{display : "flex" , gap : "10%"}}>
                    <div className={`${styles.inputContainer} ${styles.ic1}`}>
                    <input autoComplete="off" type="Label" value={label} className={styles.input} id="Label" onChange={handleLabelChange} />                        <div className={styles.cut}></div>
                        <label className={styles.iLabel} htmlFor="Label">Label</label>
                    </div>
                </section>
                <div className={`${styles.inputContainer} ${styles.ic1}`}>
                <textarea className={styles.textarea} id="description" value={description} onChange={handleDescription} style={{ width: "600px", height: "600px", maxWidth: "600px", maxHeight: "200px", minHeight: "50px", minWidth: "50px", marginTop: "10px", resize: "none" }}></textarea>
                    <div className={styles.cut}></div>
                    <label className={styles.iLabel} htmlFor="description">Description</label>
                </div>
            </section>

            <section style={{marginBottom : "10px" , display : "flex" , justifyContent :"center" , textAlign : "center"}}>
                <button className={styles.submit} onClick={sendForm} type="submit">Modifier</button>
            </section>
        </section>
        </>
    )
}
export default EventPatchDetails;