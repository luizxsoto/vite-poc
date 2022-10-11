import styled from 'styled-components';
import MUIPaper from '@mui/material/Paper';
import MUITableContainer from '@mui/material/TableContainer';
import MUITable from '@mui/material/Table';
import MUIGrid from '@mui/material/Grid';

export { default as CircularProgress } from '@mui/material/CircularProgress';

export const Container = styled(MUIPaper)`
  width: 100%;
  overflow: hidden;
`;

export const TableContainer = styled(MUITableContainer)<{ height?: string }>`
  height: ${({ height }) => height || 'calc(100vh - 12rem)'};
  position: relative;
`;

export const TableWrapper = styled(MUITable).attrs({
  stickyHeader: true,
  size: 'small',
})``;

export const CircularProgressContainer = styled(MUIGrid)`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  width: 100%;
  height: 100%;
  position: absolute;
  background: ${({ theme }) => theme.palette.common.black};
  opacity: 50%;
`;
