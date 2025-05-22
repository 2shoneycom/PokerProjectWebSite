import PropTypes from "prop-types";
import style from "../styles/style.module.css"
import { Link } from "react-router-dom";

function MenuItem({ menuName, currentPage }) {

  return (
    <div className={style.menu_box}>
      {
        currentPage === menuName ? (
          <Link to={`/${menuName}`} className={style.link_current}>
            <div className={style.menu_name}>{menuName}</div>
          </Link>
        ) : (
          <Link to={`/${menuName}`} className={style.link_general}>
            <div className={style.menu_name}>{menuName}</div>
          </Link>
        )
      }
    </div>
  );
}

MenuItem.propTypes = {
  menu_name: PropTypes.string.isRequired,
}

export default MenuItem;