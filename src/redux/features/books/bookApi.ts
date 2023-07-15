import { api } from '@/redux/api/apiSlice';

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => '/books',
    }),
    singleBook: builder.query({
      query: (id) => `/books/${id}`,
    }),
    postBook: builder.mutation({
      query: ({ data }) => ({
        url: 'books/create-book',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['createBook'],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useSingleBookQuery,
  usePostBookMutation,
} = bookApi;
