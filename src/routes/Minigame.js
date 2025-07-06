import style from "../styles/style.module.css";
import style_minigame from "../styles/Minigame.module.css";
import useAuth from "../hooks/useAuth";
import useSeed from "../hooks/useSeed";
import useNickname from "../hooks/useNickname";
import { useState } from "react";
import { Link } from "react-router-dom";
import { addSeedMoney, deductSeedMoney } from "../utilities/database";

function Minigame() {
  const { user, logout } = useAuth();
  const nickName = useNickname(user);
  const seedMoney = useSeed(user);

  const reelSymbols = [
    "🍒", "🍋", "🍊", "🍉", "⭐", "🔔", "7️⃣",
    "🍋", "🍊", "🍒", "🍉", "⭐", "🍋"
  ];

  const [slotIndexs, setSlotIndexs] = useState([6, 6, 6]);

  const spinSlotMachine = () => {
    // 먼저 사용자 보유 금액에서 1,000원 차감 필요
    deductSeedMoney({user, amount: 1000});

    const getRandomIndex = () => Math.floor(Math.random() * reelSymbols.length);
    const idx1 = getRandomIndex();
    const idx2 = getRandomIndex();
    const idx3 = getRandomIndex();

    // 결과 분석 후, 당첨이면 사용자 보유 금액 증가 필요
    if (idx1 === idx2 && idx2 === idx3) {
      addSeedMoney({user, amount: 10000});
    }

    setSlotIndexs([idx1, idx2, idx3]);
  };

  return (
    <div className={`${style.mainpage} ${style_minigame.mainpage}`}>
      <Link to="/" className={style.link_general}><div className={style_minigame.previous_button}>{'<'}</div></Link>


      <div className={style_minigame.user_info}>
        <div className={style_minigame.nickname}>{nickName}</div>
        <div className={style_minigame.seedMoney}>{seedMoney}</div>
      </div>

      <h1>Slot Machine!</h1>

      <div className={style_minigame.slot_machine}>
        <div className={style_minigame.reel}>{reelSymbols[slotIndexs[0]]}</div>
        <div className={style_minigame.reel}>{reelSymbols[slotIndexs[1]]}</div>
        <div className={style_minigame.reel}>{reelSymbols[slotIndexs[2]]}</div>
      </div>

      <div className={style_minigame.start_button} onClick={spinSlotMachine}>
        -1,000
      </div>
    </div>
  );
}

export default Minigame;