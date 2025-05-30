import { ref, get } from "firebase/database";
import { db } from "./firebase";

async function getNickName({ user }) {
  try {
    // DB에 등록된 사용자 확인
    const userRef = ref(db, `Users/${user.uid}`);
    const snapshot = await get(userRef);
    const userData = snapshot.val();
    const nickName = userData.nickName;
    console.log("닉네임 가져오기 성공: ", nickName);

    return nickName;
  } catch (error) {
    console.error("닉네임 가져오기 실패: ", error);
    alert("닉네임을 가져오는 중 문제가 발생했습니다.");
  }
}

export { getNickName };