'use client'
import React, { useState } from 'react';
import Modal from '../modals';
import ProductForm from '../ProductForm';

const ProductFormModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>New Product</button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ProductForm />
      </Modal>
    </div>
  );
};

export default ProductFormModal;
