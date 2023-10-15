import LoginPageComponent from "@/components/loginpage/login_page_component";
import styles from "../app/Home.module.css"

export default function Home() {
  return (
   <>
    <section className={styles.container} >
      <LoginPageComponent />
    </section>
   </>
  )
}
