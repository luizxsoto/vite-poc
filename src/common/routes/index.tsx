import { BrowserRouter } from 'react-router-dom';

import { useAuth } from '@/modules/auth/contexts/auth';

import { SignedRoutes } from './signed';
import { NotSignedRoutes } from './not-signed';

export function Routes() {
  const { loggedUser } = useAuth();

  return (
    <BrowserRouter>
      {loggedUser ? <SignedRoutes /> : <NotSignedRoutes />}
    </BrowserRouter>
  );
}
