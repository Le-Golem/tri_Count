import { INavItem } from "@/core/model/INavItem";
import styles from "./NavbarStyle.module.css";

const Navbar = () => {
  const navBarContent: INavItem[] = [
    {
      label: "Accueil",
      route: "/homePage",
    },
    {
      label: "Evenements",
      route: "/homePage/eventPage",
    },
    {
      label: "Deconnexion",
      route: "http://localhost:3000/",
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
          {content.label}
        </a> 
      ))}
    </section>
  );
};

export default Navbar;