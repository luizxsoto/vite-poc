import { Routes, Route, Navigate } from 'react-router-dom';

import { Login } from '@/pages/Login';
import { NotFound } from '@/pages/NotFound';

export function SessionRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<Navigate replace to="/not-found" />} />
    </Routes>
  );
}
