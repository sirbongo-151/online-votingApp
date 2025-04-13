import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const candidateApi = createApi({
  reducerPath: 'candidateApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getCandidates: builder.query({
      query: () => '/candidates',
    }),
    createCandidate:builder.mutation({
      query: (candidate) => ({
        url: '/candidates',
        method: 'POST',
        body: candidate,
        headers: { 'Content-Type': 'application/json' },
      }),
    }),
    updateCandidates: builder.mutation({
      query: (candidate) => ({
        url: `/candidates/${candidate._id}`,
        method: 'PUT',
        body: candidate,
        headers: { 'Content-Type': 'application/json' },
      }),
    }),
    deleteCandidate: builder.mutation({
      query: (id) => ({
        url: `/candidates/${id}`,
        method: 'DELETE',
      }),
    }),
    
    voteCandidate: builder.mutation({
      query: (candidateId) => ({
        url: `candidates/vote/${candidateId}`,
        method: 'PUT',
      }),
    }),
  
  }),
});

export const { useGetCandidatesQuery, useCreateCandidateMutation, useDeleteCandidateMutation,useUpdateCandidatesMutation,useVoteCandidateMutation } = candidateApi;
