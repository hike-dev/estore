import { ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { Navigate, Routes, Route } from 'react-router-dom';

import { Layout } from './layout/Layout';
import { ProductList, ProductShow } from './pages/product';
import { store } from './store';
import { theme } from './theme';

export const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="product">
            <Route index={true} element={<ProductList />} />
            <Route index={false} path=":productId" element={<ProductShow />} />
          </Route>
          <Route index element={<Navigate to={'/product'} />} />
        </Route>
      </Routes>
    </ThemeProvider>
  </Provider>
);
