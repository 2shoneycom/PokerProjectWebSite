import PropTypes from "prop-types";
import navStyle from "../styles/Nav.module.css"

function MenuItem({ menuName }) {

  return (
    <div className={navStyle.menu_box}>
      <div className={navStyle.menu_name}>
        {menuName}
      </div>
    </div>
  );
}

MenuItem.propTypes = {
  menu_name: PropTypes.string.isRequired,
}

export default MenuItem;