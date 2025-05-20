# AgriReportApp

**AgriReportApp** is a simple mobile application built with **React Native** that allows users to record and view agricultural reports. The app includes local data storage, weather-based location info, and photo capture functionality.

## Features

* **Home Screen**: One-click access to login (no credentials required).
* **Add Report Screen**:

  * Fill out a form with farm name, crop, fertilizer, soil type, and observation.
  * Fetch current location and weather using an external API.
  * Capture a photo with the device camera.
  * Store the report locally using SQLite.
* **Reports Screen**:

  * Display saved reports with all fields and attached images.

## Tech Stack & Tools

* **React Native**: UI development
* **Expo SQLite**: Local database
* **Expo MediaLibrary & Camera**: Capture and display images
* **Custom Reducers & State Management**: Form handling
* **OpenWeatherMap API**: Get weather and location data

## Installation

```bash
npm install
npx expo start
```

## Note

* This app is for demo/testing purposes.
* API key for weather is hardcoded – replace with your own for production use.

---

Let me know if you want to include screenshots or add Spanish/Quechua versions.
