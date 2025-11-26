import { useState } from "react";
import NavBar from "../../components/NavBar"
import style from "../../styles/style.module.css"

function Info_Seven() {
  const [pageIndex, setPageIndex] = useState(0);

  const how_to_text = [
    "Initially, each player is dealt four cards.",
    "Each player chooses one card to discard (throw away) and one card to expose to other players.",
    "First Betting Round (Fourth Street) follows the dealing of the fourth card (face-up).",
    "Next Betting Round (Fifth Street) follows the dealing of the fifth card (face-up).",
    "Next Betting Round (Sixth Street) follows the dealing of the sixth card (face-up).",
    "Final Betting Round (Seventh Street) follows the dealing of the last card (face-down/hidden).",
    "Showdown begins by comparing each player's best 5-card combination from their 7 total cards."
  ];
  const how_to_img_baseURL = "/img/how_to_seven_";

  return (
    <div className={`${style.mainpage}`}>
      <NavBar currentPage={"Info"} />
      <div className={`${style.mainpage_section_v1}`}>
        <div className={style.content_box}>
          {pageIndex === 0
            ? null
            : <button
                className={style.prev_page_btn}
                onClick={() => setPageIndex(pageIndex-1)}
              >
              &lt;
            </button>
          }
          {pageIndex * 2 + 2 < how_to_text.length
            ? <button 
                className={style.next_page_btn}
                onClick={() => setPageIndex(pageIndex+1)}
              >
              &gt;
            </button>
            : null
          }
          <div className={style.about_title}>How To Play Seven Poker</div>
          <div className={style.how_to_container}>
            {how_to_text[pageIndex * 2] != null
              ?
              <div className={style.how_to_content}>
                <div className={style.how_to_text}>
                  {pageIndex * 2 + 1}. {how_to_text[pageIndex * 2]}
                </div>
                <img
                  className={style.how_to_img}
                  src={process.env.PUBLIC_URL + how_to_img_baseURL + (pageIndex * 2 + 1) + ".png"}
                />
              </div>
              :
              null
            }
            {how_to_text[pageIndex * 2 + 1] != null
              ?
              <div className={style.how_to_content}>
                <div className={style.how_to_text}>
                  {pageIndex * 2 + 2}. {how_to_text[pageIndex * 2 + 1]}
                </div>
                <img
                  className={style.how_to_img}
                  src={process.env.PUBLIC_URL + how_to_img_baseURL + (pageIndex * 2 + 2) + ".png"}
                />
              </div>
              :
              null
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Info_Seven;