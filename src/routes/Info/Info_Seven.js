import NavBar from "../../components/NavBar"
import style from "../../styles/style.module.css"

function Info_Seven() {
  return (
    <div className={`${style.mainpage}`}>
      <NavBar currentPage={"Info"} />
      <div className={`${style.mainpage_section_v1}`}>
        <div className={style.content_box}>

        </div>
      </div>
    </div>
  );
}

export default Info_Seven;