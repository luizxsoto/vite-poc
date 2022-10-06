import styled from 'styled-components';
import MUIGrid, { GridProps, GridSize } from '@mui/material/Grid';

const DEFAULT_XS = 12;
const DEFAULT_SM = 6;
const DEFAULT_MD = 4;
const DEFAULT_LG = DEFAULT_MD;
const DEFAULT_XL = DEFAULT_LG;

export const Container = styled(MUIGrid).attrs((props: GridProps) => ({
  item: true as boolean,
  xs: (props.xs || DEFAULT_XS) as boolean | GridSize,
  sm: (props.sm || props.xs || DEFAULT_SM) as boolean | GridSize,
  md: (props.md || props.sm || props.xs || DEFAULT_MD) as boolean | GridSize,
  lg: (props.lg || props.md || props.sm || props.xs || DEFAULT_LG) as
    | boolean
    | GridSize,
  xl: (props.xl ||
    props.lg ||
    props.md ||
    props.sm ||
    props.xs ||
    DEFAULT_XL) as boolean | GridSize,
}))``;
