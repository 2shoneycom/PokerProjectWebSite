import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../../components/NavBar";
import useAuth from "../../hooks/useAuth"; // useAuth 훅 import
import useNickname from "../../hooks/useNickname"; // useNickname 훅 import
import { createPost } from "../../services/postService"; // postService import
import styles from "../../styles/NewPost.module.css";

function Community_NewPost() {
  const navigate = useNavigate();
  const { post_type } = useParams();
  const { user } = useAuth(); // 사용자 정보 가져오기
  const nickname = useNickname(user); // 닉네임 가져오기
  
  // 제목과 내용을 저장할 상태 변수들
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Firebase Firestore에 저장하는 함수
  const handleSavePost = async () => {
    // 로그인 확인
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    // 닉네임 로딩 확인
    if (!nickname) {
      alert("닉네임을 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    // 입력값 검증
    if (!title.trim()) {
      alert("Please enter a title!");
      return;
    }
    if (!content.trim()) {
      alert("Please enter the details!");
      return;
    }

    try {
      await createPost({
        title: title.trim(),
        content: content.trim(),
        user: user,
        nickname: nickname, // 닉네임 전달
        postType: post_type
      });
      
      alert("게시글이 저장되었습니다!");
      navigate(-1); // 이전 페이지로 돌아가기
    } catch (error) {
      console.error("Error saving post: ", error);
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className={styles.mainpage}>
      <NavBar currentPage={"Community"} />
      <section className={styles.section}>
        <header className={styles.header}>
          { post_type === "QA" ? "New Question" : "New Post" }
          <img className={styles.close_button} 
            src={process.env.PUBLIC_URL + "/img/CloseButton.png"}
            onClick={() => navigate(-1)}
          />
        </header>
        <article className={styles.article}>
          <input 
            className={styles.newpost_title} 
            placeholder="Enter a title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea 
            className={styles.newpost_main_content}
            placeholder="Enter the details"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </article>
        <footer className={styles.footer}>
          <div className={styles.done_button} onClick={handleSavePost}>
            <span>Done</span>
          </div>
        </footer>
      </section>
    </div>
  );
}

export default Community_NewPost;