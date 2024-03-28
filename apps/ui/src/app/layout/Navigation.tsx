import {
  HomeOutlined as HomeOutlinedIcon,
  ManageSearchOutlined as ManageSearchOutlinedIcon,
  FavoriteBorderOutlined as FavoriteBorderOutlinedIcon,
  LocalMallOutlined as LocalMallOutlinedIcon,
  PersonOutlineOutlined as PersonOutlineOutlinedIcon,
} from '@mui/icons-material';
import {
  BottomNavigation,
  BottomNavigationAction,
  bottomNavigationActionClasses,
  styled,
  svgIconClasses,
} from '@mui/material';
import { PropsWithChildren, useState } from 'react';

export const Navigation = ({ children }: PropsWithChildren) => {
  const [value, setValue] = useState(0);
  return (
    <Root
      value={value}
      onChange={(event, newValue) => {
        // console.log(newValue);
        setValue(newValue);
      }}
      showLabels={false}
    >
      <BottomNavigationAction value="home" icon={<HomeOutlinedIcon />} />
      <BottomNavigationAction
        value="search"
        icon={<ManageSearchOutlinedIcon />}
      />
      <BottomNavigationAction
        value="favorite"
        icon={<FavoriteBorderOutlinedIcon />}
      />
      <BottomNavigationAction value="cart" icon={<LocalMallOutlinedIcon />} />
      <BottomNavigationAction
        value="profile"
        icon={<PersonOutlineOutlinedIcon />}
      />
    </Root>
  );
};

const PREFIX = 'StoreNavigation';
export const layoutClasses = {};

const Root = styled(BottomNavigation, {
  name: PREFIX,
  overridesResolver: (props, styles) => styles.root,
})(({ theme: { spacing } }) => ({
  position: 'fixed',
  bottom: 0,
  width: '100%',
  height: spacing(10),
  boxShadow: '0 0 8px rgba(0,0,0,0.2)',
  [`& .${bottomNavigationActionClasses.root}`]: {
    color: '909090',
    [`&.${bottomNavigationActionClasses.selected}`]: {
      color: '#282828',
    },
    [`& .${svgIconClasses.root}`]: {
      fontSize: spacing(4),
    },
  },
}));
