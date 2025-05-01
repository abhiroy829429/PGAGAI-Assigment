import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/weather" }),
  endpoints: (builder) => ({
    getCurrentWeather: builder.query({
      query: (city) => `current?city=${city}`,
    }),
    getForecast: builder.query({
      query: (city) => `forecast?city=${city}`,
    }),
  }),
})

export const { useGetCurrentWeatherQuery, useGetForecastQuery } = weatherApi
