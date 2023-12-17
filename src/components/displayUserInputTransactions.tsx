import { IParticipate } from "@/core/model/IParticipate";
import { IUser } from "@/core/model/IUser";
import styles from "./displayUserInput.module.css"

const DisplayUserinputTransactions = ({selectAll , selectList , participate , setUserChoice , setDisplayUserInput} : {selectAll: boolean , selectList : boolean , participate : IParticipate[] | undefined ,setUserChoice : Function , setDisplayUserInput : Function}) => {

    const tempoUser : IUser = { userId : -1 , username : "Tous" , password : "00000" , email : "email" , participate : []}

    if (!selectAll){
        selectAll = false
      }

    function handleClick (userId : number , event : any) {
        if (participate){
            const tempoUser : IParticipate | undefined = participate.find(user => user.userId === userId);
            setUserChoice(tempoUser);
            setDisplayUserInput(false);
        }
        }

    function handleAll (user : IUser , event : any) {
        setUserChoice(user);
        setDisplayUserInput(false);
    }
    


    return( 
        <>
            <article className={styles.componentContainer}>
            {selectAll &&
                <div key={-1}>
                    <p onClick={(event) => handleAll(tempoUser, event)} className={styles.FontP}>
                    {tempoUser.username}
                    </p>
                </div>}
            {participate && participate.length !== 0 && selectList &&  participate.map((user) => {
                return (
                    <div key={user.username}>
                        <p onClick={(event) => handleClick(user.userId, event)} className={styles.FontP}>
                        {user.username}
                        </p>
                    </div>
                    );
            })}
            </article>
        </>
    )
}
export default DisplayUserinputTransactions;