import style from "../../styles/style.module.css";

function ContactCard({ name, email, part }) {
  return (
    <div className={style.about_contact_box}>
      <div className={style.about_contact_name}>{name}</div>
      <div className={style.about_contact_email}>{email}</div>
      <div className={style.about_contact_part}>{part}</div>
    </div>
  );
}

export default ContactCard;