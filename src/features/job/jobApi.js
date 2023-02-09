import apiSlice from "../api/apiSlice";

const jobApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createJob: builder.mutation({
      query: (data) => ({
        url: "/job",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Jobs"],
    }),
    getJob: builder.query({
      query: () => ({
        url: "/jobs",
      }),
      providesTags: ["Delete", "Jobs"],
    }),
    getJobById: builder.query({
      query: (id) => ({
        url: `/job/${id}`,
      }),
      providesTags: ["Jobs"],
    }),
    getAppliedJob: builder.query({
      query: (email) => ({
        url: `/applied-jobs/${email}`,
      }),
      providesTags: ["Apply", "Jobs"],
    }),
    getPostedJob: builder.query({
      query: (email) => ({
        url: `/posted-jobs/${email}`,
      }),
      providesTags: ["Delete", "Jobs"],
    }),
    deleteJobById: builder.mutation({
      query: (id) => ({
        url: `/job/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Delete"],
    }),
    applyJob: builder.mutation({
      query: (data) => ({
        url: "/apply",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Apply"],
    }),
    askQuestions: builder.mutation({
      query: (data) => ({
        url: "/query",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Jobs"],
    }),
    replyQuestion: builder.mutation({
      query: (data) => ({
        url: "/reply",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Jobs"],
    }),
    toggleStatus: builder.mutation({
      query: (data) => ({
        url: "/status",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Jobs"],
    }),
  }),
});

export const {
  useCreateJobMutation,
  useGetJobQuery,
  useGetJobByIdQuery,
  useDeleteJobByIdMutation,
  useApplyJobMutation,
  useGetAppliedJobQuery,
  useAskQuestionsMutation,
  useReplyQuestionMutation,
  useGetPostedJobQuery,
  useToggleStatusMutation,
} = jobApi;
