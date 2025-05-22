import NavBar from "../../components/NavBar"
import style from "../../styles/style.module.css"

function Community() {
  return (
    <div>
      <NavBar currentPage={"Community"} />
      <div className={style.update_coming}>Update Coming Soon!</div>
    </div>
  );
}

export default Community;