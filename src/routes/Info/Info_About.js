import NavBar from "../../components/NavBar"
import style from "../../styles/style.module.css"

function Info_About() {

  return (
    <div className={`${style.mainpage}`}>
      <NavBar currentPage={"Info"} />
      <div className={`${style.mainpage_section_v1}`}>
        <div className={style.content_box}>
          <div className={style.about_title}>About Game..</div>
          <div className={style.about_text}>This was created by three senior stdudents majoring in Computer Engineering at Hongik University.<br/>
          It is their graduation project.</div>
          <div className={style.about_title}>Contact</div>
          <div className={style.about_contact_box}>
            <div className={style.about_contact_name}>SeungHeon Lee</div>
            <div className={style.about_contact_email}>2shoneyhongik@gmail.com</div>
            <div className={style.about_contact_part}>Web</div>
          </div>
          <div className={style.about_contact_box}>
            <div className={style.about_contact_name}>Heejun An</div>
            <div className={style.about_contact_email}>2shoneyhongik@gmail.com</div>
            <div className={style.about_contact_part}>Game</div>
          </div>
          <div className={style.about_contact_box}>
            <div className={style.about_contact_name}>JungHyun Oh</div>
            <div className={style.about_contact_email}>2shoneyhongik@gmail.com</div>
            <div className={style.about_contact_part}>DB</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Info_About;