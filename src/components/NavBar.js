import MenuButton from "./MenuButton";
import navStyle from "../styles/Nav.module.css"

function NavBar() {
  return (
    <div className={navStyle.nav_box}>
      <MenuButton menuName={"Info"}/>
      <MenuButton menuName={"Rank"}/>
      <MenuButton menuName={"Community"}/>
      <MenuButton menuName={"Patch Note"}/>
    </div>
  );
}

export default NavBar;