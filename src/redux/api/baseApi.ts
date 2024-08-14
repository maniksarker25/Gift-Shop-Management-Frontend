import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { RootState } from "../store";

import { createApi } from "@reduxjs/toolkit/query/react";
// some changes =-----------------------
const baseQuery = fetchBaseQuery({
  baseUrl: "https://gift-shop-server-dusky.vercel.app/api",

  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState)?.auth?.token;
    if (token) {
      headers.set("Authorization", token);
    }
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  tagTypes: ["gift", "sale", "coupon", "meta"],
  endpoints: () => ({}),
});
