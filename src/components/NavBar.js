import MenuItem from "./MenuItem";
import style from "../styles/style.module.css"
import { Link } from "react-router-dom";
import { useState } from "react";

function NavBar({ currentPage }) {
  const [leftMenuList, setLeftMenuList] = useState(["Info", "Rank", "Community", "PatchNote"]);

  return (
    <div className={style.nav_box}>
      <div className={style.left_nav}>
        {leftMenuList.map((menu) => {
          if (currentPage === `${menu}`) {
            return <Link to={`/${menu}`} className={style.link_current}><MenuItem menuName={`${menu}`} /></Link>
          }
          else {
            return <Link to={`/${menu}`} className={style.link_general}><MenuItem menuName={`${menu}`} /></Link>
          }
        })}
        {currentPage === "Homepage" ?
          null :
          <Link to="/">
            <img className={style.nav_mainImage} src={process.env.PUBLIC_URL + "/img/pokerhouse_main.png"} alt="pokerhouse" />
          </Link>
        }
      </div>
      <div className={style.right_nav}>
        {currentPage === "Download" ?
          null :
          <Link to="/Download" className={style.link_general}><MenuItem menuName={"Download"} /></Link>
        }
      </div>
    </div>
  );
}

export default NavBar;