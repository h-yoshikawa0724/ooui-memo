import React, { FC } from 'react';
import GeneralAlert from '../atoms/GeneralAlert';
import {
  UNKNOWN_STATUS,
  UNPROCESSABLE_ENTITY,
  INTERNAL_SERVER_ERROR,
} from '../../constants/statusCode';

type Props = {
  statusCode: number;
};

const RegisterAlert: FC<Props> = ({ statusCode }) => (
  <>
    {statusCode === UNPROCESSABLE_ENTITY && (
      <GeneralAlert
        type="error"
        title="認証失敗"
        content="入力した情報に誤りがないかご確認ください。"
      />
    )}
    {(statusCode === UNKNOWN_STATUS ||
      statusCode === INTERNAL_SERVER_ERROR) && (
      <GeneralAlert
        type="error"
        title="サーバエラー"
        content={`予期しないエラーが発生し、新規登録に失敗しました。\n恐れ入りますが時間をおいて再度お試しください。`}
      />
    )}
  </>
);

export default RegisterAlert;
