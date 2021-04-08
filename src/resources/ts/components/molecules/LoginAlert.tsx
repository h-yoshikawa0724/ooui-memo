import React, { FC } from 'react';
import GeneralAlert from '../atoms/GeneralAlert';
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
      <GeneralAlert
        type="error"
        title="認証失敗"
        content="入力した情報に誤りがないかご確認ください。"
      />
    )}
    {statusCode === INTERNAL_SERVER_ERROR && (
      <GeneralAlert
        type="error"
        title="サーバエラー"
        content="予期しないエラーが発生しました。恐れ入りますが時間をおいて再度お試しください。"
      />
    )}
  </>
);

export default LoginAlert;
