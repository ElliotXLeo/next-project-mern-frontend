import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import Confirm from './pages/Confirm';
import Login from './pages/Login';
import NewPassword from './pages/NewPassword';
import RecoverPassword from './pages/RecoverPassword';
import Register from './pages/Register';

function App() {
  return (
    <main className="flex flex-col justify-center min-h-screen">
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
    </main>
  );
};

export default App;
