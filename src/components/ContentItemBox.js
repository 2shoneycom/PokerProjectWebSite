import style from "../styles/style.module.css"

function ContentItemBox({content_title}) {
  return (
    <>
      <div className={style.content_item_box}>
        <div className={style.content_title}>{content_title}</div>
      </div>
    </>
  );
}

export default ContentItemBox;