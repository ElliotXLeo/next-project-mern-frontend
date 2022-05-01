import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import AuthLayout from './layouts/AuthLayout';
import ProtectedRoute from './layouts/ProtectedRoute';
import Confirm from './pages/Confirm';
import Login from './pages/Login';
import NewPassword from './pages/NewPassword';
import Projects from './pages/Projects';
import RecoverPassword from './pages/RecoverPassword';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='recover-password' element={<RecoverPassword />} />
            <Route path='recover-password/:token' element={<NewPassword />} />
            <Route path='confirm/:id' element={<Confirm />} />
          </Route>
          <Route path='/projects' element={<ProtectedRoute />}>
            <Route index element={<Projects />} />
          </Route>
          <Route path="*" element={<h1 className="text-8xl font-semibold text-yellow-300 text-center">404</h1>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
