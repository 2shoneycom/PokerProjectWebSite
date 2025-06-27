import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import style from "../../styles/style.module.css";
import ContentList from "../../components/ContentList";

function Rank() {
  const rankItems = [
    { title: "Chip Ranking", link: "Chip" },
    { title: "Texas Holdem Ranking", link: "Holdem" },
    { title: "Seven Poker Ranking", link: "Seven" },
    { title: "BlackJack Ranking", link: "BlackJack" },
  ];

  return (
    <div className={style.mainpage}>
      <NavBar currentPage="Rank" />
      <div className={style.mainpage_section_v3}>
        <div className={style.community_sub_title}></div>
        <div className={style.community_sub_box}>
          <ContentList items={rankItems}/>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Rank;