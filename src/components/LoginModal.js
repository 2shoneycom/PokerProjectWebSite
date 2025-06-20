import styles from '../styles/LoginModal.module.css';
import { loginAndCheckUser } from '../utilities/login';

function LoginModal({ onClose }) {
  const handleGoogleLogin = async () => {
    try {
      await loginAndCheckUser();
      onClose();
    } catch (error) {
      alert("로그인 실패: " + error.message);
    }
  }

  const handleKakaoLogin = () => {
    console.log("카카오 로그인 실행");
    // 실제 Kakao 로그인 로직 연결
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Log In</h2>
        <button onClick={handleGoogleLogin}>구글 로그인</button>
        <button onClick={handleKakaoLogin}>카카오 로그인</button>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}

export default LoginModal;