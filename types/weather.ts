export interface WeatherData {
  main: {
    temp: number
    feels_like: number
    humidity: number
    pressure: number
  }
  weather: {
    main: string
    description: string
  }[]
  wind: {
    speed: number
  }
  name: string
}

export interface ForecastData {
  dt: number
  temp: {
    day: number
    min: number
    max: number
  }
  weather: {
    main: string
    description: string
  }[]
}
