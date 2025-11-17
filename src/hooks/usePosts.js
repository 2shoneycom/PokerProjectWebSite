import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, limit, startAfter } from 'firebase/firestore'; // limit, startAfter 추가
import { firestoreDB } from '../utilities/firebase';

const PAGE_SIZE = 4; // 한 페이지당 최대 4개

export const usePosts = (type) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 마지막으로 로드된 문서 (다음 페이지를 위한 커서)
  const [lastVisible, setLastVisible] = useState(null);
  // 더 로드할 데이터가 있는지 확인
  const [hasMore, setHasMore] = useState(true);

  // 페이지 이동 함수
  const loadNextPage = async () => {
    console.log('--- loadNextPage 시작 ---'); // 👈 시작 로그 추가
    if (loading || !hasMore) {
      console.log('로드 중단: 로딩 중이거나 더 로드할 데이터가 없음'); // 👈 중단 로그 추가
      return; // 이미 로딩 중이거나 더 이상 데이터가 없으면 중단
    }

    try {
      setLoading(true);
      setError(null);

      let postsCollection;
      if (type === "QA") {
        postsCollection = collection(firestoreDB, 'questions');
      } else {
        postsCollection = collection(firestoreDB, 'generals');
      }

      let q;
      // lastVisible이 null이 아니면 이전에 로드된 마지막 문서 다음부터 시작
      if (lastVisible) {
        q = query(
          postsCollection,
          orderBy('createdAt', 'desc'),
          startAfter(lastVisible), // 이전 마지막 문서 다음부터 시작
          limit(PAGE_SIZE) // 4개만 제한
        );
      } else {
        // 첫 페이지 로드
        q = query(
          postsCollection,
          orderBy('createdAt', 'desc'),
          limit(PAGE_SIZE)
        );
      }

      const querySnapshot = await getDocs(q);
      const newPosts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // 마지막 문서 업데이트 (다음 페이지를 위한 커서)
      const newLastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      setLastVisible(newLastVisible || null);

      // 새로 로드된 포스트 수 확인
      if (newPosts.length < PAGE_SIZE) {
        setHasMore(false); // 로드된 포스트가 4개 미만이면 더 이상 데이터가 없음
      }

      // 기존 포스트에 새로 로드된 포스트를 추가
      setPosts(prevPosts => [...prevPosts, ...newPosts]);

    } catch (err) {
      console.error('게시글을 가져오는 중 에러:', err);
      setError(err.message);
    } finally {
      setLoading(false);
      console.log('--- loadNextPage 종료: setLoading(false) 실행됨 ---'); // 👈 종료 로그 추가
    }
  };

  const initialLoad = async () => {
    console.log("initialLoad start!");

    try {
      setLoading(true);
      setError(null);

      let postsCollection;
      if (type === "QA") {
        postsCollection = collection(firestoreDB, 'questions');
      } else {
        postsCollection = collection(firestoreDB, 'generals');
      }

      let q = query(
        postsCollection,
        orderBy('createdAt', 'desc'),
        limit(PAGE_SIZE)
      );

      const querySnapshot = await getDocs(q);
      const newPosts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // 마지막 문서 업데이트 (다음 페이지를 위한 커서)
      const newLastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      setLastVisible(newLastVisible || null);

      // 새로 로드된 포스트 수 확인
      if (newPosts.length < PAGE_SIZE) {
        setHasMore(false); // 로드된 포스트가 4개 미만이면 더 이상 데이터가 없음
      }

      setPosts(newPosts);

    } catch (err) {
      console.error('게시글을 가져오는 중 에러:', err);
      setError(err.message);
    } finally {
      setLoading(false);
      console.log("initialLoad finish!");
    }
  }

  // 컴포넌트 마운트 시 첫 페이지 로드
  useEffect(() => {
    // 상태 초기화
    setPosts([]);
    setLastVisible(null);
    setHasMore(true);

    // 첫 페이지 로드 (lastVisible이 null인 상태에서 loadNextPage 호출)
    // NOTE: 최초 1회만 호출하도록 수정할 필요가 있습니다.
    // 현재 구현 방식은 조금 복잡해질 수 있으므로, 페이지네이션 전용 로직을 분리하는 것이 좋습니다.
    // 하지만, 간단한 예시를 위해 loadNextPage를 첫 페이지 로드 함수로 사용하겠습니다.
    //const initialLoad = async () => {
    // 최초 로드 시에는 lastVisible이 null이 되도록 초기화 후 loadNextPage 호출
    // 이 로직은 type이 변경될 때만 실행되어야 합니다.
    // await loadNextPage(); 
    //};

    initialLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]); // type이 변경될 때마다 초기화 후 재시작

  return { posts, loading, error, hasMore, loadNextPage }; // loadNextPage를 반환
};