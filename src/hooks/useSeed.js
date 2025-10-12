import { useEffect, useState } from "react";
import { getSeedMoney } from "../utilities/database";

function useSeed(user) {
  const [seedMoney, setSeedMoney] = useState(0);

  useEffect(() => {
    if (user) {
      getSeedMoney({ user }).then((seed) => {
        setSeedMoney(seed);
      });
    }
  }, [user]);

  return {seedMoney, setSeedMoney};
}

export default useSeed;