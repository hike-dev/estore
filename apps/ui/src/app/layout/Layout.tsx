import { AppBar, Container, styled } from '@mui/material';
import { PropsWithChildren, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Loading } from './Loading';

export const Layout = ({ children }: PropsWithChildren) => (
  <Root>
    <div className={layoutClasses.appFrame}>
      <AppBar />
      <main className={layoutClasses.wrapper}>
        <div id="main-content" className={layoutClasses.content}>
          <Suspense fallback={<Loading />}>{children}</Suspense>
          <Outlet />
        </div>
      </main>
    </div>
  </Root>
);

const PREFIX = 'StoreLayout';
export const layoutClasses = {
  appFrame: `${PREFIX}-appFrame`,
  wrapper: `${PREFIX}-wrapper`,
  content: `${PREFIX}-content`,

  title: `${PREFIX}-title`,
  description: `${PREFIX}-description`,
  header: `${PREFIX}-header`,
};

const Root = styled(Container, {
  name: PREFIX,
  overridesResolver: (props, styles) => styles.root,
})(({ theme }) => ({}));
