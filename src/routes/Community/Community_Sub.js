import { Link, useParams } from "react-router-dom";
import NavBar from "../../components/NavBar";
import ContentItemBox from "../../components/ContentItemBox";
import style from "../../styles/style.module.css";
import Footer from "../../components/Footer";
import { usePosts } from "../../hooks/usePosts"; // 커스텀 훅 import
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";

function Community_Sub() {
  const { type } = useParams();
  const { user } = useAuth();
  const { posts, loading, error, hasMore, loadNextPage } = usePosts(type);

  // *********** UI 표시를 위한 로직 (슬라이드 구현) ***********
  const [currentPage, setCurrentPage] = useState(0); // 현재 슬라이드 페이지 인덱스
  const itemsPerPage = 4; // 한 페이지에 표시할 아이템 수 (usePosts의 PAGE_SIZE와 일치)

  // 현재 페이지에 해당하는 포스트만 추출
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPosts = posts.slice(startIndex, endIndex);

  // 다음 페이지 버튼 핸들러
  const handleNext = () => {
    // 1. posts 배열에 다음 페이지를 보여줄 데이터가 이미 있는지 확인
    const nextStartIndex = (currentPage + 1) * itemsPerPage;
    if (nextStartIndex < posts.length) {
      // 데이터가 이미 있으므로 페이지 인덱스만 이동
      setCurrentPage(currentPage + 1);
    } else if (hasMore && !loading) {
      // 2. 데이터가 배열에 없고, 서버에 더 있다면 다음 페이지 로드 요청
      loadNextPage().then(() => {
        // 서버에서 로드가 완료되면 페이지 인덱스 이동
        setCurrentPage(currentPage + 1);
      });
    }
  };

  // 이전 페이지 버튼 핸들러
  const handlePrev = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
  };
  // ******************************************************

  // (should erase) for logs
  useEffect(() => {
    console.log(`currentPage: ${currentPage}`);
  }, [currentPage]);
  useEffect(() => {
    console.log(`posts.length: ${posts.length}`);
  }, [posts.length]);

  if (loading && posts.length === 0) {
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
          {user ?
            <div className={style.new_post_button}>
              <Link
                to={`newpost/${type}`}
                className={style.link_general}
              >
                <img
                  src={process.env.PUBLIC_URL + "/img/new_post_button.png"}
                />
              </Link>
            </div> : null}
        </div>
        <div className={style.community_sub_box}>
          {/* 이전 버튼 */}
          {currentPage === 0 ? null :
            <button
              className={style.prev_post_button}
              onClick={handlePrev}
            >
              &lt;
            </button>
          }

          {/* 현재 페이지의 4개 포스트 렌더링 */}
          {posts.length === 0 ? (
            <div>게시글이 없습니다.</div>
          ) : (
            currentPosts.map((post) => (
              <Link
                to={`post/${post.id}?type=${type}`}
                className={style.link_general}
                key={post.id}
              >
                {post.title || "제목 없음"}
                {/*<ContentItemBox 
                  content_title={post.title || "제목 없음"} 
                  // 필요에 따라 다른 props들도 전달
                  // author={post.author?.nickname || "익명"}
                  // createdAt={post.createdAt}
                  // content={post.content}
                />*/}
              </Link>
            ))
          )}

          {/* 다음 버튼 */}
          {!hasMore && endIndex >= posts.length ? null :
            <button
              className={style.next_post_button}
              onClick={handleNext}
            >
              &gt;
            </button>
          }
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Community_Sub;