import styled from 'styled-components';

import MUIGrid from '@mui/material/Grid';

export { Table } from '@/common/components/Table';

export const Container = styled(MUIGrid).attrs({
  container: true,
  component: 'main',
})``;
