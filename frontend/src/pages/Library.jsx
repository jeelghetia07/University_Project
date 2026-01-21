import { useState } from 'react';
import { Book, Search, Filter, Download, Clock, CheckCircle, X, BookOpen } from 'lucide-react';
import { libraryBooks } from '../data/mockData';

const Library = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBook, setSelectedBook] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [borrowedBooks, setBorrowedBooks] = useState([
    {
      id: 1,
      title: "Data Structures and Algorithms",
      author: "Mark Allen Weiss",
      issueDate: "2025-01-10",
      returnDate: "2025-02-10",
      status: "Active"
    }
  ]);

  // Get unique categories
  const categories = ['All', ...new Set(libraryBooks.map(book => book.category))];

  // Filter books
  const filteredBooks = libraryBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.isbn.includes(searchTerm);
    const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const openBookDetails = (book) => {
    setSelectedBook(book);
    setShowDetailsModal(true);
  };

  const handleDownload = (book) => {
    // Backend API call will go here
    alert(`Downloading: ${book.title}`);
  };

  const handleRequest = (book) => {
    // Backend API call will go here
    alert(`Request submitted for: ${book.title}`);
  };

  const handleRenew = (bookId) => {
    // Backend API call will go here
    alert('Book renewed for 15 more days!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">University Library</h1>
        <p className="text-amber-100">Access books, journals, and digital resources</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-amber-600" />
            </div>
            <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
              Total
            </span>
          </div>
          <h3 className="text-2xl font-bold text-slate-900">{libraryBooks.length}</h3>
          <p className="text-sm text-slate-600 mt-1">Books Available</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
              Active
            </span>
          </div>
          <h3 className="text-2xl font-bold text-slate-900">{borrowedBooks.length}</h3>
          <p className="text-sm text-slate-600 mt-1">Books Borrowed</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Download className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
              Digital
            </span>
          </div>
          <h3 className="text-2xl font-bold text-slate-900">
            {libraryBooks.filter(b => b.type === 'E-Book' || b.type === 'PDF').length}
          </h3>
          <p className="text-sm text-slate-600 mt-1">E-Resources</p>
        </div>
      </div>

      {/* My Borrowed Books */}
      {borrowedBooks.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">My Borrowed Books</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {borrowedBooks.map(book => (
              <div key={book.id} className="border border-slate-200 rounded-lg p-4 bg-gradient-to-br from-amber-50 to-orange-50">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900">{book.title}</h3>
                    <p className="text-sm text-slate-600">{book.author}</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-semibold">
                    {book.status}
                  </span>
                </div>
                <div className="space-y-2 text-sm mb-3">
                  <div className="flex justify-between text-slate-600">
                    <span>Issue Date:</span>
                    <span className="font-medium text-slate-900">
                      {new Date(book.issueDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Return Date:</span>
                    <span className="font-medium text-slate-900">
                      {new Date(book.returnDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleRenew(book.id)}
                  className="w-full py-2 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition-all"
                >
                  Renew Book
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by title, author, or ISBN..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none appearance-none bg-white"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Available Books */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-6">
          Available Books ({filteredBooks.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map(book => (
            <div
              key={book.id}
              className="border border-slate-200 rounded-xl p-5 hover:shadow-lg transition-all cursor-pointer"
              onClick={() => openBookDetails(book)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Book className="w-6 h-6 text-amber-600" />
                </div>
                <div className="flex flex-col items-end space-y-1">
                  <span className={`px-2 py-1 text-xs rounded-full font-semibold ${
                    book.available
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {book.available ? 'Available' : 'Issued'}
                  </span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-semibold">
                    {book.type}
                  </span>
                </div>
              </div>

              <h3 className="font-bold text-slate-900 mb-2 line-clamp-2">{book.title}</h3>
              <p className="text-sm text-slate-600 mb-1">{book.author}</p>
              <p className="text-xs text-slate-500 mb-4">ISBN: {book.isbn}</p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (book.type === 'E-Book' || book.type === 'PDF') {
                    handleDownload(book);
                  } else {
                    handleRequest(book);
                  }
                }}
                disabled={!book.available && book.type === 'Physical'}
                className={`w-full py-2 rounded-lg font-semibold transition-all ${
                  book.type === 'E-Book' || book.type === 'PDF'
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : book.available
                    ? 'bg-amber-600 text-white hover:bg-amber-700'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                {book.type === 'E-Book' || book.type === 'PDF' ? 'Download' : book.available ? 'Request Book' : 'Not Available'}
              </button>
            </div>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-slate-300" />
            <p className="text-lg">No books found</p>
            <p className="text-sm">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Book Details Modal */}
      {showDetailsModal && selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-6 text-white rounded-t-2xl">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{selectedBook.title}</h2>
                  <p className="text-amber-100">{selectedBook.author}</p>
                </div>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-white hover:bg-white/20 rounded-lg p-2 transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-sm text-slate-600 mb-1">ISBN</p>
                  <p className="font-semibold text-slate-900">{selectedBook.isbn}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-sm text-slate-600 mb-1">Category</p>
                  <p className="font-semibold text-slate-900">{selectedBook.category}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-sm text-slate-600 mb-1">Type</p>
                  <p className="font-semibold text-slate-900">{selectedBook.type}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-sm text-slate-600 mb-1">Status</p>
                  <p className={`font-semibold ${selectedBook.available ? 'text-green-600' : 'text-red-600'}`}>
                    {selectedBook.available ? 'Available' : 'Issued'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  if (selectedBook.type === 'E-Book' || selectedBook.type === 'PDF') {
                    handleDownload(selectedBook);
                  } else {
                    handleRequest(selectedBook);
                  }
                  setShowDetailsModal(false);
                }}
                disabled={!selectedBook.available && selectedBook.type === 'Physical'}
                className={`w-full py-3 rounded-lg font-semibold transition-all ${
                  selectedBook.type === 'E-Book' || selectedBook.type === 'PDF'
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : selectedBook.available
                    ? 'bg-amber-600 text-white hover:bg-amber-700'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                {selectedBook.type === 'E-Book' || selectedBook.type === 'PDF' 
                  ? 'Download Now' 
                  : selectedBook.available 
                  ? 'Request This Book' 
                  : 'Not Available'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Library;