'use client'
import { createContext, useContext, useReducer } from 'react';

const initialState = {
  posts: [],
  comments: [],
};

const ADD_POST = 'ADD_POST';
const ADD_COMMENT = 'ADD_COMMENT';

const postReducer = (state, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case ADD_COMMENT:
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            comments: [action.payload.comment, ...post.comments],
          };
        }
        return post;
      });

      return {
        ...state,
        posts: updatedPosts,
      };
    default:
      return state;
  }
};

// Create Context
const PostContext = createContext();

// Provider Component
const PostProvider = ({ children }) => {
  const [state, dispatch] = useReducer(postReducer, initialState);

  const addPost = (post) => {
    dispatch({ type: ADD_POST, payload: post });
  };

  const addComment = (postId, comment) => {
    dispatch({ type: ADD_COMMENT, payload: { postId, comment } });
  };

  return (
    <PostContext.Provider value={{ state, addPost, addComment }}>
      {children}
    </PostContext.Provider>
  );
};

// Custom Hook for using the Context
const usePostContext = () => {
  return useContext(PostContext);
};

export { PostProvider, usePostContext };
