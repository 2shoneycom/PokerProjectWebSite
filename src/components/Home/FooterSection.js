import styles from "../../styles/components/FooterSection.module.css";
import { Link } from "react-router-dom";

function FooterSection({ user, logout }) {
  return (
    <div className={styles.section_footer}>
      {user && (
        <>
          <div onClick={logout} className={styles.logout_button}>
            Log Out
          </div>
          <Link to="/Minigame">
            <div className={styles.minigame_button}></div>
          </Link>
        </>
      )}
    </div>
  );
}

export default FooterSection;