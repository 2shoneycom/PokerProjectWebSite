import styles from "../../styles/components/FooterSection.module.css";

function FooterSection({ user, logout }) {
  return (
    <div className={styles.section_footer}>
      {user && (
        <>
          <div onClick={logout} className={styles.logout_button}>
            Log Out
          </div>
          <div className={styles.minigame_button}>
            
          </div>
        </>
      )}
    </div>
  );
}

export default FooterSection;