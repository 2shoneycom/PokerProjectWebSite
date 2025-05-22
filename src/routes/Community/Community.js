import { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar"
import ContentItemBox from "../../components/ContentItemBox";
import style from "../../styles/style.module.css"

function Community() {
  const [communityList, setCommunityList] = useState(["Q & A", "General Discussion"]);
  const [linkList, setLinkList] = useState(["QA", "GD"]);

  return (
    <div className={style.mainpage}>
      <NavBar currentPage={"Community"} />
      <div className={style.mainpage_section_v2}>
        {communityList.map((Item, index) => {
          return (<Link to={`${linkList[index]}`} className={style.link_general}><ContentItemBox content_title={Item} /></Link>);
        })}
      </div>
    </div>
  );
}

export default Community;