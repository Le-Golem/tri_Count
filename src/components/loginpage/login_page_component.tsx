'use client'
import { useEffect, useState } from 'react';
import styles from '../../app/Home.module.css';
import userService from '../../core/services/userService';
import authService from '../../core/services/authService';
import { IToken } from '@/core/model/IToken';
import { IPostLogin } from '@/core/model/IPostLogin';
import { IAddUser } from '@/core/model/IAddUser';


const LoginPageComponent = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [accessCode, setAccessCode] = useState<string>("");
    const [token, setToken] = useState<IToken>();


    const handleChangeUsername = (event :any) => {
      setUsername(event.target.value);
    }

    const handleChangePassword = (event : any) => {
      setPassword(event.target.value);
    }

    const handleChangeEmail = (event : any) => {
      setEmail(event.target.value);
    }

    async function getAccessCode(params: IPostLogin) {
      try {
        const result = await authService.GetAccess(params);
        setAccessCode(result);
        return result
      } catch (error) {
        console.error('Erreur lors de la requête :', error);
      }
    }

    useEffect(() => {
      if (token){
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = 'http://localhost:3000/homePage';
      }else {
        localStorage.setItem("isLoggedIn", "false");
      }
    }, [token]);

    const sendForm = async () => {
      if (!isLogin) {
          const userToCreate: IAddUser = {
              username: username,
              password: password,
              email: email,
              authority: "1",
              boolmdp: true,
              photo: "photo",
              enabled: 1
          }
          console.log(userToCreate);
          userService.create(userToCreate).then(res => {if(res) {setIsLogin(true)}});
      } else {
          try {
              let tempoObject: IPostLogin = { username: "", password: "" };
              tempoObject.username = username;
              tempoObject.password = password;
              const tempoAccess = await getAccessCode(tempoObject);
  
              if (tempoAccess) {
                  authService.find(tempoAccess).then(res => res ? setToken(res) : alert("Veuillez indiquer de bonnes coordonnées"));
              }
          } catch (error) {
              console.error('Erreur lors de la requête :', error);
          }
      }
  }

    return (
        <article style={{ height: isLogin ? '400px' : '520px' }} className={styles.form}>
          <div className={styles.containerButtonLogin} >
            <button onClick={() => setIsLogin(true)} className={isLogin ? styles.buttonLoginChoice : styles.buttonLogin} >
                Login
            </button>
            <button onClick={() => setIsLogin(false)} className={isLogin ? styles.buttonLogin : styles.buttonLoginChoice} >
                Register
            </button>
          </div>

            {isLogin ? (
                <>
                      <div className={styles.title}>Welcome</div>
                      <div className={`${styles.inputContainer} ${styles.ic1}`}>
                          <input value={username} type="text" className={styles.input} id="Username" onChange={handleChangeUsername} />
                          <div className={styles.cut}></div>
                          <label className={styles.iLabel} htmlFor="Username">Username</label>
                      </div>

                      <div className={`${styles.inputContainer} ${styles.ic2}`}>
                          <input value={password} type="password" className={styles.input} id="Password" onChange={handleChangePassword} />
                          <div className={styles.cut}></div>
                          <label className={styles.iLabel} htmlFor="Password">Password</label>
                      </div>
                      <button className={styles.submit} onClick={sendForm} type="submit">submit</button>
                  </>
            ) : (
                    <>
                      <div className={styles.title}>Welcome</div>
                      <div className={styles.subtitle}>Let's create your account!</div>

                      <div className={`${styles.inputContainer} ${styles.ic1}`}>
                          <input value={username} type="text" className={styles.input} id="Username" onChange={handleChangeUsername} />
                          <div className={styles.cut}></div>
                          <label className={styles.iLabel} htmlFor="Username">Username</label>
                      </div>

                      <div className={`${styles.inputContainer} ${styles.ic2}`}>
                          <input value={password} type="password" className={styles.input} id="Password" onChange={handleChangePassword} />
                          <div className={styles.cut}></div>
                          <label className={styles.iLabel} htmlFor="Password">Password</label>
                      </div>
                      <div className={`${styles.inputContainer} ${styles.ic2}`}>
                          <input value={email} type="email" className={styles.input} id="email" onChange={handleChangeEmail} />
                          <div className={`${styles.cut} ${styles.cutShort}`}></div>
                          <label className={styles.iLabel} htmlFor="email">Email</label>
                      </div>
                      <button className={styles.submit} onClick={sendForm} type="submit">submit</button>
                    </>
            )}
        </article>
    );
};

export default LoginPageComponent;
