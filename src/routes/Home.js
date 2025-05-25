import LoginModal from "../components/LoginModal";
import NavBar from "../components/NavBar"
import style from "../styles/style.module.css"
import { useState } from "react";

function Home() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={style.mainpage}>
      <NavBar currentPage={"Homepage"} />
      <div className={style.mainpage_section_v1}>
        <div className={style.homepage_title}>Poker House</div>
        <img className={style.homepage_mainImage} src={process.env.PUBLIC_URL + "/img/pokerhouse_main.png"} alt="pokerhouse" />
        <div onClick={() => setShowModal(true)} className={style.homepage_login}>
          Log In
        </div>
        {
          showModal && (
            <LoginModal
              onClose={() => setShowModal(false)}
            />
          )
        }
      </div>
    </div>
  );
}

export default Home;