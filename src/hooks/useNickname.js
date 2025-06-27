import { useEffect, useState } from "react";
import { getNickName } from "../utilities/database";

function useNickname(user) {
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    if (user) {
      getNickName({ user }).then((name) => {
        setNickname(name);
      });
    }
  }, [user]);

  return nickname;
}

export default useNickname;