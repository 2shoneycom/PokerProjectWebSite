import { useState } from "react";
import NavBar from "../../components/NavBar"
import style from "../../styles/style.module.css"

function Info_BlackJack() {
  const [pageIndex, setPageIndex] = useState(0);

  const how_to_text = [
    "Before any cards are dealt, the betting process begins. Once all players have placed their wagers, each player will receive two cards.",
    "After players complete their actions, the dealer's hand is compared. The hand whose total value is closest to 21 without exceeding it wins the round.",
  ];
  const how_to_img_baseURL = "/img/how_to_blackjack_";

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
          <div className={style.about_title}>How To Play BlackJack</div>
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

export default Info_BlackJack;