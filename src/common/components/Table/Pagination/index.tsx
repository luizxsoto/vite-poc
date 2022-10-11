import { PaginationComponent, Container, GoToTopButton } from './styles';

type PaginationProps = {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newRowsPerPage: number) => void;
};

export function Pagination({
  count,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}: PaginationProps): JSX.Element {
  return (
    <Container>
      <PaginationComponent
        rowsPerPageOptions={[10, 25, 50]}
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(_event: unknown, newPage: number) =>
          onPageChange(newPage)
        }
        onRowsPerPageChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          onRowsPerPageChange(+event.target.value)
        }
      />

      <GoToTopButton elementId="table-container" />
    </Container>
  );
}
