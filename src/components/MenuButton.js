import PropTypes from "prop-types";
import navStyle from "../styles/Nav.module.css"

function MenuButton({ menuName }) {

  return (
    <div className={navStyle.menu_box}>
      <div className={navStyle.menu_name}>
        {menuName}
      </div>
    </div>
  );
}

MenuButton.propTypes = {
  menu_name: PropTypes.string.isRequired,
}

export default MenuButton;