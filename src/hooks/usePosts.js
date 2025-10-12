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
        
        // type에 따라 컬렉션 결정
        let postsCollection;
        if (type === "QA") {
          postsCollection = collection(firestoreDB, 'questions');
        } else {
          postsCollection = collection(firestoreDB, 'generals');
        }
        
        const q = query(
          postsCollection,
          orderBy('createdAt', 'desc') // 최신 글부터 정렬
        );
        
        const querySnapshot = await getDocs(q);
        const allPosts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setPosts(allPosts);
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