import NavBar from "../components/NavBar"
import style from "../styles/style.module.css"

function Home() {
  return (
    <div className={style.homepage}>
      <NavBar currentPage={"Homepage"} />
      <section className={style.homepage_section}>
        <div className={style.homepage_title}>Poker House</div>
        <img className={style.homepage_mainImage} src={process.env.PUBLIC_URL + "/img/pokerhouse_main.png"} alt="pokerhouse" />
        <div className={style.homepage_login}>Log In</div>
      </section>
    </div>
  );
}

export default Home;