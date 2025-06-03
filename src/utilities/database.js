import { ref, get } from "firebase/database";
import { db } from "./firebase";

let nickName_saved = "";

function getNickNameSaved() {
  return nickName_saved;
}

async function getNickName({ user }) {
  try {
    // DB에 등록된 사용자 확인
    const userRef = ref(db, `Users/${user.uid}`);
    const snapshot = await get(userRef);
    const userData = snapshot.val();
    const nickName = userData.nickName;
    console.log("닉네임 가져오기 성공: ", nickName);

    nickName_saved = nickName;
    return nickName;
  } catch (error) {
    console.error("닉네임 가져오기 실패: ", error);
  }
}

async function getNickNameByUid({ uid }) {
  try {
    // DB에 등록된 사용자 확인
    const userRef = ref(db, `Users/${uid}`);
    const snapshot = await get(userRef);
    const userData = snapshot.val();
    const nickName = userData.nickName;
    console.log("닉네임 가져오기 성공: ", nickName);

    nickName_saved = nickName;
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
    chip: userData.seedMoney,
  }));

  return userList;
}

async function getAllUserGameChipData({ gameType }) {
  const rankRef = ref(db, `MoneyRank/${gameType}`);
  const snapshot = await get(rankRef);
  const rankData = snapshot.val();

  if (!rankData) return [];

  // Promise 리스트 생성
  const rankListPromise = Object.entries(rankData).map(async ([uid, chip]) => {
    const nickName = await getNickNameByUid({ uid: uid });
    return {
      uid,
      nickName,
      chip,
    };
  });

  // Promise를 실제 값으로 변환
  const rankList = await Promise.all(rankListPromise);

  return rankList;
}

export { getNickName, getAllUserChipData, getNickNameSaved, getAllUserGameChipData };