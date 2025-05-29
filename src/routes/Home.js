import LoginModal from "../components/LoginModal";
import NavBar from "../components/NavBar";
import style from "../styles/style.module.css";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

function Home() {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const [nickName, setNickName] = useState(null);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser ?? null);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("로그아웃 성공");
        setUser(null); // 상태도 초기화
      })
      .catch((error) => {
        console.error("로그아웃 오류:", error);
      });
  };

  return (
    <div className={style.mainpage}>
      <NavBar currentPage={"Homepage"} />
      <div className={style.mainpage_section_v3}>
        <div className={style.section_main}>
          <div className={style.homepage_title}>Poker House</div>
          <img
            className={style.homepage_mainImage}
            src={process.env.PUBLIC_URL + "/img/pokerhouse_main.png"}
            alt="pokerhouse"
          />
          {user ? (
            // 로그인 상태면
            <div className={style.homepage_greeting}>
              Hi, {nickName}
            </div>
          ) : (
            <div onClick={() => setShowModal(true)} className={style.homepage_login}>
              Log In
            </div>
          )}
        </div>
        <div className={style.section_footer}>
          {user ? (
            // 로그인 상태면
            <div onClick={handleLogout} className={style.logout_button}>
              Log Out
            </div>
          ) : (
            null
          )}
        </div>
        {showModal && (
          <LoginModal onClose={() => setShowModal(false)} setNickName={setNickName}/>
        )}
      </div>
    </div >
  );
}

export default Home;