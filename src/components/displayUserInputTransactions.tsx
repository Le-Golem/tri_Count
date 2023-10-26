import { IParticipate } from "@/core/model/IParticipate";
import { IUser } from "@/core/model/IUser";

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
            <article style={{ border: "1px solid #DFE0EB", borderRadius: "4px", backgroundColor: "white", padding: "10px", paddingBottom: "0", position: "absolute", zIndex: "1", width: "93%", overflow: "auto", maxHeight: "360px", marginTop: "5px", boxShadow: "0px 0px 10px 0px #66708559" }}>
            {selectAll &&
                <div key={-1}>
                    <p onClick={(event) => handleAll(tempoUser, event)} style={{ height: "32px", fontSize: "14px", fontFamily: "Inter", color: "#667085", cursor: "pointer", width: "100%" }}>
                    {tempoUser.username}
                    </p>
                </div>}
            {participate && participate.length !== 0 && selectList &&  participate.map((user) => {
                return (
                    <div key={user.username}>
                        <p onClick={(event) => handleClick(user.userId, event)} style={{ height: "32px", fontSize: "14px", fontFamily: "Inter", color: "#667085", cursor: "pointer", width: "100%" }}>
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