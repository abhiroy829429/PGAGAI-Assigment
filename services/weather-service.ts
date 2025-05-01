import type { WeatherData, ForecastData } from "@/types/weather"

// Mock data for development
const mockWeatherData: WeatherData = {
  main: {
    temp: 22.5,
    feels_like: 23.2,
    humidity: 65,
    pressure: 1012,
  },
  weather: [
    {
      main: "Clouds",
      description: "scattered clouds",
    },
  ],
  wind: {
    speed: 3.5,
  },
  name: "New York",
}

const mockForecastData: ForecastData[] = [
  {
    dt: Math.floor(Date.now() / 1000),
    temp: {
      day: 22.5,
      min: 18.2,
      max: 25.7,
    },
    weather: [
      {
        main: "Clouds",
        description: "scattered clouds",
      },
    ],
  },
  {
    dt: Math.floor(Date.now() / 1000) + 86400,
    temp: {
      day: 23.1,
      min: 19.5,
      max: 26.2,
    },
    weather: [
      {
        main: "Clear",
        description: "clear sky",
      },
    ],
  },
  {
    dt: Math.floor(Date.now() / 1000) + 86400 * 2,
    temp: {
      day: 21.8,
      min: 17.9,
      max: 24.5,
    },
    weather: [
      {
        main: "Rain",
        description: "light rain",
      },
    ],
  },
  {
    dt: Math.floor(Date.now() / 1000) + 86400 * 3,
    temp: {
      day: 20.5,
      min: 16.8,
      max: 23.2,
    },
    weather: [
      {
        main: "Clouds",
        description: "broken clouds",
      },
    ],
  },
  {
    dt: Math.floor(Date.now() / 1000) + 86400 * 4,
    temp: {
      day: 19.2,
      min: 15.5,
      max: 22.1,
    },
    weather: [
      {
        main: "Rain",
        description: "moderate rain",
      },
    ],
  },
  {
    dt: Math.floor(Date.now() / 1000) + 86400 * 5,
    temp: {
      day: 21.3,
      min: 17.2,
      max: 24.8,
    },
    weather: [
      {
        main: "Clouds",
        description: "few clouds",
      },
    ],
  },
  {
    dt: Math.floor(Date.now() / 1000) + 86400 * 6,
    temp: {
      day: 22.7,
      min: 18.9,
      max: 25.9,
    },
    weather: [
      {
        main: "Clear",
        description: "clear sky",
      },
    ],
  },
]

export async function fetchWeatherData(city: string): Promise<WeatherData> {
  try {
    // In a real application, you would fetch from the OpenWeatherMap API
    // const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
    // const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
    // return await response.json();

    // For now, return mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ...mockWeatherData,
          name: city,
        })
      }, 500)
    })
  } catch (error) {
    console.error("Error fetching weather data:", error)
    return {
      ...mockWeatherData,
      name: city,
    }
  }
}

export async function fetchForecastData(city: string): Promise<ForecastData[]> {
  try {
    // In a real application, you would fetch from the OpenWeatherMap API
    // const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
    // const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&units=metric&cnt=7&appid=${apiKey}`);
    // const data = await response.json();
    // return data.list;

    // For now, return mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockForecastData)
      }, 500)
    })
  } catch (error) {
    console.error("Error fetching forecast data:", error)
    return mockForecastData
  }
}
