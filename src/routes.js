import { Navigate, Route, Routes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
//
import Login from './pages/Login';
import Certification from './pages/Certification';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User';
import NotFound from './pages/Page404';
import PublicRoutes from './routers/PublicRoutes';
import ProtectedRoutes from './routers/ProtectedRoutes';
import Diploma from './pages/Diploma';

// ----------------------------------------------------------------------

export default function Router() {
  return (
    <Routes>
      <Route element={<PublicRoutes />}>
        <Route path="/" element={<Login />} />
        <Route path="login" element={<Navigate to="/" />} />
        <Route path="404" element={<NotFound />} />
      </Route>

      <Route element={<ProtectedRoutes />}>
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<User />} />
          {/* <Route path="app" element={<DashboardApp />} /> */}
          <Route path="products" element={<Products />} />
          <Route path="blog" element={<Blog />} />
        </Route>
      </Route>
      <Route path="certificaciones" element={<Certification />} />
      <Route path="diploma/:studentId" element={<Diploma />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
