
(function () {
  const books = JSON.parse(localStorage.getItem('books')) || [];
  const collections = JSON.parse(localStorage.getItem('defaultcollections')) || [];

  const readCollection = collections.find(c => c.name === 'read' || c.rusname === 'Прочитанные');
  const booksRead = readCollection ? (Array.isArray(readCollection.books) ? readCollection.books.length : (readCollection.cnt || 0)) : 0;

  const reviewsCount = books.reduce((acc, b) => acc + (b.review && b.review.toString().trim() ? 1 : 0), 0);

  const ratings = books.map(b => parseFloat(b.rating)).filter(r => !Number.isNaN(r));
  const avgRating = ratings.length ? (ratings.reduce((a, c) => a + c, 0) / ratings.length) : 0;

  const booksEl = document.getElementById('books-count');
  const reviewsEl = document.getElementById('reviews-count');
  const avgEl = document.getElementById('avg-rating');

  if (booksEl) booksEl.innerText = booksRead;
  if (reviewsEl) reviewsEl.innerText = reviewsCount;
  if (avgEl) avgEl.innerText = avgRating ? avgRating.toFixed(1) : '0';

})();