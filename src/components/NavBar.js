import MenuItem from "./MenuItem";
import style from "../styles/style.module.css"
import { Link } from "react-router-dom";
import { useState } from "react";

function NavBar({ currentPage }) {
  const [leftMenuList, setLeftMenuList] = useState(["Info", "Rank", "Community", "PatchNote"]);
  const [isMenuOn, setIsMenuOn] = useState(false);

  const menuClicked = () => {
    setIsMenuOn(!isMenuOn);
  };

  return (
    <>
      <div className={style.nav_box}>
        <div className={style.left_nav}>
          {/* (반응형 웹) 큰 화면 */}
          <div className={style.wide_screen}>
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
          {/* (반응형 웹) 작은 화면 */}
          <div className={style.small_screen}>
            <div className={style.menu_box}>
              <div className={style.menu_name} onClick={() => menuClicked()}>
                Menu
              </div>
            </div>
            {currentPage === "Homepage" ?
              null :
              <Link to="/">
                <img className={style.nav_mainImage} src={process.env.PUBLIC_URL + "/img/pokerhouse_main.png"} alt="pokerhouse" />
              </Link>
            }
          </div>
        </div>
        <div className={style.right_nav}>
          {currentPage === "Download" ?
            null :
            <MenuItem menuName={"Download"} />
          }
        </div>
      </div>
      {isMenuOn ?
        <div className={style.dropdown_menu}>
          {leftMenuList.map((menu) =>
            <MenuItem menuName={menu} currentPage={currentPage} />
          )}
        </div>
        : null
      }
    </>
  );
}

export default NavBar;