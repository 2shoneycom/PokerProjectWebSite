import { ref, get, set } from "firebase/database";
import { realtimeDB } from "./firebase";

let nickName_saved = "";

function getNickNameSaved() {
  return nickName_saved;
}

async function getSeedMoney({ user }) {
  try {
    const userRef = ref(realtimeDB, `Users/${user.uid}`);
    const snapshot = await get(userRef);
    const userData = snapshot.val();
    const seedMoney = userData.seedMoney;
    console.log("보유 금액 가져오기 성공: ", seedMoney);

    return seedMoney;
  } catch (error) {
    console.error("보유 금액 가져오기 실패: ", error);
  }
}

async function getNickName({ user }) {
  try {
    // realtimeDB에 등록된 사용자 확인
    const userRef = ref(realtimeDB, `Users/${user.uid}`);
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
    // realtimeDB에 등록된 사용자 확인
    const userRef = ref(realtimeDB, `Users/${uid}`);
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
  const usersRef = ref(realtimeDB, "Users");
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
  const rankRef = ref(realtimeDB, `MoneyRank/${gameType}`);
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

async function deductSeedMoney({ user, amount }) {
  if (!user || !user.uid) {
    console.error("유효하지 않은 사용자입니다.");
    return;
  }

  const userRef = ref(db, `Users/${user.uid}/seedMoney`);

  try {
    const snapshot = await get(userRef);
    const currentMoney = snapshot.val();

    if (currentMoney === null || typeof currentMoney !== "number") {
      console.warn("❗ seedMoney 정보가 없습니다.");
      return;
    }

    if (currentMoney < amount) {
      console.warn("❗ 금액 부족");
      return;
    }

    await set(userRef, currentMoney - amount);
    console.log(`✅ ${amount}원 차감 완료 (남은 금액: ${currentMoney - amount})`);
  } catch (error) {
    console.error("💥 금액 차감 실패: ", error);
  }
}

async function addSeedMoney({ user, amount }) {
  if (!user || !user.uid) {
    console.error("유효하지 않은 사용자입니다.");
    return;
  }

  const userRef = ref(db, `Users/${user.uid}/seedMoney`);

  try {
    const snapshot = await get(userRef);
    const currentMoney = snapshot.val();

    if (currentMoney === null || typeof currentMoney !== "number") {
      console.warn("❗ seedMoney 정보가 없습니다.");
      return;
    }

    await set(userRef, currentMoney + amount);
    console.log(`✅ ${amount}원 증감 완료 (남은 금액: ${currentMoney + amount})`);
  } catch (error) {
    console.error("💥 금액 증감 실패: ", error);
  }
}

export { getNickName, getSeedMoney, getAllUserChipData, getNickNameSaved, getAllUserGameChipData, deductSeedMoney, addSeedMoney };