import style from "../../styles/style.module.css";
import useNickname from "../../hooks/useNickname";

function MainSection({ user, setShowModal }) {
  const nickname = useNickname(user);

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
          Hi, {nickname || "Loading..."}
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

export default MainSection;