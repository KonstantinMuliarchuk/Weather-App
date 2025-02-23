# 🌦️ Simple Weather App

A **React Native** application that provides real-time weather updates using the **WeatherAPI** service.

---

## 🚀 Features

- 🌡️ Displays current temperature
- 🌤️ Shows weather conditions with icons
- 📍 Search for cities with autocomplete
- 📊 Uses a free weather API for real-time data

---

## 🛠️ Technologies Used

- **React Native** (Latest Version)
- **TypeScript**
- **WeatherAPI** (https://www.weatherapi.com/)

---

## 🔗 APIs Used

### **1. WeatherAPI** ([weatherapi.com](https://www.weatherapi.com/))

- Provides real-time weather data
- Example API Call:
  ```sh
  https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=London
  ```
- Example Response:
  ```json
  {
    "current": {
      "temp_c": 15,
      "condition": {
        "text": "Partly cloudy",
        "icon": "//cdn.weatherapi.com/weather/64x64/day/116.png",
        "code": 1003
      }
    }
  }
  ```

### **2. City Autocomplete API**

- Provides city name suggestions based on user input
- Example API Call:
  ```sh
  https://api.weatherapi.com/v1/search.json?key=YOUR_API_KEY&q=Lon
  ```
- Example Response:
  ```json
  [
    {
      "id": 1,
      "name": "London",
      "region": "City of London, Greater London",
      "country": "United Kingdom"
    }
  ]
  ```

---

## 📖 How It Works

1. **User enters a city name** → The app fetches city suggestions from the autocomplete API.
2. **User selects a city** → The app fetches real-time weather data from WeatherAPI.
3. **Data is displayed** → The app shows temperature, conditions, and an icon representing the weather.

---

## 🛠️ Installation & Setup

### **1️⃣ Clone the Repository**

```sh
git clone https://github.com/your-username/weather-app.git
cd weather-app
```

### **2️⃣ Install Dependencies**

```sh
npm install
```

### **3️⃣ Run the App**

For iOS:

```sh
npx pod-install
npx react-native run-ios
```

For Android:

```sh
npx react-native run-android
```

---

## 📸 Screenshots (Optional)

_Add some app screenshots here_

---

## 📜 License

This project is licensed under the MIT License.

---

## 📩 Contact

For any issues or suggestions, feel free to reach out!

**Author:** Konstantin Muliarchuk  
📧 Email: konstantin.muliarchuk@gmail.com
