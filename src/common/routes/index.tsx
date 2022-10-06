import { BrowserRouter, Routes as Router, Route } from 'react-router-dom';
import { AuthRoutes } from '@/modules/auth/routes';

export function Routes() {
  return (
    <BrowserRouter>
      <Router>
        <Route path="/*" element={<AuthRoutes />} />
      </Router>
    </BrowserRouter>
  );
}
