import LoginModal from "../components/LoginModal";
import NavBar from "../components/NavBar";
import style from "../styles/style.module.css";
import useAuth from "../hooks/useAuth"; // Custom hook for auth logic
import { getNickName } from "../utilities/database";
import { useState, useEffect } from "react";

function Home() {
  const { user, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={style.mainpage}>
      <NavBar currentPage="Homepage" />
      <div className={style.mainpage_section_v3}>
        <MainSection
          user={user}
          setShowModal={setShowModal}
          style={style}
        />
        <FooterSection user={user} logout={logout} style={style} />
        {showModal && (
          <LoginModal
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </div>
  );
}

function MainSection({ user, setShowModal, style }) {
  const [nickname, setNickName] = useState("");

  useEffect(() => {
    if (user) {
      getNickName({ user }).then((name) => {
        setNickName(name);
      });
    }
  }, [user]);

  return (
    <div className={style.section_main}>
      <div className={style.homepage_title}>Poker House</div>
      <img
        className={style.homepage_mainImage}
        src={process.env.PUBLIC_URL + "/img/pokerhouse_main.png"}
        alt="pokerhouse"
      />
      {user ? (
        <div className={style.homepage_greeting}>
          Hi, {nickname ? nickname : "Loading..."}
        </div>
      ) : (
        <div
          onClick={() => setShowModal(true)}
          className={style.homepage_login}
        >
          Log In
        </div>
      )}
    </div>
  );
}

function FooterSection({ user, logout, style }) {
  return (
    <div className={style.section_footer}>
      {user ? (
        <div onClick={logout} className={style.logout_button}>
          Log Out
        </div>
      ) : (
        null
      )}
    </div>
  );
}

export default Home;