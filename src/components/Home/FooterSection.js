import style from "../../styles/style.module.css";

function FooterSection({ user, logout }) {
  return (
    <div className={style.section_footer}>
      {user && (
        <div onClick={logout} className={style.logout_button}>
          Log Out
        </div>
      )}
    </div>
  );
}

export default FooterSection;