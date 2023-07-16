import { api } from '@/redux/api/apiSlice';

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => '/books',
      providesTags: ['books'],
    }),
    singleBook: builder.query({
      query: (id) => `/books/${id}`,
      providesTags: ['book'],
    }),
    postBook: builder.mutation({
      query: ({ data }) => ({
        url: '/books/create-book',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['books'],
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
      invalidatesTags: ['book'],
    }),
    deleteBook: builder.mutation({
      query(id) {
        return {
          url: `books/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['books'],
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
