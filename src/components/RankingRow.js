import style from "../styles/style.module.css"

function RankingRow({ rank, nickName, chip }) {
  return (
    <div className={style.ranking_row}>
      <div className={style.rank}>{rank}</div>
      <div className={style.nickName}>{nickName}</div>
      <div className={style.chip}>{chip !== undefined ? chip.toLocaleString(): "Loading..."}</div>
    </div>
  );
}

export default RankingRow;