import { useParams } from "react-router-dom";
import style from "../../styles/style.module.css"
import NavBar from "../../components/NavBar";
import { useEffect, useState } from "react";
import { getAllUserChipData, getAllUserGameChipData } from "../../utilities/database";
import RankingRow from "../../components/RankingRow";
import useAuth from "../../hooks/useAuth";

function Rank_Detail() {
  const { type } = useParams();
  const { user } = useAuth();
  const [rankIdx, setRankIdx] = useState();
  const [rankData, setRankData] = useState([]);

  useEffect(() => {
    if (type === "Chip") {
      getAllUserChipData().then((users) => {
        const sorted = users.sort((a, b) => b.chip - a.chip);
        setRankData(sorted);
      });
    } else if (type === "Holdem") {
      getAllUserGameChipData({ gameType: "holdem" }).then((ranks) => {
        const sorted = ranks.sort((a, b) => b.chip - a.chip);
        setRankData(sorted);
      });
    } else if (type === "Seven") {
      getAllUserGameChipData({ gameType: "seven" }).then((ranks) => {
        const sorted = ranks.sort((a, b) => b.chip - a.chip);
        setRankData(sorted);
      });
    } else if (type === "BlackJack") {
      getAllUserGameChipData({ gameType: "blackjack" }).then((ranks) => {
        const sorted = ranks.sort((a, b) => b.chip - a.chip);
        setRankData(sorted);
      });
    }
  }, []);

  useEffect(() => {
    if (user && rankData.length > 0) {
      const idx = rankData.findIndex((u) => u.uid === user.uid);
      setRankIdx(idx);
    }
  }, [user, rankData]);

  return (
    <div className={style.mainpage}>
      <NavBar currentPage={"Rank"} />
      <div className={`${style.mainpage_section_v1}`}>
        <div className={style.content_box}>
          <div className={style.about_title}>
            {`${type}` + " Ranking"}
            {user && rankIdx >= 0 && (
              <div className={style.myRank}>
                <RankingRow
                  rank={rankIdx + 1}
                  nickName={rankData[rankIdx].nickName}
                  chip={rankData[rankIdx].chip}
                />
              </div>
            )}
          </div>
          <div className={style.rank_section}>
            <div className={style.rank_box}>
              <div className={style.rank_bar}>
                <div className={style.rank_bar_Rank}>Rank</div>
                <div className={style.rank_bar_Nick}>NickName</div>
                <div className={style.rank_bar_Chip}>Chip</div>
              </div>
              {rankData.map((user, index) => (
                <RankingRow
                  key={user.uid}
                  rank={index + 1}
                  nickName={user.nickName}
                  chip={user.chip}
                />
              ))}
            </div>
            <div className={style.rank_box}>
              <div className={style.rank_bar}>
                <div className={style.rank_bar_Rank}>Rank</div>
                <div className={style.rank_bar_Nick}>NickName</div>
                <div className={style.rank_bar_Chip}>Chip</div>
              </div>
              <div className={style.rank_item_box}>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rank_Detail;