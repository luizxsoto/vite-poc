import styled from 'styled-components';
import MUISkeleton from '@mui/material/Skeleton';

export const Container = styled(MUISkeleton).attrs({
  height: 66 as string | number | undefined,
})`
  margin-top: -1rem;
  margin-bottom: 0.75rem;
`;
