import { useRef } from 'react';
import styled from 'styled-components';
import { SnackbarProvider as NotistackSnackbarProvider } from 'notistack';

import { CloseButton } from '@/common/components/CloseButton';

const Snackbar = styled(NotistackSnackbarProvider).attrs({
  anchorOrigin: { vertical: 'top', horizontal: 'right' },
  maxSnack: 3,
  preventDuplicate: true,
})`
  max-width: 20rem;
  max-height: 7rem;
  overflow: hidden;

  &.SnackbarContent-root {
    align-items: flex-start;
  }

  #notistack-snackbar {
    align-items: flex-start;
    max-width: 85%;
  }
`;

export function SnackbarProvider({ children }: { children: React.ReactNode }) {
  const snackRef = useRef<NotistackSnackbarProvider>(null);

  return (
    <Snackbar
      ref={snackRef}
      action={key => (
        <CloseButton onClick={() => snackRef.current?.closeSnackbar(key)} />
      )}
    >
      {children}
    </Snackbar>
  );
}
