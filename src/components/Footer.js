import useAuth from "../hooks/useAuth";
import style from "../styles/style.module.css"
import { getNickName } from "../utilities/database";
import { useState, useEffect } from "react";

function Footer() {
  const { user } = useAuth();
  const [nickname, setNickName] = useState("");

  useEffect(() => {
    if (user) {
      getNickName({ user }).then((name) => {
        setNickName(name);
      });
    }
  }, [user]);


  return (
    <div className={style.community_sub_footer}>
      {user ? (
        <div className={style.footer_nickName}>{nickname}</div>
      ) : (
        null
      )}
    </div>
  );
}

export default Footer;