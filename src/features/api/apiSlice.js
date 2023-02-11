import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["Delete", "Jobs", "Apply"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jobbox-server-two.vercel.app",
  }),
  endpoints: (builder) => ({}),
});

export default apiSlice;
