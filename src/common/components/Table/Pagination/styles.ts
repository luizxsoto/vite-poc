import styled from 'styled-components';
import MUITablePagination from '@mui/material/TablePagination';
import MUIGrid from '@mui/material/Grid';

export { GoToTopButton } from '@/common/components/GoToTopButton';

export const Container = styled(MUIGrid)`
  display: flex;
`;

export const PaginationComponent = styled(MUITablePagination).attrs({
  component: 'div',
})``;
