const createBook = async (db, bookData) => {
  const book = await db.collection('books').findOne({name: bookData.name});

  if (!book) {
    const author = await db.collection('authors').findOne({name: bookData.author});

    let authorId;
    let authorName;
    if (!author) {
      const newAuthor = await db.collection('authors').insertOne({name: bookData.author, books: []});
      authorId = newAuthor.insertedId;
      authorName = bookData.author;
    } else {
      authorId = author._id;
      authorName = author.name;
    }
    bookData.author = authorName;
    bookData.authorId = authorId;
    bookData.createdOn = new Date();

    const newBook = await db.collection('books').insertOne(bookData);
    await db
      .collection('authors')
      .updateOne(
        {_id: authorId},
        {$push: {books: {bookId: newBook.insertedId, bookName: bookData.name}}},
        {upsert: true}
      );
    return newBook;
  }
  return null;
};

const getBooks = async db => {
  const books = await db.collection('books').find({}).sort({createdOn: -1}).toArray();
  return books;
};

const getAuthors = async db => {
  const authors = await db.collection('authors').find({}).sort({name: 1}).toArray();
  return authors;
};

export {createBook, getBooks, getAuthors};
