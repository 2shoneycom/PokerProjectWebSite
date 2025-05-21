import NavBar from "../components/NavBar"
import style from "../styles/style.module.css"

function Rank() {
  return (
    <div>
      <NavBar currentPage={"Rank"} />
      <div className={style.update_coming}>Update Coming Soon!</div>
    </div>
  );
}

export default Rank;