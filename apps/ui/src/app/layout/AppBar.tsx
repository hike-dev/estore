import {
  Search as SearchIcon,
  LocalMallOutlined as LocalMallOutlinedIcon,
} from '@mui/icons-material';
import { Box, IconButton, styled, svgIconClasses } from '@mui/material';

export const AppBar = () => (
  <Root>
    <Box className={appBarClasses.label}>Verve</Box>
    <IconButton>
      <SearchIcon />
    </IconButton>
    <IconButton>
      <LocalMallOutlinedIcon />
    </IconButton>
  </Root>
);

const APP_BAR_PREFIX = 'StoreAppBar';
export const appBarClasses = {
  label: `${APP_BAR_PREFIX}-label`,
};

const Root = styled(Box, {
  name: APP_BAR_PREFIX,
  overridesResolver: (props, styles) => styles.root,
})(({ theme: { spacing } }) => ({
  display: 'flex',
  alignItems: 'center',
  paddingInline: spacing(2),
  [`& .${appBarClasses.label}`]: {
    fontSize: spacing(2.5),
    fontWeight: 700,
    flexGrow: 1,
  },
  [`& .${svgIconClasses.root}`]: {
    fontSize: spacing(3),
    color: '#1d1d1f',
  },
}));
