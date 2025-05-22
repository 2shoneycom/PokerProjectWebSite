import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import NavBar from "../../components/NavBar"
import ContentItemBox from "../../components/ContentItemBox";
import style from "../../styles/style.module.css"

function Community_Sub() {
  const { type } = useParams();
  const [QAList, setQAList] = useState(["QA#1", "QA#2", "QA#3", "QA#4"]);
  const [GDList, setGDList] = useState(["GD#1", "GD#2", "GD#3", "GD#4"]);
  const [linkList, setLinkList] = useState([1, 2, 3, 4]);

  return (
    <div className={style.mainpage}>
      <NavBar currentPage={"Community"} />
      <div className={style.mainpage_section_v3}>
        {
          type === "QA"
            ? <div className={style.community_sub_title}>Q & A</div>
            : <div className={style.community_sub_title}>General Discussion</div>
        }
        <div className={style.community_sub_box}>
          {
            type === "QA"
              ? QAList.map((Item, index) => (
                <Link to={`${linkList[index]}`} className={style.link_general} key={index}>
                  <ContentItemBox content_title={Item} />
                </Link>
              ))
              : GDList.map((Item, index) => (
                <Link to={`${linkList[index]}`} className={style.link_general} key={index}>
                  <ContentItemBox content_title={Item} />
                </Link>
              ))
          }
        </div>
        <div className={style.community_sub_footer}></div>
      </div>
    </div>
  );
}

export default Community_Sub;