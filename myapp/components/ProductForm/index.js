'use client'
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSession } from 'next-auth/react';
import { usePostContext } from '@/lib/PostContext';

const CarForm = () => {
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [photos, setPhotos] = useState([]);
  const [desc, setDesc] = useState('');
  const [extraInfo, setExtraInfo] = useState('');
  const [pickUp, setPickUp] = useState(0);
  const [dropOff, setDropOff] = useState(0);
  const [carSeats, setCarSeats] = useState(0);
  const [price, setPrice] = useState(0);
  const [isCreatingCar, setIsCreatingCar] = useState(false);

  const { data: session, status } = useSession();
  const router = useRouter();
  const { addPost } = usePostContext();

  const handleCreateCar = async () => {
    try {
      setIsCreatingCar(true);

      const response = await fetch('/api/car', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          creator: session.user.id,
          title,
          address,
          photos,
          desc,
          extraInfo,
          pickUp,
          dropOff,
          carSeats,
          price,
        }),
      });

      if (response.ok) {
        const newCar = await response.json();
        addPost(newCar);
        toast.success('Car created successfully');

        // Reset form fields
        setTitle('');
        setAddress('');
        setPhotos([]);
        setDesc('');
        setExtraInfo('');
        setPickUp(0);
        setDropOff(0);
        setCarSeats(0);
        setPrice(0);
      } else {
        toast.error('Failed to create car');
      }
    } catch (error) {
      console.error('Error creating car:', error);
      toast.error('An error occurred');
    } finally {
      setIsCreatingCar(false);
    }
  };

  useEffect(() => {
    if (router && router.events) {
      const handleRouteChange = () => {
        setIsCreatingCar(true);
      };

      const handleRouteComplete = () => {
        setIsCreatingCar(false);
      };

      router.events.on('routeChangeStart', handleRouteChange);
      router.events.on('routeChangeComplete', handleRouteComplete);

      return () => {
        router.events.off('routeChangeStart', handleRouteChange);
        router.events.off('routeChangeComplete', handleRouteComplete);
      };
    }
  }, [router]);

  if (status === 'loading' || isCreatingCar) {
    return (
      <p className='border-8 border-red-400 border-t-cyan-500 h-10 w-10 rounded-3xl animate-spin'></p>
    );
  }

  if (status === 'unauthenticated') {
    return <p className='text-center'>Access Denied</p>;
  }

  return (
    <section>
      <h2 className='text-center'>New Car</h2>
      <form>
        <label>
          Title:
          <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <br />
        <label>
          Address:
          <input type='text' value={address} onChange={(e) => setAddress(e.target.value)} />
        </label>
        <br />
        <label>
          Description:
          <textarea value={desc} onChange={(e) => setDesc(e.target.value)} />
        </label>
        <br />
        <label>
          Extra Info:
          <textarea value={extraInfo} onChange={(e) => setExtraInfo(e.target.value)} />
        </label>
        <br />
        <label>
          Pick Up:
          <input type='number' value={pickUp} onChange={(e) => setPickUp(Number(e.target.value))} />
        </label>
        <br />
        <label>
          Drop Off:
          <input type='number' value={dropOff} onChange={(e) => setDropOff(Number(e.target.value))} />
        </label>
        <br />
        <label>
          Car Seats:
          <input type='number' value={carSeats} onChange={(e) => setCarSeats(Number(e.target.value))} />
        </label>
        <br />
        <label>
          Price:
          <input type='number' value={price} onChange={(e) => setPrice(Number(e.target.value))} />
        </label>
        <br />
        <button type='button' onClick={handleCreateCar}>
          Create Car
        </button>
      </form>
      <ToastContainer />
    </section>
  );
};

export default CarForm;
