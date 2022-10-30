import styled from 'styled-components';
import MUITablePagination from '@mui/material/TablePagination';
import MUIGrid from '@mui/material/Grid';

export { GoToTopButton } from '@/common/components/GoToTopButton';

export const Container = styled(MUIGrid)`
  display: flex;
  align-items: center;
`;

export const PaginationComponent = styled(MUITablePagination).attrs({
  component: 'div',
})`
  & .MuiInputBase-root {
    margin-right: unset;
  }

  & .MuiTablePagination-actions {
    margin-left: unset;
  }
`;
