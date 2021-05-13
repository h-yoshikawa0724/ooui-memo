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
  handleDeleteUser: VoidFunction;
};

const UserDeleteDialog: FC<Props> = ({
  dialogId,
  open,
  handleDeleteDialogClose,
  handleDeleteUser,
}) => (
  <Dialog
    id={dialogId}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    open={open}
    onClose={handleDeleteDialogClose}
  >
    <DialogTitle id="alert-dialog-title">
      本当にこのアカウントを削除してよろしいですか？
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        アカウントを削除すると、メモデータも全て削除されます。
        <br />
        削除したデータを後から戻すことは出来ません。
        <br />
        <br />
        ※ソーシャルログインの場合...当サービス内のソーシャルログイン情報は削除されますが、連携サービス側の認可解除はご自身で行ってください。
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleDeleteDialogClose} color="primary" autoFocus>
        キャンセル
      </Button>
      <Button
        onClick={() => {
          handleDeleteUser();
          handleDeleteDialogClose();
        }}
        color="secondary"
      >
        削除
      </Button>
    </DialogActions>
  </Dialog>
);

export default UserDeleteDialog;
