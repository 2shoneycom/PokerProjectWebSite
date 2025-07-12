import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { firestoreDB } from '../utilities/firebase';

export const usePost = (postId) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!postId) {
          throw new Error('게시글 ID가 필요합니다.');
        }

        const postRef = doc(firestoreDB, 'posts', postId);
        const postSnap = await getDoc(postRef);
        
        if (postSnap.exists()) {
          setPost({
            id: postSnap.id,
            ...postSnap.data()
          });
        } else {
          throw new Error('게시글을 찾을 수 없습니다.');
        }
      } catch (err) {
        console.error('게시글을 가져오는 중 에러:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  return { post, loading, error };
};