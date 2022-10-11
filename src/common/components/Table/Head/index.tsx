import { SortTypes } from '@/common/constants';
import { ActionFunction, ColumnInfo } from '@/common/components/Table';

import {
  Container,
  TableRow,
  TableCell,
  TableSortLabel,
  CellBox,
} from './styles';
import { i18n } from '@/common/i18n';

type HeadProps = {
  columnInfos: ColumnInfo[];
  order: SortTypes;
  orderBy: string;
  onRequestSort: (key: string) => void;
  actionFunctions?: ActionFunction[];
};

export function Head({
  columnInfos,
  order,
  orderBy,
  onRequestSort,
  actionFunctions,
}: HeadProps): JSX.Element {
  function HeadCells(): JSX.Element {
    return (
      <>
        {columnInfos.map(columnInfo => (
          <TableCell
            key={columnInfo.key}
            sortDirection={orderBy === columnInfo.key ? order : false}
          >
            <TableSortLabel
              active={orderBy === columnInfo.key}
              direction={orderBy === columnInfo.key ? order : 'asc'}
              onClick={() => onRequestSort(columnInfo.key)}
            >
              {columnInfo.label}
              {orderBy === columnInfo.key ? (
                <CellBox>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </CellBox>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </>
    );
  }

  return (
    <Container>
      <TableRow>
        <HeadCells />
        {actionFunctions && (
          <TableCell align="center">
            {i18n().common.components.table.head.actions}
          </TableCell>
        )}
      </TableRow>
    </Container>
  );
}
