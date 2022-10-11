import { Routes, Route, Navigate } from 'react-router-dom';

import { UsersList } from '@/modules/auth/pages/Users/List';
import { NotFound } from '@/common/pages/NotFound';

export function AuthSignedRoutes() {
  return (
    <Routes>
      <Route path="/" element={<UsersList />} />

      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<Navigate replace to="/not-found" />} />
    </Routes>
  );
}
