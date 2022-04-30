import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import AuthLayout from './layouts/AuthLayout';
import Confirm from './pages/Confirm';
import Login from './pages/Login';
import NewPassword from './pages/NewPassword';
import RecoverPassword from './pages/RecoverPassword';
import Register from './pages/Register';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='recover-password' element={<RecoverPassword />} />
            <Route path='recover-password/:token' element={<NewPassword />} />
            <Route path='confirm/:id' element={<Confirm />} />
          </Route>
          <Route path="*" element={<h1 className="text-8xl font-semibold text-yellow-300 text-center">404</h1>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
