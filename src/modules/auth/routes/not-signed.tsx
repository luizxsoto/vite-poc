import { Routes, Route, Navigate } from 'react-router-dom';

import { Login } from '@/modules/auth/pages/Login';
import { NotFound } from '@/common/pages/NotFound';

export function AuthNotSignedRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<Navigate replace to="/not-found" />} />
    </Routes>
  );
}
