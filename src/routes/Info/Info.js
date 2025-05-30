import NavBar from "../../components/NavBar"
import ContentItemBox from "../../components/ContentItemBox";
import style from "../../styles/style.module.css"
import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";

function Info() {
  const [infoList, setInfoList] = useState(["About Game..", "How To Play Texas Holdem", "How To Play Seven Poker", "How To Play Black Jack"]);
  const [linkList, setLinkList] = useState(["About", "Holdem", "Seven", "BlackJack"])

  return (
    <div className={style.mainpage}>
      <NavBar currentPage={"Info"} />
      <div className={style.mainpage_section_v3}>
        <div className={style.community_sub_title}></div>
        <div className={style.community_sub_box}>
          {infoList.map((infoItem, index) => {
            return (<Link to={`${linkList[index]}`} className={style.link_general}><ContentItemBox content_title={infoItem} /></Link>);
          })}
        </div>
        <Footer/>
      </div>
    </div>
  );
}

export default Info;