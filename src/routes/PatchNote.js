import NavBar from "../components/NavBar"
import style from "../styles/style.module.css"

function PatchNote() {
  return (
    <div>
      <NavBar currentPage={"PatchNote"} />
      <div className={style.update_coming}>Update Coming Soon!</div>
    </div>
  );
}

export default PatchNote;