import NavBar from "../components/NavBar"
import style from "../styles/style.module.css"

function Download() {
  return (
    <div>
      <NavBar currentPage={"Download"} />
      <div className={style.update_coming}>Update Coming Soon!</div>
    </div>
  );
}

export default Download;