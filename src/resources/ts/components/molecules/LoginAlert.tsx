import React, { FC } from 'react';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import {
  UNPROCESSABLE_ENTITY,
  INTERNAL_SERVER_ERROR,
} from '../../constants/statusCode';

type Props = {
  statusCode: number;
};

const LoginAlert: FC<Props> = ({ statusCode }) => (
  <>
    {statusCode === UNPROCESSABLE_ENTITY && (
      <Alert severity="error">
        <AlertTitle>認証失敗</AlertTitle>
        入力した情報に誤りがないかご確認ください。
      </Alert>
    )}
    {statusCode === INTERNAL_SERVER_ERROR && (
      <Alert severity="error">
        <AlertTitle>サーバエラー</AlertTitle>
        予期しないエラーが発生しました。恐れ入りますが時間をおいて再度お試しください。
      </Alert>
    )}
  </>
);

export default LoginAlert;
