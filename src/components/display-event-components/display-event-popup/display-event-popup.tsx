import DisplayEventPatch from "./display-event-patch/display-event-patch";
import styles from "./display-event-popup-style.module.css"

const DisplayEventPopup: React.FC<{ isActive : boolean , displayPatch : boolean , displayInfo : boolean , refresh : boolean , setRefresh : Function, setDisplayPatch : Function , setDisplayInfo : Function , setDisplayPopup : Function}> = ({isActive , displayPatch , displayInfo , setDisplayPatch , setDisplayInfo , refresh , setRefresh , setDisplayPopup}) => {
    return (
        <>
            {displayPatch ? (
              <>
                <figure onClick={() => setDisplayPatch(false)} className={styles.backGroud} />
                <article className={styles.FondFiltre}>
                    <DisplayEventPatch refresh={refresh} setRefresh={setRefresh} setDisplayPopup={setDisplayPopup}/>
                </article>
              </>
            ) : (
              ""
            )}
        </>
      );
};
export default DisplayEventPopup;