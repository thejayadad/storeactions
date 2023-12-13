'use client'
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSession } from 'next-auth/react';
import { usePostContext } from '@/lib/PostContext';

const ProductForm = () => {
  const [text, setText] = useState('');
  const [tag, setTag] = useState('');
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const { addPost } = usePostContext();

  const handleCreatePost = async () => {
    try {
      setIsCreatingPost(true);
      const response = await fetch('/api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          creator: session.user.id,
          text,
          tag,
        }),
      });
  
      if (response.ok) {
        const newPost = await response.json();
        addPost(newPost);
        toast.success('Post created successfully');
  
        // Reset form fields
        setText('');
        setTag('');
      } else {
        toast.error('Failed to create post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('An error occurred');
    } finally {
      setIsCreatingPost(false);
    }
  };
  

  useEffect(() => {
    if (router && router.events) {
      const handleRouteChange = () => {
        setIsCreatingPost(true);
      };

      const handleRouteComplete = () => {
        setIsCreatingPost(false);
      };

      router.events.on('routeChangeStart', handleRouteChange);
      router.events.on('routeChangeComplete', handleRouteComplete);

      return () => {
        router.events.off('routeChangeStart', handleRouteChange);
        router.events.off('routeChangeComplete', handleRouteComplete);
      };
    }
  }, [router]);

  if (status === 'loading' || isCreatingPost) {
    return (
      <p className='border-8 border-red-400 border-t-cyan-500 h-10 w-10 rounded-3xl animate-spin'></p>
    );
  }

  if (status === 'unauthenticated') {
    return <p className='text-center'>Access Denied</p>;
  }

  return (
    <section>
      <h2 className='text-center'>New Product</h2>
      <form>
        <label>
          Text:
          <input type='text' value={text} onChange={(e) => setText(e.target.value)} />
        </label>
        <br />
        <label>
          Tag:
          <input type='text' value={tag} onChange={(e) => setTag(e.target.value)} />
        </label>
        <br />
        <button type='button' onClick={handleCreatePost}>
          Create Post
        </button>
      </form>
      <ToastContainer />
    </section>
  );
};

export default ProductForm;
