import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import style from "../../styles/style.module.css";
import ContentList from "../../components/ContentList";

function Info() {
  const infoItems = [
    { title: "About Game..", link: "About" },
    { title: "How To Play Texas Holdem", link: "Holdem" },
    { title: "How To Play Seven Poker", link: "Seven" },
    { title: "How To Play Black Jack", link: "BlackJack" },
  ];

  return (
    <div className={style.mainpage}>
      <NavBar currentPage="Info" />
      <div className={style.mainpage_section_v3}>
        <div className={style.community_sub_title}></div>
        <div className={style.community_sub_box}>
          <ContentList items={infoItems}/>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Info;