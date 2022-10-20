import { Routes, Route, Navigate } from 'react-router-dom';

import { AuthRoutes } from '@/modules/auth/routes/auth';
import { NotFound } from '@/common/pages/NotFound';

export function NotSignedRoutes() {
  return (
    <Routes>
      <Route path="/*" element={<AuthRoutes />} />

      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<Navigate replace to="/not-found" />} />
    </Routes>
  );
}
