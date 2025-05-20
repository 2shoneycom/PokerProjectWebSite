import NavBar from "../../components/NavBar"
import ContentItemBox from "../../components/ContentItemBox";
import style from "../../styles/style.module.css"
import { useState } from "react";

function Info() {
  const [infoList, setInfoList] = useState(["About Game..", "How To Play Texas Holdem", "How To Play Seven Poker", "How To Play Black Jack"]);

  return (
    <div className={style.infopage}>
      <NavBar currentPage={"Info"} />
      <div className={style.section}>
        {infoList.map((infoItem) => {
          return (<ContentItemBox content_title={infoItem}/>);
        })}
      </div>
    </div>
  );
}

export default Info;