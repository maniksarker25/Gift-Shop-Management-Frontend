import { baseApi } from "../../api/baseApi";

const metaApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMetaData: builder.query({
      query: () => {
        return {
          url: `/meta`,
          method: "GET",
        };
      },
      providesTags: ["meta"],
    }),
    getManagerLineChartData: builder.query({
      query: (range) => {
        return {
          url: `/meta/line-chart-manager?range=${range}`,
          method: "GET",
        };
      },
      providesTags: ["meta"],
    }),
  }),
});

export const { useGetMetaDataQuery, useGetManagerLineChartDataQuery } = metaApi;
