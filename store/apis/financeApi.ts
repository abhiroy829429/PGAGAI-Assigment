import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const financeApi = createApi({
  reducerPath: "financeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/finance" }),
  endpoints: (builder) => ({
    getStockData: builder.query({
      query: (symbol) => `stock?symbol=${symbol}`,
    }),
    getStockTimeSeries: builder.query({
      query: ({ symbol, timeRange }) => `timeseries?symbol=${symbol}&range=${timeRange}`,
    }),
  }),
})

export const { useGetStockDataQuery, useGetStockTimeSeriesQuery } = financeApi
