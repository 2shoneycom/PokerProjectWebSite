import { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc, arrayUnion, Timestamp } from 'firebase/firestore';
import { firestoreDB } from '../utilities/firebase';

// New function to handle the database write operation
const addCommentToFirestore = async (postId, type, commentData) => {
    const collectionName = type === "QA" ? 'questions' : 'generals';
    const postRef = doc(firestoreDB, collectionName, postId);

    // Use arrayUnion to safely add the new comment to the 'comments' array
    await updateDoc(postRef, {
        comments: arrayUnion(commentData)
    });
};

export const usePost = (postId, type) => {
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

        let postRef;
        // Determine the collection based on 'type'
        const collectionName = type === "QA" ? 'questions' : 'generals';
        postRef = doc(firestoreDB, collectionName, postId);

        const postSnap = await getDoc(postRef);
        
        if (postSnap.exists()) {
          setPost({
            id: postSnap.id,
            // Ensure comments exist as an array for safe use in the component
            comments: [], 
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
  }, [postId, type]); // Added 'type' to dependency array

  // Return setPost and the new database function
  return { 
      post, 
      loading, 
      error, 
      setPost, // **1. Return setPost for local UI updates**
      addCommentToFirestore // **2. Return Firestore write function**
  };
};