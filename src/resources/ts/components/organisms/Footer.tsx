import React, { FC } from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';
import FooterNavItem from '../molecules/FooterNavItem';

const Footer: FC = () => {
  const theme = useTheme();
  return (
    <Box component="footer" bgcolor={theme.palette.common.white}>
      <Container>
        <Grid container spacing={3} style={{ marginTop: theme.spacing(2) }}>
          <Grid item xs={6} component="nav">
            <Typography component="h4" variant="h5">
              About
            </Typography>
            <List>
              {/* <FooterNavItem title="OOUI-MEMOとは？" linkUrl="/about" /> */}
              <ListItem>
                <Typography>OOUI-MEMOとは？</Typography>
              </ListItem>
              {/* <FooterNavItem title="Q &amp; A" linkUrl="/faq" /> */}
              <ListItem>
                <Typography>Q &amp; A</Typography>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={6} component="nav">
            <Typography component="h4" variant="h5">
              Legal
            </Typography>
            <List>
              <FooterNavItem title="利用規約" linkUrl="/terms" />
              <FooterNavItem title="プライバシーポリシー" linkUrl="/policy" />
            </List>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
