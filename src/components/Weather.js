import React, { useState } from 'react';
import axios from 'axios';
import './Weather.css';

function Weather() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);

    const fetchWeather = async () => {
        try {
            // Fetch current weather in Fahrenheit
            const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
                params: {
                    q: city,
                    appid: process.env.REACT_APP_WEATHER_API_KEY,
                    units: 'imperial' // Use 'imperial' for Fahrenheit
                }
            });
            setWeather(response.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching data:', err.response ? err.response.data : err.message);
            setError('Error fetching weather data');
            setWeather(null);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchWeather();
    };

    const getCurrentDateTime = () => {
        const now = new Date();
        return now.toLocaleString();
    };

    return (
        <div className="weather-container">
            <h1>Weather App</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city"
                />
                <button type="submit">Get Weather</button>
            </form>
            {error && <p className="error">{error}</p>}
            {weather && (
                <div>
                    <p>{getCurrentDateTime()}</p>
                    <h2>Weather in {weather.name}</h2>
                    <p>Temperature: {weather.main.temp}°F</p> {/* Updated to Fahrenheit */}
                    <p>Condition: {weather.weather[0].description}</p>
                </div>
            )}
        </div>
    );
}

export default Weather;
