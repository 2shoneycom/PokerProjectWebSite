import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import NavBar from "../../components/NavBar";
import styles from "../../styles/Post.module.css";
import { usePost } from "../../hooks/usePost";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { Timestamp } from "firebase/firestore"; // Firestore Timestamp for the new comment
import useNickname from "../../hooks/useNickname";

function Community_Post() {
  const { user } = useAuth();
  const nickname = useNickname(user);
  const navigate = useNavigate();
  const { id } = useParams(); // postId가 아니라 id로 변경
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');

  // 댓글 관련 변수, 함수 설정
  const [comment, setComment] = useState("");
  // **추가:** 댓글 제출 중 상태 관리
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 디버깅을 위한 로그
  console.log('URL params:', useParams());
  console.log('id:', id);

  // usePost 훅에서 setPost와 addCommentToFirestore를 구조 분해 할당
  const { post, loading, error, setPost, addCommentToFirestore } = usePost(id, type);

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

  // **댓글 작성 핸들러 함수**
  const handleSubmitComment = async () => {
    // 1. 유효성 검사 및 중복 제출 방지
    if (!comment.trim() || !user || isSubmitting || !addCommentToFirestore) return;

    setIsSubmitting(true);

    // 2. 새 댓글 데이터 객체 생성
    const newComment = {
      text: comment.trim(),
      // **IMPORTANT**: Get user data from useAuth() hook
      author: {
        // user 객체의 구조에 따라 조정하세요. 일반적으로 uid와 nickname을 사용합니다.
        uid: user.uid,
        nickname: nickname || user.email.split('@')[0] || "익명", // 닉네임이 없으면 이메일 앞부분 사용
      },
      // Firestore에 저장할 때 사용할 Timestamp 객체
      createdAt: Timestamp.fromDate(new Date()),
    };

    try {
      // 3. **Firestore에 댓글 추가**
      await addCommentToFirestore(id, type, newComment);

      // 4. **UI 상태 즉시 업데이트 (낙관적 업데이트)**
      if (setPost) {
        setPost(prevPost => {
          // 새 댓글을 기존 배열의 맨 앞에 추가합니다.
          const updatedComments = [newComment, ...(prevPost.comments || [])];

          return {
            ...prevPost,
            comments: updatedComments,
          };
        });
      }

      // 5. **입력 필드 초기화**
      setComment("");

    } catch (err) {
      console.error("댓글 작성 중 오류 발생:", err);
      alert("댓글 작성에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };


  if (loading) {
    return (
      <div className={styles.mainpage}>
        <NavBar currentPage={"Community"} />
        <section className={styles.section}>
          <div>로딩 중...</div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.mainpage}>
        <NavBar currentPage={"Community"} />
        <section className={styles.section}>
          <div>에러가 발생했습니다: {error}</div>
        </section>
      </div>
    );
  }

  if (!post) {
    return (
      <div className={styles.mainpage}>
        <NavBar currentPage={"Community"} />
        <section className={styles.section}>
          <div>게시글을 찾을 수 없습니다.</div>
        </section>
      </div>
    );
  }

  return (
    <div className={styles.mainpage}>
      <NavBar currentPage={"Community"} />
      <section className={styles.section}>
        <article className={styles.article}>
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
            // ... (Mapping existing comments) ...
            post.comments
              // 댓글을 최신순 (가장 최근에 작성된 댓글이 위로) 정렬.
              // Firestore Timestamp는 .seconds와 .nanoseconds를 가지고 있으므로,
              // .toDate()로 변환하여 비교하거나, 객체 자체를 비교할 수 있습니다.
              .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0))
              .map((comment, index) => (
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
            null
          )}
          {/* 로그인 된 상태라면 댓글 작성 가능 */}
          {user ?
            <div className={styles.comment}>
              <input
                className={styles.new_comment}
                placeholder={isSubmitting ? "댓글 작성 중..." : "Write a New Comment..."}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                disabled={isSubmitting} // 제출 중일 때 비활성화
                onKeyPress={(e) => { // Enter 키로 제출
                  if (e.key === 'Enter') {
                    handleSubmitComment();
                  }
                }}
              />
              <div className={styles.submit_box}>
                <div
                  className={styles.submit_button}
                  onClick={handleSubmitComment} // **여기! 댓글 작성 로직 연결**
                  style={{ opacity: isSubmitting || !comment.trim() ? 0.5 : 1, cursor: isSubmitting || !comment.trim() ? 'not-allowed' : 'pointer' }}
                >
                  {isSubmitting ? "Submitting..." : "submit"}
                </div>
              </div>
            </div>
            : null
          }
        </div>
      </section>
    </div>
  );
}

export default Community_Post;