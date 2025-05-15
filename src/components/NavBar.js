import MenuItem from "./MenuItem";
import navStyle from "../styles/Nav.module.css"

function NavBar() {
  return (
    <div className={navStyle.nav_box}>
      <div className={navStyle.left_nav}>
        <MenuItem menuName={"Info"} />
        <MenuItem menuName={"Rank"} />
        <MenuItem menuName={"Community"} />
        <MenuItem menuName={"Patch Note"} />
      </div>
      <div className={navStyle.right_nav}>
        <MenuItem menuName={"Download"} />
      </div>
    </div>
  );
}

export default NavBar;