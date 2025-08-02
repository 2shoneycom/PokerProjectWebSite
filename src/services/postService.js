// src/services/postService.js
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { firestoreDB } from "../utilities/firebase";

/**
 * 새 게시글을 생성합니다
 * @param {Object} params - 게시글 생성에 필요한 매개변수
 * @param {string} params.title - 게시글 제목
 * @param {string} params.content - 게시글 내용
 * @param {Object} params.user - 작성자 정보
 * @param {string} params.postType - 게시글 타입 ("QA" 또는 일반 게시글)
 */
export async function createPost({ title, content, user, nickname, postType }) {
  try {
    const basePost = {
      title,
      content,
      author: {
        uid: user.uid,
        nickname: nickname || "익명",
      },
      createdAt: serverTimestamp(),
    };

    let collectionName;
    let post;

    if (postType === "QA") {
      // 질문 글은 questions 컬렉션에 저장 (comments 없음)
      collectionName = "questions";
      post = { ...basePost };
    } else {
      // 일반 글은 generals 컬렉션에 저장 (comments 포함)
      collectionName = "generals";
      post = { 
        ...basePost,
        comments: []
      };
    }

    const docRef = await addDoc(collection(firestoreDB, collectionName), post);
    console.log(`✅ ${postType === "QA" ? "질문" : "일반 게시글"} 등록 완료, ID:`, docRef.id);
    return docRef.id; // 생성된 문서 ID 반환
  } catch (error) {
    console.error("❌ 게시글 등록 실패:", error);
    throw error; // 에러를 상위로 전달
  }
}

// 추후 다른 게시글 관련 함수들도 여기에 추가 가능
// export async function updatePost({ postId, title, content, postType }) { ... }
// export async function deletePost(postId, postType) { ... }
// export async function getQuestions() { ... }
// export async function getGenerals() { ... }