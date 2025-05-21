import NavBar from "../../components/NavBar"
import ContentItemBox from "../../components/ContentItemBox";
import style from "../../styles/style.module.css"
import { useState } from "react";
import { Link } from "react-router-dom";

function Info() {
  const [infoList, setInfoList] = useState(["About Game..", "How To Play Texas Holdem", "How To Play Seven Poker", "How To Play Black Jack"]);
  const [linkList, setLinkList] = useState(["About", "Holdem", "Seven", "BlackJack"])

  return (
    <div className={style.mainpage}>
      <NavBar currentPage={"Info"} />
      <div className={style.mainpage_section_v2}>
        {infoList.map((infoItem, index) => {
          return (<Link to={`${linkList[index]}`} className={style.link_general}><ContentItemBox content_title={infoItem}/></Link>);
        })}
      </div>
    </div>
  );
}

export default Info;