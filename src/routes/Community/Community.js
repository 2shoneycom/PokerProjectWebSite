import { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar"
import ContentItemBox from "../../components/ContentItemBox";
import style from "../../styles/style.module.css"
import Footer from "../../components/Footer";

function Community() {
  const [communityList, setCommunityList] = useState(["Q & A", "General Discussion"]);
  const [linkList, setLinkList] = useState(["QA", "GD"]);

  return (
    <div className={style.mainpage}>
      <NavBar currentPage={"Community"} />
      <div className={style.mainpage_section_v3}>
        <div className={style.community_sub_box}>
          {communityList.map((Item, index) => {
            return (<Link to={`${linkList[index]}`} className={style.link_general}>{Item}</Link>);
          })}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Community;