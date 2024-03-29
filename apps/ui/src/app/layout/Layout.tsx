import { AppBar, Box, Container, CssBaseline, styled } from '@mui/material';
import { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';

import { Navigation } from './Navigation';

export const Layout = ({ children }: PropsWithChildren) => (
  <Root>
    <CssBaseline />
    <Box className={layoutClasses.appFrame}>
      <AppBar />
      <Box className={layoutClasses.wrapper} component={'main'}>
        <Box id="main-content" className={layoutClasses.content}>
          <Outlet />
        </Box>
      </Box>
      <Navigation />
    </Box>
  </Root>
);

const PREFIX = 'StoreLayout';
export const layoutClasses = {
  appFrame: `${PREFIX}-appFrame`,
  wrapper: `${PREFIX}-wrapper`,
  content: `${PREFIX}-content`,
};

const Root = styled(Container, {
  name: PREFIX,
  overridesResolver: (props, styles) => styles.root,
})(({ theme: { spacing } }) => ({
  margin: 0,
  padding: 0,
  [`& .${layoutClasses.appFrame}`]: {},
  [`& .${layoutClasses.wrapper}`]: {
    marginBottom: spacing(10),
  },
  [`& .${layoutClasses.content}`]: {},
}));
