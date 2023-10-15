
import { INavItem } from "@/core/model/INavItem"
import styles from "./NavbarStyle.module.css"

const Navbar = () => {

    const navBarContent : INavItem[] = [
        {
            label : "Accueil" , 
            route : "/homePage" , 
        },
        {
            label : "Evenements" , 
            route : "/homePage/eventPage" , 
        },
        {
            label : "Transactions" , 
            route : "/homePage/transactionPage" , 
        },
        {
            label : "Options" , 
            route : "/" , 
        },
    ]
    return(
        <>
        <section className={styles.containerNavbar}>
            {
                navBarContent.map((content , index) => (
                    <a className={index ? "test" : "test"} href={content.route} key={content.label}>{content.label}</a>
                ))
            }
        </section>
        </>
    )
}
export default Navbar