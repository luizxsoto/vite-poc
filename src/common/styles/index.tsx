import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export function GlobalStyles({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CssBaseline />
      <ToastContainer />
      {children}
    </>
  );
}
