import { INavItem } from "@/core/model/INavItem";
import styles from "./NavbarStyle.module.css";
import logoDeconnexion from "../../img/Logo-red-deconnexion.svg"
import logoHome from "../../img/logo-home.svg"
import logoEvent from "../../img/logo-reservation.svg"

const Navbar = () => {
  const navBarContent: INavItem[] = [
    {
      label: "A",
      route: "/homePage",
      navImg : logoHome.src
    },
    {
      label: "E",
      route: "/homePage/eventPage",
      navImg : logoEvent.src
    },
    {
      label: "D",
      route: "http://localhost:3000/",
      navImg : logoDeconnexion.src,
    },
  ];

  return (
    <section className={styles.containerNavbar}>
      {navBarContent.map((content, index) => (
        <a
          className={index ? styles.navLink : styles.navLinkFirst}
          href={content.route}
          key={content.label}
        >
          <img src={content.navImg} alt="" />
        </a> 
      ))}
    </section>
  );
};

export default Navbar;