import { Routes, Route, Navigate } from 'react-router-dom';

import { UserRoutes } from '@/modules/auth/routes/users';
import { NotFound } from '@/common/pages/NotFound';

export function SignedRoutes() {
  return (
    <Routes>
      <Route path="/*" element={<UserRoutes />} />

      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<Navigate replace to="/not-found" />} />
    </Routes>
  );
}
