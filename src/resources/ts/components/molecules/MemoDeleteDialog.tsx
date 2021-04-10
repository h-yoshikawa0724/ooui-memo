import React, { FC } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

type Props = {
  dialogId: string;
  open: boolean;
  handleDeleteDialogClose: VoidFunction;
  handleDeleteMemo: VoidFunction;
};

const MemoDeleteDialog: FC<Props> = ({
  dialogId,
  open,
  handleDeleteDialogClose,
  handleDeleteMemo,
}) => (
  <Dialog
    id={dialogId}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    open={open}
    onClose={handleDeleteDialogClose}
  >
    <DialogTitle id="alert-dialog-title">
      本当にこのメモを削除してよろしいですか？
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        一度削除したメモは元に戻せません。
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleDeleteDialogClose} color="primary" autoFocus>
        キャンセル
      </Button>
      <Button
        onClick={() => {
          handleDeleteMemo();
          handleDeleteDialogClose();
        }}
        color="secondary"
      >
        削除
      </Button>
    </DialogActions>
  </Dialog>
);

export default MemoDeleteDialog;
