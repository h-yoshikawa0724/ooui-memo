import React, { FC } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

type Props = {
  edge?: 'start' | 'end' | false;
  handleBack: VoidFunction;
};

const BackButton: FC<Props> = ({ edge, handleBack }) => (
  <Tooltip title="メモ一覧へ戻る">
    <IconButton edge={edge || false} onClick={handleBack}>
      <ArrowBackIosIcon />
    </IconButton>
  </Tooltip>
);

export default BackButton;
