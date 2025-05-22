import style from "../../styles/style.module.css"
import NavBar from "../../components/NavBar";

function Community_Post() {
  return (
    <div className={style.mainpage}>
      <NavBar currentPage={"Community"} />
      <div className={style.mainpage_section_v3}>
        <div className={style.community_sub_title}>Title..</div>
      </div>
    </div>
  );
}

export default Community_Post;