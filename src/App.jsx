import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { ProjectsProvider } from './context/ProjectsProvider';
import AuthLayout from './layouts/AuthLayout';
import ProtectedRoute from './layouts/ProtectedRoute';
import Confirm from './pages/Confirm';
import CreateProject from './pages/CreateProject';
import Login from './pages/Login';
import NewPassword from './pages/NewPassword';
import Project from './pages/Project';
import Projects from './pages/Projects';
import RecoverPassword from './pages/RecoverPassword';
import Register from './pages/Register';
import UpdateProject from './pages/UpdateProject';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProjectsProvider>
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
              <Route path='create-project' element={<CreateProject />} />
              <Route path=':id' element={<Project />} />
              <Route path='update/:id' element={<UpdateProject />} />
            </Route>
            <Route path="*" element={<h1 className="text-8xl font-semibold text-yellow-300 text-center">404</h1>} />
          </Routes>
        </ProjectsProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
