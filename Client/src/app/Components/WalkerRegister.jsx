import React, { useState } from 'react';

const WalkerRegister = () => {
  const [formData, setFormData] = useState({
    dog_capacity: 0,
    selectedDays: [],
    start_time: '',
    end_time: '',
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

  const handleDayChange = (e) => {
    const { value, checked } = e.target;

    setFormData((prevFormData) => {
      if (checked) {
        return {
          ...prevFormData,
          selectedDays: [...prevFormData.selectedDays, value],
        };
      } else {
        return {
          ...prevFormData,
          selectedDays: prevFormData.selectedDays.filter((day) => day !== value),
        };
      }
    });
  };

  const validateDateAndTime = () => {
    // Validation logic if needed
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation logic if needed

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
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Días disponibles para pasear perros
          </label>
          <div className="flex">
            <label className="block mr-4">
              <input
                type="checkbox"
                name="monday"
                value="monday"
                checked={formData.selectedDays.includes('monday')}
                onChange={handleDayChange}
              />
              Lunes
            </label>
            <label className="block mr-4">
              <input
                type="checkbox"
                name="tuesday"
                value="tuesday"
                checked={formData.selectedDays.includes('tuesday')}
                onChange={handleDayChange}
              />
              Martes
            </label>
            <label className="block mr-4">
              <input
                type="checkbox"
                name="wednesday"
                value="wednesday"
                checked={formData.selectedDays.includes('wednesday')}
                onChange={handleDayChange}
              />
              Miércoles
            </label>
            <label className="block mr-4">
              <input
                type="checkbox"
                name="thursday"
                value="thursday"
                checked={formData.selectedDays.includes('thursday')}
                onChange={handleDayChange}
              />
              Jueves
            </label>
            <label className="block mr-4">
              <input
                type="checkbox"
                name="friday"
                value="friday"
                checked={formData.selectedDays.includes('friday')}
                onChange={handleDayChange}
              />
              Viernes
            </label>
            <label className="block mr-4">
              <input
                type="checkbox"
                name="saturday"
                value="saturday"
                checked={formData.selectedDays.includes('saturday')}
                onChange={handleDayChange}
              />
              Sábado
            </label>
            <label className="block">
              <input
                type="checkbox"
                name="sunday"
                value="sunday"
                checked={formData.selectedDays.includes('sunday')}
                onChange={handleDayChange}
              />
              Domingo
            </label>
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
