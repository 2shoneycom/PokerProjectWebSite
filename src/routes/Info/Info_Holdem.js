import { useState } from "react";
import NavBar from "../../components/NavBar"
import style from "../../styles/style.module.css"

function Info_Holdem() {
  const [pageIndex, setPageIndex] = useState(0);

  const how_to_text = [
    "First Betting Round (Pre-flop) after receiving two private cards.",
    "Next Betting Round (Flop) after three community cards are dealt.",
    "Next Betting Round (Turn) after the fourth community card is dealt.",
    "Final Betting Round (River) after the fifth community card is dealt.",
    "Showdown begins by comparing the best 5-card combination from the 5 community cards plus each player's 2 private cards."
  ];
  const how_to_img_baseURL = "/img/how_to_holdem_";

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
          <div className={style.about_title}>How To Play Holdem</div>
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

export default Info_Holdem;