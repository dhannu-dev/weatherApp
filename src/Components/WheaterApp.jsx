import React, { useState } from 'react';

function WeatherApp() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const getData = async () => {
    try {
      if (!city) {
        setError('Please enter a city name');
        setWeather(null);
        return;
      }

      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=136a592d67504fc6baf25622241608&q=${city}&aqi=no`
      );
      const data = await res.json();

      if (data.error) {
        setError(data.error.message);
        setWeather(null);
      } else {
        setWeather(data);
        setError('');
      }

      setCity('');
    } catch (error) {
      console.log(error);
      setError('Something went wrong. Please try again.');
      setWeather(null);
    }
  };

  return (
    <div className="min-h-screen w-full bg-blue-400 flex justify-center items-start p-4">
      <div className="w-full max-w-md flex flex-col gap-5">
      
        {/* Input Section */}
           <h2 className='text-3xl mt-20  text-center font-bold text-blue-900'>Weather App</h2>
        <div className=" flex flex-col sm:flex-row items-center gap-3">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && getData()}
            placeholder="Enter City"
            className="p-2 rounded-md outline-none w-full sm:w-[300px]"
          />
          <button
            onClick={getData}
            className="p-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
          >
            Get Weather
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-700 text-center font-semibold">{error}</p>
        )}

        {/* Weather Info */}
        {weather && (
          <div className="bg-blue-300 p-5 rounded-md shadow-md">
            <h1 className="font-semibold text-blue-800 text-xl text-center border-b-2 border-b-blue-800 pb-2">
              {weather.location.name}, {weather.location.country}
            </h1>
            <div className="mt-3 space-y-2 text-blue-900 text-lg font-semibold">
              <p>🌡️ Temperature: {weather.current.temp_c}°C</p>
              <p>💧 Humidity: {weather.current.humidity}%</p>
              <p className='flex gap-1'> <img height={25} width={25} src={weather.current.condition.icon} /> Condition: {weather.current.condition.text}</p>
              <img
                src={weather.current.condition.icon}
                alt={weather.current.condition.text}
                className="w-20 h-20 mt-2"
              />
              <p className="text-sm text-gray-700">
                Last Updated: {weather.current.last_updated}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherApp;
