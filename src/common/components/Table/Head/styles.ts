import styled from 'styled-components';
import { visuallyHidden } from '@mui/utils';
import MUIBox from '@mui/material/Box';

export { default as Container } from '@mui/material/TableHead';
export { default as TableRow } from '@mui/material/TableRow';
export { default as TableCell } from '@mui/material/TableCell';
export { default as TableSortLabel } from '@mui/material/TableSortLabel';

export const CellBox = styled(MUIBox).attrs({
  sx: visuallyHidden,
})``;
