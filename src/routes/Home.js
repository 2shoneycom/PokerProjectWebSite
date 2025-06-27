import { useState } from "react";
import useAuth from "../hooks/useAuth";
import NavBar from "../components/NavBar";
import LoginModal from "../components/LoginModal";
import MainSection from "../components/Home/MainSection";
import FooterSection from "../components/Home/FooterSection";
import style from "../styles/style.module.css";

function Home() {
  const { user, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={style.mainpage}>
      <NavBar currentPage="Homepage" />
      <div className={style.mainpage_section_v3}>
        <MainSection user={user} setShowModal={setShowModal} />
        <FooterSection user={user} logout={logout} />
        {showModal && <LoginModal onClose={() => setShowModal(false)} />}
      </div>
    </div>
  );
}

export default Home;