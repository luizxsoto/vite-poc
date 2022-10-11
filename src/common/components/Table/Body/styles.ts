import styled from 'styled-components';
import MUIIconButton from '@mui/material/IconButton';
import MUITypography from '@mui/material/Typography';
import MUIGrid from '@mui/material/Grid';

import { FormConfirmButton, FormCancelButton } from '@/common/components/Form';

export { default as Container } from '@mui/material/TableBody';
export { default as TableRow } from '@mui/material/TableRow';
export { default as TableCell } from '@mui/material/TableCell';
export { default as Menu } from '@mui/material/Menu';
export { default as MenuItem } from '@mui/material/MenuItem';
export { default as Dialog } from '@mui/material/Dialog';
export { default as DialogTitle } from '@mui/material/DialogTitle';
export { default as DialogContent } from '@mui/material/DialogContent';
export { default as CloseIcon } from '@mui/icons-material/Close';
export { default as MenuOpenIcon } from '@mui/icons-material/MenuOpen';
export { default as DeleteIcon } from '@mui/icons-material/Delete';
export { default as VisibilityIcon } from '@mui/icons-material/Visibility';
export { default as EditIcon } from '@mui/icons-material/Edit';

export { FormGridContainer } from '@/common/components/Form';

export const IconButton = styled(MUIIconButton).attrs({
  color: 'primary',
})``;

export const Typography = styled(MUITypography)`
  margin-left: 0.2rem;
`;

export const ConfirmMessage = styled(MUITypography).attrs({ variant: 'h6' })``;

export const DialogHeader = styled(MUIGrid)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ConfirmButton = styled(FormConfirmButton).attrs({
  gridProps: { xs: 6 },
})``;

export const CancelButton = styled(FormCancelButton).attrs({
  gridProps: { xs: 6 },
})``;
