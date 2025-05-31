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
  }
}

async function getAllUserChipData() {
  const usersRef = ref(db, "Users");
  const snapshot = await get(usersRef);
  const data = snapshot.val();

  if (!data) return [];

  const userList = Object.entries(data).map(([uid, userData]) => ({
    uid,
    nickName: userData.nickName,
    seedMoney: userData.seedMoney,
  }));

  return userList;
}

export { getNickName, getAllUserChipData };