import styled from 'styled-components';

import MUIContainer from '@mui/material/Container';

export { Table } from '@/common/components/Table';

export const Container = styled(MUIContainer).attrs({ disableGutters: true })`
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.palette.background.default};
`;
