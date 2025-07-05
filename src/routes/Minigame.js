import style from "../styles/style.module.css";
import style_minigame from "../styles/Minigame.module.css";
import useAuth from "../hooks/useAuth";
import useSeed from "../hooks/useSeed";
import useNickname from "../hooks/useNickname";

function Minigame() {
  const { user, logout } = useAuth();
  const nickName = useNickname(user);
  const seedMoney = useSeed(user);

  return (
    <div className={style.mainpage}>
      <div className={style_minigame.previous_button}>{'<'}</div>
      <div className={style_minigame.user_info}>
        <div className={style_minigame.nickname}>{`${nickName}`}</div>
        <div className={style_minigame.seedMoney}>{`${seedMoney}`}</div>
      </div>
      <div className={style_minigame.start_button}>-1,000</div>
    </div>
  );
}

export default Minigame;