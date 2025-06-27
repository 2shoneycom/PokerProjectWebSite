import { useParams } from "react-router-dom";
import style from "../../styles/style.module.css";
import NavBar from "../../components/NavBar";
import { useEffect, useState } from "react";
import { getAllUserChipData, getAllUserGameChipData } from "../../utilities/database";
import RankingRow from "../../components/RankingRow";
import useAuth from "../../hooks/useAuth";

function Rank_Detail() {
  const { type } = useParams();
  const { user } = useAuth();
  const [rankData, setRankData] = useState([]);
  const [rankIdx, setRankIdx] = useState(null);

  useEffect(() => {
    const fetchRankData = async () => {
      if (type === "Chip") {
        const users = await getAllUserChipData();
        setRankData(users.sort((a, b) => b.chip - a.chip));
      } else {
        const lower = type.toLowerCase();
        const ranks = await getAllUserGameChipData({ gameType: lower });
        setRankData(ranks.sort((a, b) => b.chip - a.chip));
      }
    };

    fetchRankData();
  }, [type]);

  useEffect(() => {
    if (user && rankData.length > 0) {
      const idx = rankData.findIndex((u) => u.uid === user.uid);
      setRankIdx(idx);
    }
  }, [user, rankData]);

  const middleIndex = 10;
  const leftRanks = rankData.slice(0, middleIndex);
  const rightRanks = rankData.slice(middleIndex);

  return (
    <div className={style.mainpage}>
      <NavBar currentPage="Rank" />
      <div className={style.mainpage_section_v1}>
        <div className={style.content_box}>
          <div className={style.about_title}>
            {`${type} Ranking`}
            {user && rankIdx >= 0 && rankData[rankIdx] && (
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
            {[leftRanks, rightRanks].map((chunk, colIdx) => (
              <div key={colIdx} className={style.rank_box}>
                <div className={style.rank_bar}>
                  <div className={style.rank_bar_Rank}>Rank</div>
                  <div className={style.rank_bar_Nick}>NickName</div>
                  <div className={style.rank_bar_Chip}>Chip</div>
                </div>
                {chunk.map((user, idx) => (
                  <RankingRow
                    key={user.uid}
                    rank={colIdx === 0 ? idx + 1 : middleIndex + idx + 1}
                    nickName={user.nickName}
                    chip={user.chip}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rank_Detail;