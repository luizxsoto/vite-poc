import { SkeletonProps } from '@mui/material/Skeleton';

import { Container } from './styles';

type FormSkeletonProps = SkeletonProps;

export function FormSkeleton({ ...rest }: FormSkeletonProps) {
  return <Container {...rest} />;
}
