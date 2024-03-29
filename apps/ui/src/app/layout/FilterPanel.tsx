import { FilterAltOutlined as FilterAltOutlinedIcon } from '@mui/icons-material';
import { Box, IconButton, Button, styled, buttonClasses } from '@mui/material';

export const FilterPanel = ({ total }: { total: number }) => (
  <Root>
    <Box className={filterPanelClasses.header}>
      <Box className={filterPanelClasses.label}>All</Box>
      <IconButton className={filterPanelClasses.stats}>
        {total} results
      </IconButton>
    </Box>
    <Box className={filterPanelClasses.filters}>
      <Button variant="outlined" startIcon={<FilterAltOutlinedIcon />}>
        Filter
      </Button>
      <Button variant="outlined">Deals</Button>
      <Button variant="outlined">Brand</Button>
      <Button variant="outlined">Size</Button>
      <Button variant="outlined">Color</Button>
      <Button variant="outlined">Material</Button>
    </Box>
  </Root>
);
const FILTER_PANEL_PREFIX = 'StoreFilterPanel';
export const filterPanelClasses = {
  header: `${FILTER_PANEL_PREFIX}-header`,
  label: `${FILTER_PANEL_PREFIX}-label`,
  stats: `${FILTER_PANEL_PREFIX}-stats`,
  filters: `${FILTER_PANEL_PREFIX}-filters`,
};

const Root = styled(Box, {
  name: FILTER_PANEL_PREFIX,
  overridesResolver: (props, styles) => styles.root,
})(({ theme: { spacing } }) => ({
  paddingInline: spacing(2),
  gap: spacing(2),
  display: 'flex',
  flexDirection: 'column',
  [`& .${filterPanelClasses.header}`]: {
    display: 'flex',
    alignItems: 'center',
    [`& .${filterPanelClasses.label}`]: {
      flexGrow: 1,
      fontSize: spacing(2.5),
      fontWeight: 700,
    },
    [`& .${filterPanelClasses.stats}`]: {
      fontSize: spacing(1.5),
    },
  },
  [`& .${filterPanelClasses.filters}`]: {
    display: 'flex',
    gap: spacing(1),
    maxWidth: '100%',
    overflow: 'overlay',
    [`& .${buttonClasses.root}`]: {
      border: '1px solid #59595b',
      borderRadius: spacing(2.5),
      boxSizing: 'content-box',
      textTransform: 'none',
      padding: spacing(0.5, 1),
      color: '#59595b',
    },
  },
}));
