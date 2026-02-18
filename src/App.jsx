import { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const API_KEY = "10297e73f154606352266e36863c63fb";

  // Sky blue background
  const getBackground = () => {
    return "#87CEEB";
  };

  // Climate advice for humans
  const getClimateAdvice = () => {
    if (!weather) return "";

    const temp = weather.main.temp;

    if (temp < 15) return "❄️ Too cold outside. Wear warm clothes.";
    if (temp >= 15 && temp <= 30)
      return "✅ Climate is good for outdoor activities.";
    if (temp > 30)
      return "🔥 Very hot outside. Stay hydrated and avoid long exposure.";

    return "";
  };

  // Bird & animal water advice
  const getWaterAdvice = () => {
    if (!weather) return "";

    if (weather.main.temp > 30) {
      return "🐦 Please keep water for birds and animals 💧";
    }
    return "";
  };

  // Fetch weather data
  const getWeather = async () => {
    if (!city) return;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.main) {
        setWeather(data);

        // High temperature popup alert
        if (data.main.temp > 30) {
          alert(
            "⚠️ Very hot temperature! Please keep water for birds and animals 🐦💧"
          );
        }
      } else {
        alert("City not found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: getBackground(),
        fontFamily: "Arial",
      }}
    >
      {/* Heading above card */}
      <h1 style={{ marginBottom: "20px", color: "#0d47a1" }}>
        Welcome to my Weather App
      </h1>

      {/* Eye-friendly card */}
      <div
        style={{
          padding: "40px",
          background: "#e3f2fd",
          borderRadius: "12px",
          textAlign: "center",
          boxShadow: "0 0 15px rgba(0,0,0,0.2)",
        }}
      >
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{ padding: "10px", marginRight: "10px" }}
        />

        <button
          onClick={getWeather}
          style={{
            padding: "10px",
            background: "#1976d2",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Search
        </button>

        {weather && (
          <div style={{ marginTop: "20px" }}>
            <h2>{weather.name}</h2>

            <p>🌡 Current Temp: {weather.main.temp} °C</p>
            <p>🔻 Today Min: {weather.main.temp_min} °C</p>
            <p>🔺 Today Max: {weather.main.temp_max} °C</p>

            <p>🌥 Condition: {weather.weather[0].main}</p>
            <p>💧 Humidity: {weather.main.humidity}%</p>

            {/* Climate advice */}
            <p style={{ fontWeight: "bold", marginTop: "10px" }}>
              {getClimateAdvice()}
            </p>

            {/* Water advice */}
            <p style={{ color: "red", fontWeight: "bold" }}>
              {getWaterAdvice()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
