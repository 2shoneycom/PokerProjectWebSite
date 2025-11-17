import { Link } from "react-router-dom";
import ContentItemBox from "./ContentItemBox";
import style from "../styles/style.module.css";

function ContentList({ items }) {
  return items.map((item) => (
    <Link key={item.link} to={item.link} className={style.link_general}>
      {item.title}
    </Link>
  ));
}

export default ContentList;