# 📱 ReportApp

**ReportApp** is a mobile application built with **React Native** that allows users to record and view custom reports. It features local data storage, photo capture, and weather-based location information.

> 🚀 This project is part of my journey to become a **software developer**. I'm building practical tools to learn modern technologies and apply them to real-world scenarios.

## ✨ Features

* 🏠 **Home Screen**

  * Quick access to enter the app (no login credentials needed).

* 📝 **Add Report Screen**

  * Fill out a custom report form with various inputs.
  * 📍 Get your current location and 🌤️ weather data via an API.
  * 📸 Take a photo using the device camera.
  * 💾 Store the report locally using SQLite.

* 📚 **Reports Screen**

  * View previously saved reports with all fields and attached images.

## 🛠 Tech Stack & Tools Used

* ⚛️ **React Native (Expo)** – UI & navigation
* 🗄️ **SQLite (via Expo SQLite)** – Local data storage
* 📷 **Expo Camera & MediaLibrary** – Capture and access images
* 🌐 **OpenWeatherMap API** – Fetch live weather and location info

## 🧪 Installation

```bash
npm install
npx expo start
```

## ⚠️ Note

* This is a **learning project**, mainly for testing and development.
* 🌐 The weather API key is hardcoded — remember to replace it with your own in production!
