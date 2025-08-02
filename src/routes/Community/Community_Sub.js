import { Link, useParams } from "react-router-dom";
import NavBar from "../../components/NavBar";
import ContentItemBox from "../../components/ContentItemBox";
import style from "../../styles/style.module.css";
import Footer from "../../components/Footer";
import { usePosts } from "../../hooks/usePosts"; // 커스텀 훅 import
import useAuth from "../../hooks/useAuth";

function Community_Sub() {
  const { type } = useParams();
  const { user } = useAuth();
  const { posts, loading, error } = usePosts(type);

  if (loading) {
    return (
      <div className={style.mainpage}>
        <NavBar currentPage={"Community"} />
        <div className={style.mainpage_section_v3}>
          <div className={style.community_sub_title}>
            {type === "QA" ? "Q & A" : "General Discussion"}
          </div>
          <div className={style.community_sub_box}>
            <div>로딩 중...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={style.mainpage}>
        <NavBar currentPage={"Community"} />
        <div className={style.mainpage_section_v3}>
          <div className={style.community_sub_title}>
            {type === "QA" ? "Q & A" : "General Discussion"}
          </div>
          <div className={style.community_sub_box}>
            <div>에러가 발생했습니다: {error}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={style.mainpage}>
      <NavBar currentPage={"Community"} />
      <div className={style.mainpage_section_v3}>
        <div className={style.community_sub_title}>
          {type === "QA" ? "Q & A" : "General Discussion"}
          { user ? 
            <div className={style.new_post_button}>
              <Link
                to={`newpost/${type}`}
                className={style.link_general} 
              >
              <img 
                src={process.env.PUBLIC_URL + "/img/new_post_button.png"}
              />
              </Link>
            </div> : null }
        </div>
        <div className={style.community_sub_box}>
          {posts.length === 0 ? (
            <div>게시글이 없습니다.</div>
          ) : (
            posts.map((post) => (
              <Link 
                to={`post/${post.id}?type=${type}`}
                className={style.link_general} 
                key={post.id}
              >
                <ContentItemBox 
                  content_title={post.title || "제목 없음"} 
                  // 필요에 따라 다른 props들도 전달
                  // author={post.author?.nickname || "익명"}
                  // createdAt={post.createdAt}
                  // content={post.content}
                />
              </Link>
            ))
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Community_Sub;