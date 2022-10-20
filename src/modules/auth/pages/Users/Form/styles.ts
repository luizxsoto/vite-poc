import styled from 'styled-components';

import MUIBox from '@mui/material/Box';

export const Container = styled(MUIBox)`
  padding: 1rem;
  background: ${({ theme }) => theme.palette.background.default};
  height: 100%;
`;
