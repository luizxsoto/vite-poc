import { useState, useCallback } from 'react';
import _Get from 'lodash.get';

import { ActionFunction, ColumnInfo } from '@/common/components/Table';

import {
  Container,
  TableRow,
  TableCell,
  Menu,
  MenuItem,
  Typography,
  IconButton,
  MenuOpenIcon,
  DeleteIcon,
  VisibilityIcon,
  EditIcon,
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  CloseIcon,
  ConfirmMessage,
  ConfirmButton,
  CancelButton,
  FormGridContainer,
} from './styles';
import { i18n } from '@/common/i18n';

type BodyProps<RegisterKey extends string> = {
  registerKey: RegisterKey;
  registerList: (Record<string, unknown> & Record<RegisterKey, string>)[];
  columnInfos: ColumnInfo[];
  actionFunctions?: ActionFunction[];
};

type SelectedItem = {
  ref?: Element | ((element: Element) => Element) | null;
  register?: Record<string, unknown>;
};

type DialogState = {
  isOpen: boolean;
  actionFunction?: ActionFunction;
};

export function Body<RegisterKey extends string>({
  registerKey,
  registerList,
  columnInfos,
  actionFunctions,
}: BodyProps<RegisterKey>): JSX.Element {
  const [selectedItem, setSelectedItem] = useState<SelectedItem>({
    ref: undefined,
    register: undefined,
  });
  const [dialogState, setDialogState] = useState<DialogState>({
    isOpen: false,
    actionFunction: undefined,
  });

  const IconType = useCallback(({ icon }: { icon: string }): JSX.Element => {
    const iconDict: Record<string, JSX.Element> = {
      show: <VisibilityIcon />,
      update: <EditIcon />,
      remove: <DeleteIcon />,
    };

    return iconDict[icon];
  }, []);

  function handleCloseMenu() {
    setSelectedItem({ ref: undefined, register: undefined });
  }

  function handleOpenMenu(selectedItem: SelectedItem) {
    setSelectedItem(selectedItem);
  }

  function handleCloseDialog() {
    setDialogState({ isOpen: false });
  }

  function handleConfirmAction() {
    if (selectedItem.register)
      dialogState?.actionFunction?.handle(selectedItem.register);

    handleCloseDialog();
    handleCloseMenu();
  }

  function handleCancelAction() {
    handleCloseDialog();
    handleCloseMenu();
  }

  function handleMenuItemClick(actionFunction: ActionFunction) {
    if (actionFunction.confirmMessage) {
      return setDialogState({
        isOpen: true,
        actionFunction,
      });
    }

    if (selectedItem.register) actionFunction.handle(selectedItem.register);

    return handleCloseMenu();
  }

  function getColumnInfos(
    itemData: Record<string, unknown>,
    columnInfoKey: string
  ) {
    const getColumnInfoResult = _Get(itemData, columnInfoKey) as string;

    return getColumnInfoResult;
  }

  return (
    <Container>
      <Dialog open={dialogState.isOpen} onClose={handleCloseDialog}>
        <DialogHeader container>
          <DialogTitle>
            {i18n().common.components.table.body.attention}
          </DialogTitle>

          <IconButton onClick={handleCloseDialog} sx={{ mr: '1rem' }}>
            <CloseIcon />
          </IconButton>
        </DialogHeader>

        <DialogContent>
          <ConfirmMessage>
            {dialogState.actionFunction?.confirmMessage}
          </ConfirmMessage>

          <FormGridContainer spacing={1} mt={1}>
            <ConfirmButton onClick={handleConfirmAction}>
              {i18n().common.components.table.body.confirm}
            </ConfirmButton>
            <CancelButton onClick={handleCancelAction}>
              {i18n().common.components.table.body.cancel}
            </CancelButton>
          </FormGridContainer>
        </DialogContent>
      </Dialog>

      {registerList.map(itemData => (
        <TableRow hover key={itemData[registerKey]}>
          {columnInfos.map(columnInfo => (
            <TableCell key={columnInfo.key}>
              {getColumnInfos(itemData, columnInfo.key)}
            </TableCell>
          ))}
          {actionFunctions && (
            <TableCell padding="none" align="center">
              <IconButton
                color="primary"
                size="small"
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                  handleOpenMenu({
                    ref: event.currentTarget,
                    register: itemData,
                  });
                }}
              >
                <MenuOpenIcon />
              </IconButton>
            </TableCell>
          )}
        </TableRow>
      ))}
      {actionFunctions && (
        <Menu
          anchorEl={selectedItem.ref}
          open={!!selectedItem.ref}
          onClose={handleCloseMenu}
        >
          {actionFunctions.map(actionFunction => (
            <MenuItem
              key={actionFunction.key}
              onClick={() => handleMenuItemClick(actionFunction)}
            >
              <IconType icon={actionFunction.key} />
              <Typography>{actionFunction.label}</Typography>
            </MenuItem>
          ))}
        </Menu>
      )}
    </Container>
  );
}
