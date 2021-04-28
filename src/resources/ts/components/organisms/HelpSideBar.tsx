import React, { FC } from 'react';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import SideBarItem from '../molecules/SidebarItem';

const HelpSideBar: FC = () => (
  <Paper>
    <MenuList>
      {/* <SideBarItem title="当サービスについて" linkUrl="/about" />
      <SideBarItem title="Q & A" linkUrl="/faq" /> */}
      <SideBarItem title="利用規約" linkUrl="/terms" />
      {/* <SideBarItem title="プライバシーポリシー" linkUrl="/policy" /> */}
    </MenuList>
  </Paper>
);

export default HelpSideBar;
