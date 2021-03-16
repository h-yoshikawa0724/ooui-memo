import React, { FC } from 'react';
import Header from '../../components/organisms/Header';
import useAuth from '../../hooks/useAuth';

type Props = {
  logined: boolean;
};

const EnhancedHeader: FC<Props> = ({ logined }) => {
  const { handleLogout } = useAuth();

  return <Header logined={logined} handleLogout={handleLogout} />;
};

export default EnhancedHeader;
