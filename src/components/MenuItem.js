import PropTypes from "prop-types";
import style from "../styles/style.module.css"

function MenuItem({ menuName }) {

  return (
    <div className={style.menu_box}>
      <div className={style.menu_name}>
        {menuName}
      </div>
    </div>
  );
}

MenuItem.propTypes = {
  menu_name: PropTypes.string.isRequired,
}

export default MenuItem;