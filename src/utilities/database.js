import { ref, get, runTransaction } from "firebase/database";
import { db } from "./firebase";

let nickName_saved = "";

function getNickNameSaved() {
  return nickName_saved;
}

async function getSeedMoney({ user }) {
  try {
    const userRef = ref(db, `Users/${user.uid}`);
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


async function deductSeedMoney({ user, amount }) {
  if (!user || !user.uid) {
    console.error("사용자 정보가 유효하지 않습니다.");
    return;
  }

  const userRef = ref(db, `Users/${user.uid}`); // 🔄 seedMoney만 말고 전체 user 객체 접근

  console.log("deductSeedMoney 호출됨 - user:", user);

  try {
    await runTransaction(userRef, (currentData) => {
      if (currentData === null || currentData.seedMoney === undefined) {
        console.warn("현재 seedMoney 정보가 없습니다.");
        return; // 트랜잭션 취소
      }

      if (currentData.seedMoney < amount) {
        console.warn("보유 금액이 부족합니다.");
        return; // 트랜잭션 취소
      }

      // 💰 차감한 금액 반환
      return {
        ...currentData,
        seedMoney: currentData.seedMoney - amount,
      };
    });

    console.log(`${amount}원 차감 완료`);
  } catch (error) {
    console.error("금액 차감 실패: ", error);
  }
}

async function addSeedMoney({ user, amount }) {
  const userRef = ref(db, `Users/${user.uid}/seedMoney`);

  try {
    await runTransaction(userRef, (currentMoney) => {
      if (currentMoney === null) {
        console.warn("현재 금액이 없습니다.");
        return; // 트랜잭션 취소
      }

      return currentMoney + amount;
    });

    console.log(`${amount}원 추가 완료`);
  } catch (error) {
    console.error("금액 추가 실패: ", error);
  }
}

export { getNickName, getSeedMoney, getAllUserChipData, getNickNameSaved, getAllUserGameChipData, deductSeedMoney, addSeedMoney };