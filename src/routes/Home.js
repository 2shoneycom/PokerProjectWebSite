import LoginModal from "../components/LoginModal";
import NavBar from "../components/NavBar";
import style from "../styles/style.module.css";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

function Home() {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);

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
      <div className={style.mainpage_section_v1}>
        <div className={style.homepage_title}>Poker House</div>
        <img
          className={style.homepage_mainImage}
          src={process.env.PUBLIC_URL + "/img/pokerhouse_main.png"}
          alt="pokerhouse"
        />

        {user ? (
          <div className={style.homepage_login_area}>
            <div className={style.homepage_login}>
              {user.displayName} 님
            </div>
            <button
              onClick={handleLogout}
              className={style.logout_button}
            >
              로그아웃
            </button>
          </div>
        ) : (
          <div
            onClick={() => setShowModal(true)}
            className={style.homepage_login}
          >
            Log In
          </div>
        )}

        {showModal && (
          <LoginModal onClose={() => setShowModal(false)} />
        )}
      </div>
    </div>
  );
}

export default Home;