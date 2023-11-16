import React, { useState } from 'react';

const WalkerRegister = () => {
  const [formData, setFormData] = useState({
    dog_capacity: 0,
    start_time: '',
    end_time: '',
    start_date: '',
    end_date: '',
    days_available: [],
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? parseInt(value) : value,
    });
  };

  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    validateDateAndTime();
  };

  const handleDaysChange = (e) => {
    const { options } = e.target;
    const selectedDays = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);

    setFormData({
      ...formData,
      days_available: selectedDays,
    });
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    validateDateAndTime();
  };

  const validateDateAndTime = () => {
    if (!isStartDateBeforeEndDate()) {
      setError('La fecha de inicio y hora no puede ser posterior a la fecha de finalización y hora.');
    } else {
      setError('');
    }
  };

  const isStartDateBeforeEndDate = () => {
    const startDate = new Date(formData.start_date + 'T' + formData.start_time);
    const endDate = new Date(formData.end_date + 'T' + formData.end_time);
    return startDate < endDate;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isStartDateBeforeEndDate()) {
      setError('La fecha de inicio y hora no puede ser posterior a la fecha de finalización y hora.');
      return;
    }

    // reset error state
    setError('');

    // ready to send to the backend
    console.log(formData);
  };
  return (
    <div className="container mx-auto my-10 max-w-lg">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dog_capacity">
            Capacidad de perros (¿Cuántos perros puedes pasear a la vez?)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="dog_capacity"
            type="number"
            name="dog_capacity"
            value={formData.dog_capacity}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hours_range">
            Horario disponible (¿A qué horas estás disponible para pasear perros?)
          </label>
          <div className="flex">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="start_time"
              type="time"
              name="start_time"
              value={formData.start_time}
              onChange={handleTimeChange}
            />
            <span className="mx-2">to</span>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="end_time"
              type="time"
              name="end_time"
              value={formData.end_time}
              onChange={handleTimeChange}
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date_range">
            Rango de fechas disponible (¿Qué días estás disponible para pasear perros?)
          </label>
          <div className="flex">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="start_date"
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleDateChange}
            />
            <span className="mx-2">to</span>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="end_date"
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleDateChange}
            />
          </div>
        </div>

        {/* Display error message if validation fails */}
        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Registrarse
          </button>
        </div>
      </form>
    </div>
  );
};

export default WalkerRegister;
