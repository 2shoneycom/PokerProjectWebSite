import MenuItem from "./MenuItem";
import style from "../styles/style.module.css"
import { Link } from "react-router-dom";
import { useState } from "react";

function NavBar({ currentPage }) {
  const [leftMenuList, setLeftMenuList] = useState(["Info", "Rank", "Community", "PatchNote"]);

  return (
    <div className={style.nav_box}>
      <div className={style.left_nav}>
        {leftMenuList.map((menu) =>
          <MenuItem menuName={menu} currentPage={currentPage} />
        )}
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
          <MenuItem menuName={"Download"} />
        }
      </div>
    </div>
  );
}

export default NavBar;