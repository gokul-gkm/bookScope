import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import BookList from './components/Books/BookList';
import BookDetails from './components/Books/BookDetails';
import BookForm from './components/Books/BookForm';
import ProfilePage from './components/Profile/ProfilePage';
import ReviewDetails from './components/Reviews/ReviewDetails';
import EditBookForm from './components/Books/EditBookForm';
import EditReviewForm from './components/Reviews/EditReviewForm';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<BookList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/books" element={<BookList />} />
            <Route path="/books/new" element={<BookForm />} />
            <Route path="/books/:id" element={<BookDetails />} />
            <Route path="/reviews/:id" element={<ReviewDetails />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/books/edit/:id" element={<EditBookForm />} />
            <Route path="/reviews/edit/:id" element={<EditReviewForm />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;