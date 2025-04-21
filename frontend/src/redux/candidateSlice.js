import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const candidateApi = createApi({
  reducerPath: 'candidateApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Candidates'], // 
  endpoints: (builder) => ({
    getCandidates: builder.query({
      query: () => '/candidates',
      providesTags: ['Candidates'], 
    }),
    createCandidate: builder.mutation({
      query: (formData) => ({
        url: '/candidates',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Candidates'], 
    }),
    updateCandidates: builder.mutation({
      query: (candidate) => ({
        url: `/candidates/${candidate._id}`,
        method: 'PUT',
        body: candidate,
      }),
      invalidatesTags: ['Candidates'], 
    }),
    deleteCandidate: builder.mutation({
      query: (id) => ({
        url: `/candidates/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Candidates'], 
    }),
    voteCandidate: builder.mutation({
      query: (candidateId) => ({
        url: `candidates/vote/${candidateId}`,
        method: 'PUT',
      }),
      invalidatesTags: ['Candidates'], 
    }),
  }),
});

export const {
  useGetCandidatesQuery,
  useCreateCandidateMutation,
  useDeleteCandidateMutation,
  useUpdateCandidatesMutation,
  useVoteCandidateMutation,
} = candidateApi;
