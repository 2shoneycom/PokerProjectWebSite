import NavBar from "../components/NavBar"
import homeStyle from "../styles/Home.module.css"

function Home() {
  return (
    <div className={homeStyle.homepage}>
      <NavBar currentPage={"Homepage"} />
      <section className={homeStyle.homepage_section}>
        <div className={homeStyle.homepage_title}>Poker House</div>
        <img className={homeStyle.homepage_mainImage} src="/img/pokerhouse_main.png" alt="pokerhouse" />
        <div className={homeStyle.homepage_login}>Log In</div>
      </section>
    </div>
  );
}

export default Home;