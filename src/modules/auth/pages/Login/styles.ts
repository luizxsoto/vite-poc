import styled from 'styled-components';
import MUILink from '@mui/material/Link';
import MUIGrid from '@mui/material/Grid';
import MUIBox from '@mui/material/Box';
import MUITypography from '@mui/material/Typography';
import MUIDivider from '@mui/material/Divider';

import logoPositivoEducacional from '@/modules/auth/assets/logo-positivo-educacional.png';

export { default as GroupIcon } from '@mui/icons-material/Group';
export { default as Button } from '@mui/material/Button';
export { default as Avatar } from '@mui/material/Avatar';

export const Container = styled(MUIGrid).attrs({
  container: true,
  component: 'main',
})`
  background: ${({ theme }) => theme.palette.background.default};
  height: 100vh;
`;

export const ImageContent = styled(MUIGrid).attrs({
  item: true,
  xs: false,
  sm: 4,
  md: 7,
  lg: 7,
  xl: 7,
})`
  background-image: url(${logoPositivoEducacional});
  background-repeat: no-repeat;
  background-size: 600px;
  background-position: center;
`;

export const FormContent = styled(MUIGrid).attrs({
  item: true,
  xs: 12,
  sm: 8,
  md: 5,
  lg: 5,
  xl: 5,
})`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Divider = styled(MUIDivider)`
  width: 0.5rem;
  height: 20rem;
  background: ${({ theme }) => theme.palette.primary.main};
`;

export const Link = styled(MUILink)`
  color: ${({ theme }) => theme.palette.text.primary};
`;

export const Copyright = styled(MUITypography)`
  color: ${({ theme }) => theme.palette.text.primary};
  text-align: center;
`;

export const Title = styled(MUITypography).attrs({
  variant: 'h5',
})`
  color: ${({ theme }) => theme.palette.text.primary};
`;

export const SwipeableBox = styled(MUIBox)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 2rem;
`;
