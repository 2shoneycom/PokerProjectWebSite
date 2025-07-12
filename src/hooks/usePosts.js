import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { firestoreDB } from '../utilities/firebase';

export const usePosts = (type) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // posts 컬렉션에서 모든 데이터 가져오기
        const postsCollection = collection(firestoreDB, 'posts');
        const q = query(
          postsCollection,
          orderBy('createdAt', 'desc') // 최신 글부터 정렬
        );
        
        const querySnapshot = await getDocs(q);
        const allPosts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        // 클라이언트 사이드에서 type별로 필터링
        // type이 없는 경우 모든 게시글 반환
        let filteredPosts = allPosts;
        if (type) {
          // URL의 type 파라미터에 따라 필터링 (QA 또는 GD)
          // 실제로는 게시글 구분 로직을 추가해야 할 수 있음
          filteredPosts = allPosts; // 현재는 모든 게시글 표시
        }
        
        setPosts(filteredPosts);
      } catch (err) {
        console.error('게시글을 가져오는 중 에러:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [type]);

  return { posts, loading, error };
};