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
        <img src={process.env.PUBLIC_URL + "/img/google_signin.png"} alt="google sign-in" onClick={handleGoogleLogin}/>
        <img src={process.env.PUBLIC_URL + "/img/kakao_login_medium_narrow.png"} alt="kakao sign-in" onClick={handleKakaoLogin}/>
        <div className={styles.closeBtn} onClick={onClose}>x</div>
      </div>
    </div>
  );
}

export default LoginModal;