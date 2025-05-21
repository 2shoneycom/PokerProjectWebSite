import { useState } from "react";
import NavBar from "../../components/NavBar"
import ContentItemBox from "../../components/ContentItemBox";
import style from "../../styles/style.module.css"
import { Link } from "react-router-dom";

function Rank() {
  const [rankList, setRankList] = useState(["Chip Ranking", "Texas Holdem Ranking", "Seven Poker Ranking", "BlackJack Ranking"]);
  const [linkList, setLinkList] = useState(["Chip", "Holdem", "Seven", "BlackJack"]);

  return (
    <div className={style.mainpage}>
      <NavBar currentPage={"Rank"} />
      <div className={style.mainpage_section_v2}>
        {rankList.map((rankItem, index) => {
          return (<Link to={`${linkList[index]}`} className={style.link_general}><ContentItemBox content_title={rankItem} /></Link>);
        })}
      </div>
    </div>
  );
}

export default Rank;