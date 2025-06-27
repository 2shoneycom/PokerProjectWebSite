import NavBar from "../../components/NavBar";
import ContactCard from "../../components/Info/ContactCard";
import style from "../../styles/style.module.css";

function Info_About() {
  const contacts = [
    { name: "SeungHeon Lee", email: "2shoneyhongik@gmail.com", part: "Web" },
    { name: "Heejun An", email: "2shoneyhongik@gmail.com", part: "Game" },
    { name: "JungHyun Oh", email: "2shoneyhongik@gmail.com", part: "DB" }
  ];

  return (
    <div className={style.mainpage}>
      <NavBar currentPage="Info" />
      <div className={style.mainpage_section_v1}>
        <div className={style.content_box}>
          <div className={style.about_title}>About Game..</div>
          <div className={style.about_text}>
            This was created by three senior students majoring in Computer Engineering at Hongik University.
            It is their graduation project.
          </div>

          <div className={style.about_title}>Contact</div>
          {contacts.map((c) => (
            <ContactCard
              key={c.email}
              name={c.name}
              email={c.email}
              part={c.part}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Info_About;