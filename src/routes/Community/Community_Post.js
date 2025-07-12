import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../../components/NavBar";
import styles from "../../styles/Post.module.css";
import { usePost } from "../../hooks/usePost";

function Community_Post() {
  const navigate = useNavigate();
  const { id } = useParams(); // postId가 아니라 id로 변경
  
  // 디버깅을 위한 로그
  console.log('URL params:', useParams());
  console.log('id:', id);
  
  const { post, loading, error } = usePost(id);

  // 날짜 포맷 함수
  const formatDate = (timestamp) => {
    if (!timestamp) return "날짜 정보 없음";
    
    // Firestore Timestamp 처리
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className={styles.mainpage}>
        <NavBar currentPage={"Community"} />
        <section>
          <div>로딩 중...</div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.mainpage}>
        <NavBar currentPage={"Community"} />
        <section>
          <div>에러가 발생했습니다: {error}</div>
        </section>
      </div>
    );
  }

  if (!post) {
    return (
      <div className={styles.mainpage}>
        <NavBar currentPage={"Community"} />
        <section>
          <div>게시글을 찾을 수 없습니다.</div>
        </section>
      </div>
    );
  }

  return (
    <div className={styles.mainpage}>
      <NavBar currentPage={"Community"} />
      <section>
        <article>
          <div className={styles.title_box}>
            <div className={styles.title}>{post.title || "제목 없음"}</div>
            <div className={styles.close_box}>
              <img 
                className={styles.close} 
                src={process.env.PUBLIC_URL + "/img/CloseButton.png"} 
                alt="close btn" 
                onClick={() => navigate(-1)}
              />
            </div>
          </div>
          <div className={styles.article_info_box}>
            <div className={styles.article_date}>
              {formatDate(post.createdAt)}
            </div>
            <div className={styles.article_author}>
              <div className={styles.profile_image}></div>
              <div className={styles.author_name}>
                {post.author?.nickname || "익명"}
              </div>
            </div>
          </div>
          <div className={styles.article_content}>
            {post.content || "내용이 없습니다."}
          </div>
        </article>
        <div className={styles.comment_area}>
          <div className={styles.title}>Comment</div>
          {post.comments && post.comments.length > 0 ? (
            post.comments.map((comment, index) => (
              <div key={index} className={styles.comment}>
                <div className={styles.comment_info_box}>
                  <div className={styles.comment_date}>
                    {formatDate(comment.createdAt)}
                  </div>
                  <div className={styles.comment_author}>
                    <div className={styles.profile_image}></div>
                    <div className={styles.author_name}>
                      {comment.author?.nickname || "익명"}
                    </div>
                  </div>
                </div>
                <div className={styles.main_comment}>
                  {comment.text || "댓글 내용이 없습니다."}
                </div>
              </div>
            ))
          ) : (
            <div className={styles.comment}>
              <div className={styles.main_comment}>
                댓글이 없습니다.
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Community_Post;