import { deleteUser, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { ref, get } from "firebase/database";
import { auth, db } from "./firebase";

const provider = new GoogleAuthProvider();

const signInWithGoogle = () => {
  return signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      return user;
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      throw error;
    });
};

async function loginAndCheckUser(setNickName) {
  try {
    const user = await signInWithGoogle();

    // DB에 등록된 사용자 확인
    const userRef = ref(db, `Users/${user.uid}`);
    const snapshot = await get(userRef);

    if (!snapshot.exists()) {
      // 등록 안 된 사용자: Auth에서 탈퇴 및 로그아웃 처리
      await deleteUser(user);
      await signOut(auth);
      alert("이 계정은 게임에 등록되어 있지 않아 로그인할 수 없습니다.");
    }
  } catch (error) {
    console.error("로그인 중 오류 발생:", error);
    alert("로그인 중 문제가 발생했습니다.");
  }
}

export { signInWithGoogle, loginAndCheckUser };