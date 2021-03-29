import React, { FC } from 'react';
import { IconButton } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

type Props = {
  handleBack: VoidFunction;
};

const BackButton: FC<Props> = ({ handleBack }) => (
  <IconButton edge="start" onClick={handleBack}>
    <ArrowBackIosIcon />
  </IconButton>
);

export default BackButton;
