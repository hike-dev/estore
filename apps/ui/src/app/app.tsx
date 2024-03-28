import { ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { Layout } from './layout/Layout';
import { ProductList, ProductShow } from './pages/product';
import { store } from './store';
import { theme } from './theme';

export const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Layout>
        <Routes>
          <Route path="/">
            <Route path="product">
              <Route index={true} element={<ProductList />} />
              <Route
                index={false}
                path=":productId"
                element={<ProductShow />}
              />
            </Route>
          </Route>
        </Routes>
      </Layout>
    </ThemeProvider>
  </Provider>
);
