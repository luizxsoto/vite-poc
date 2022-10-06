import { BrowserRouter, Routes as Router, Route } from 'react-router-dom';
import { SessionRoutes } from './session.routes';

export function Routes() {
  return (
    <BrowserRouter>
      <Router>
        <Route path="/*" element={<SessionRoutes />} />
      </Router>
    </BrowserRouter>
  );
}
