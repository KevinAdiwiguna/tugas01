'use client'
import { CreateCategory } from '@/app/services/books/category/category';
import React, { useState, ChangeEvent, useEffect } from 'react';

interface CreateModalProps {
  setModalCreate: React.Dispatch<React.SetStateAction<boolean>>;
  modalCreate: boolean;
}

export const CreateModal: React.FC<CreateModalProps> = ({ modalCreate, setModalCreate }) => {
  const maxInputCount = 5;

  const [values, setValues] = useState<string[]>(['']);

  const addInput = () => {
    if (values.length < maxInputCount) {
      setValues((prevValues) => [...prevValues, '']);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    setValues((prevValues) => {
      const updatedValues = [...prevValues];
      updatedValues[index] = e.target.value;
      return updatedValues;
    });
  };

  const deleteInput = (index: number) => {
    setValues((prevValues) => {
      const updatedValues = [...prevValues];
      updatedValues.splice(index, 1);
      return updatedValues;
    });
  };

  useEffect(() => {
    if (values.length === 0) {
      setValues(['']);
    }
  }, []);

  const handleSave = async () => {
    try {
      const b = values.map(item => ({
        NamaKategori: item
      }));
      await CreateCategory(b)

    } catch (error) {
      console.error('Error saving data:', error);
    }
  }

  return (
    <div className='bg-[#22222260] fixed h-screen w-full top-0 left-0 right-0 flex justify-center items-center'>
      <div className='bg-white p-4 rounded-lg'>
        <button onClick={addInput} className='font-semibold text-white bg-green-300 p-2 rounded-lg mb-4' disabled={values.length >= maxInputCount}>
          Add New
        </button>

        <div className='flex flex-col gap-4'>
          {values.map((value, index) => (
            <div key={index} className='flex flex-col text-sm'>
              <label>Book Category {index + 1}</label>
              <div className='flex flex-nowrap gap-1 justify-center items-center'>
                <input
                  onChange={(e) => handleChange(e, index)}
                  value={value}
                  className='border-black p-2 border rounded-lg'
                />
                <button
                  className='bg-red-500 py-3 px-4 rounded-lg text-white font-bold'
                  onClick={() => deleteInput(index)}
                >
                  X
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className='mt-2 flex gap-2 flex-nowrap'>
          <button onClick={() => setModalCreate(false)} className='bg-red-500 p-4 rounded-lg w-fit text-white font-semibold'>
            Close Modal
          </button>
          <button onClick={() => handleSave()} className='bg-green-500 p-4 rounded-lg w-fit text-white font-semibold'>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
