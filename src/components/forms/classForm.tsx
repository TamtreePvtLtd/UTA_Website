'use client';

import { useState, useEffect } from 'react';

interface ClassData {
  _id?: string;
  name: string;
}

interface ClassProps {
  existingClass?: ClassData;
  onClose: () => void;
  refreshClasses: () => void;
}

export default function ClassForm({ existingClass, onClose, refreshClasses }: ClassProps) {
  const [formData, setFormData] = useState<ClassData>({ name: '' });

  useEffect(() => {
    if (existingClass) {
      setFormData({ name: existingClass.name });
    }
  }, [existingClass]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = existingClass ? 'PUT' : 'POST';
    const endpoint = existingClass
      ? `/api/classes?id=${existingClass._id}`
      : '/api/classes';

    try {
      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Request failed');

      alert(`Class ${existingClass ? 'updated' : 'created'} successfully!`);
      refreshClasses();
      onClose();
    } catch (err) {
      console.error(err);
      alert('Error saving Class');
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        <div className="flex justify-between flex-wrap gap-4">
          <label className="block font-medium">Grade:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            placeholder="Enter Class name"
          />
        </div>

        <div className="flex gap-4 justify-end">
          <button
            type="submit"
            className="bg-primary hover:bg-transparent border border-primary hover:text-primary text-white transition px-6 py-2 rounded-md"
          >
            {existingClass ? 'Update' : 'Create'}
          </button>
          <button
            type="button"
            className="bg-gray-300 hover:bg-transparent border border-gray-400 transition text-black py-2 px-6 rounded-md"
           onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}