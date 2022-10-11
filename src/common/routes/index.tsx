import { BrowserRouter, Routes as Router, Route } from 'react-router-dom';

import { AuthNotSignedRoutes } from '@/modules/auth/routes/not-signed';
import { useAuth } from '@/modules/auth/contexts/auth';
import { AuthSignedRoutes } from '@/modules/auth/routes/signed';

export function Routes() {
  const { loggedUser } = useAuth();

  return (
    <BrowserRouter>
      <Router>
        {loggedUser ? (
          <Route path="/*" element={<AuthSignedRoutes />} />
        ) : (
          <Route path="/*" element={<AuthNotSignedRoutes />} />
        )}
      </Router>
    </BrowserRouter>
  );
}
