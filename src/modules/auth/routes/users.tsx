import { Routes, Route, Navigate } from 'react-router-dom';

import { UsersList } from '@/modules/auth/pages/Users/List';
import { UsersForm } from '@/modules/auth/pages/Users/Form';
import { NotFound } from '@/common/pages/NotFound';

export function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<UsersList />} />
      <Route path="/form" element={<UsersForm />} />

      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<Navigate replace to="/not-found" />} />
    </Routes>
  );
}
