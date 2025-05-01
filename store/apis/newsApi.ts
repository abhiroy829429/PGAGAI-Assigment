import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/news" }),
  endpoints: (builder) => ({
    getNewsByCategory: builder.query({
      query: (category) => `?category=${category}`,
    }),
  }),
})

export const { useGetNewsByCategoryQuery } = newsApi
