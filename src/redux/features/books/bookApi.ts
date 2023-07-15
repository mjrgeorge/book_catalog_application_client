import { api } from '@/redux/api/apiSlice';

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => '/books',
      providesTags: ['createBook'],
    }),
    singleBook: builder.query({
      query: (id) => `/books/${id}`,
    }),
    postBook: builder.mutation({
      query: ({ data }) => ({
        url: '/books/create-book',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['createBook'],
    }),
    updateBook: builder.mutation({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `/books/${id}`,
          method: 'PATCH',
          body,
        };
      },
    }),
    deleteBook: builder.mutation({
      query(id) {
        return {
          url: `books/${id}`,
          method: 'DELETE',
        };
      },
    }),
  }),
});

export const {
  useGetBooksQuery,
  useSingleBookQuery,
  usePostBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = bookApi;
