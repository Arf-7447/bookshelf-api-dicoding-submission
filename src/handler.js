const { nanoid } = require('nanoid');
const booksCollection = require('./books');

const addBookHandler = (request, h) => {
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;

  if (!name) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    }).code(400);
  }

  if (readPage > pageCount) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
  }

  const bookId = nanoid();
  const isFinished = pageCount === readPage;
  const currentDate = new Date().toISOString();

  const newBook = {
    id: bookId,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished: isFinished,
    reading,
    insertedAt: currentDate,
    updatedAt: currentDate,
  };

  booksCollection.push(newBook);

  return h.response({
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    data: {
      bookId,
    },
  }).code(201);
};

const getAllBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query;
  let booksList = booksCollection;

  if (name) {
    booksList = booksList.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
  }

  if (reading !== undefined) {
    booksList = booksList.filter((book) => book.reading === (reading === '1'));
  }

  if (finished !== undefined) {
    booksList = booksList.filter((book) => book.finished === (finished === '1'));
  }

  const filteredBooks = booksList.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));

  return h.response({
    status: 'success',
    data: {
      books: filteredBooks,
    },
  }).code(200);
};

const getBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const book = booksCollection.find((b) => b.id === bookId);

  if (!book) {
    return h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    }).code(404);
  }

  return h.response({
    status: 'success',
    data: {
      book,
    },
  }).code(200);
};

const updateBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;

  if (!name) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    }).code(400);
  }

  if (readPage > pageCount) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
  }

  const bookIndex = booksCollection.findIndex((book) => book.id === bookId);

  if (bookIndex === -1) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    }).code(404);
  }

  const updatedAt = new Date().toISOString();

  booksCollection[bookIndex] = {
    ...booksCollection[bookIndex],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    finished: pageCount === readPage,
    updatedAt,
  };

  return h.response({
    status: 'success',
    message: 'Buku berhasil diperbarui',
  }).code(200);
};

const deleteBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const bookIndex = booksCollection.findIndex((book) => book.id === bookId);

  if (bookIndex === -1) {
    return h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    }).code(404);
  }

  booksCollection.splice(bookIndex, 1);

  return h.response({
    status: 'success',
    message: 'Buku berhasil dihapus',
  }).code(200);
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  updateBookByIdHandler,
  deleteBookByIdHandler,
};
