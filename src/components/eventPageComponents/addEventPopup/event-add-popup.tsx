'use client'
import { IAddEvent } from "@/core/model/IAddEvent";
import styles from "./event-add-popup.module.css"
import { useEffect, useState } from "react";
import { IUser } from "@/core/model/IUser";
import DisplayUserInput from "@/components/displayUserInput";
import userService from "@/core/services/userService";
import eventService from "@/core/services/eventService";
import { IToken } from "@/core/model/IToken";
import { IEvent } from "@/core/model/IEvent";

const EventAddPopup = ({setDisplyPopupAddForm , setTrigger , trigger , refreshUserConnected , titre , event } : {setDisplyPopupAddForm : Function , setTrigger : Function , trigger : boolean , refreshUserConnected : Function , titre : string , event : IEvent | number }) => {

    const [userConnected, setUserConnected] : [IUser | undefined, setUserList : Function] = useState()
    const [label , setLabel] : [label : string  , setLabel : Function] = useState("")
    const [description , setDescription] : [description : string  , setDescription : Function] = useState("")
    const [users , setUsers] : [users : IUser[] , setUsers : Function] = useState([])
    const [displayUserInput , setDisplayUserInput] : [displayUserInput : boolean , setDisplayUserInput : Function] = useState(false)
    const [userList , setUserList] : [userList : IUser[] , setUserList : Function] = useState([])
    const [userChoice , setUserChoice] : [userChoice : IUser | undefined , setUserChoice : Function] = useState()
    const [token, setToken] : [token : IToken | undefined, setToken : Function] = useState();
    const [userSelected , setUserSelected] : [userSelected : IUser[] , setUserSelected : Function] = useState([])
    
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            const parsedToken: IToken = JSON.parse(storedToken);
            setToken(parsedToken);
    
            if (parsedToken && parsedToken.sub) {
                const tempoId = parsedToken.sub;
                userService.getUserById(tempoId).then((res) => {
                    setUserConnected(res);
    
                    if (res && res.userId) {
                        setUserSelected([res]);
                    }
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
        setDescription(cleanedValue)
    }
    const handleUsers = (event : any) =>  {
        setUsers(event.target.value)
    }

    if (titre.startsWith("Modifier un") && typeof event != "number") {
        setLabel(event.label);
        setDescription(event.description);
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
            isActive: true,
            date : new Date(Date.now())
        };

        if (label.length != 0 && description.length != 0 && userSelected.length != 0 ){
            eventService.create(IEventToCreate).then(res => console.log(res)).then(() => {
                refreshUserConnected()
                setDisplyPopupAddForm(false)
            })
        }else {
            alert("Veuillez indiqué toutes les informations")
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
        <figure onClick={() => setDisplyPopupAddForm(false)} className={styles.backGroud} />
        <section className={styles.FondFiltre}>
            <section className={styles.sectionPlacement}>
                <div className={styles.divHeader}>
                    <p className={styles.pPlacement}>{titre}</p>
                    <button onClick={() => setDisplyPopupAddForm(false)} className={styles.buttonStyle}>X</button>
                </div>
                <section className={styles.sectionContainer}>
                    <div className={`${styles.inputContainer} ${styles.ic1}`}>
                        <input autoComplete="off"  type="Label" className={styles.input} id="Label" onChange={handleLabelChange}  />
                        <div className={styles.cut}></div>
                        <label className={styles.iLabel} htmlFor="Label">Label</label>
                    </div>

                    <div className={`${styles.inputContainer} ${styles.ic1}`} >
                        <input autoComplete="off"  type="text" className={styles.input} id="users" onChange={handleUsers} onClick={() => setDisplayUserInput(true)}/>
                        {displayUserInput && <DisplayUserInput usersList={userList} setUserChoice={setUserChoice} setDisplayUserInput={setDisplayUserInput} displayUserInput={displayUserInput} />}
                        <button onClick={() => setDisplayUserInput(false)} className={styles.buttonDeleteStyle}>X</button>
                        <div className={styles.cut}></div>
                        <label className={styles.iLabel} htmlFor="users">users</label>
                    </div>
                    
                    <div>
                        <ul className={styles.sectionList}>
                        <h1 className={styles.h1Font}>Participants</h1>
                            <div>
                            {userSelected.map((user, index) => (
                                <li className={styles.liFont} key={user.userId}>
                                    <span className={styles.spanPlacement}>{user.username}</span>
                                    {user.userId !== userConnected?.userId && (
                                        <button className={styles.buttonList} onClick={() => handleDelete(index)}>X</button>
                                    )}
                                </li>
                            ))}
                            </div>
                        </ul>
                    </div>


                </section>

                <div className={`${styles.inputContainer} ${styles.ic1}`}>
                    <textarea className={styles.textarea} id="description" onChange={handleDescription}></textarea>
                    <div className={styles.cut}></div>
                    <label className={styles.iLabel} htmlFor="description">Description</label>
                </div>
            </section>

            <section className={styles.footerSection}>
                <button className={styles.submit} onClick={sendForm} type="submit">submit</button>
            </section>
        </section>
        </>
    )
}
export default EventAddPopup 