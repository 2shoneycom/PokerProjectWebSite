import { useParams } from "react-router-dom";
import style from "../../styles/style.module.css"
import NavBar from "../../components/NavBar";

function Rank_Detail() {
	const { type } = useParams();

	return (
		<div className={style.mainpage}>
			<NavBar currentPage={"Rank"} />
			<div className={`${style.mainpage_section_v1}`}>
				<div className={style.content_box}>
					<div className={style.about_title}>{`${type}` + " Ranking"}</div>
					<div className={style.rank_section}>
						<div className={style.rank_box}>
							<div className={style.rank_bar}>
								<div className={style.rank_bar_Rank}>Rank</div>
								<div className={style.rank_bar_Nick}>NickName</div>
								<div className={style.rank_bar_Chip}>Chip</div>
							</div>
							<div className={style.rank_item_box}>

							</div>
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