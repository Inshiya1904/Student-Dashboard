import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import AddStudent from './pages/AddStudent';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import StudentDetail from './pages/StudentDetail';
import { Toaster } from 'react-hot-toast';

const App = () => (
  <>
            <Toaster position="top-center" reverseOrder={false} />

 
  <AuthProvider>
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-student" element={
          <ProtectedRoute>
            <AddStudent />
          </ProtectedRoute>
        } />
        <Route path="/students/:id" element={
          <ProtectedRoute>
             <StudentDetail />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
  </>
);

export default App;