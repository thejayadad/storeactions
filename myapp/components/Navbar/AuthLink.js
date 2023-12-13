'use client'
import React, { useState } from 'react'
import Link from "next/link";
import { FiUser } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import {signIn, signOut, useSession} from 'next-auth/react'
import Modal from '../modals';
import ProductFormModal from '../ProductModal';

const AuthLinks = () => {
    const { data: session } = useSession();

  return (
    <div className='flex items-center'>
       {
        session ? (
            <div className='flex space-x-6'>
           <ProductFormModal />
             {session.user.email} <br />
            <button onClick={() => signOut()}>Sign out</button> 
            
            </div>
        ) : (
            <>
            <button onClick={() => signIn()}>Sign in</button>

            </>
        )
       } 
    </div>
  )
}

export default AuthLinks