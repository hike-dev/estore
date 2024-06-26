import { Typography, SxProps } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';

import { useTimeout } from '../hooks/useTimeout';

export const Loading = (props: ILoadingProps) => {
  const {
    className,
    loadingPrimary = 'ra.page.loading',
    loadingSecondary = 'ra.message.loading',
    ...rest
  } = props;
  const oneSecondHasPassed = useTimeout(1000);
  return oneSecondHasPassed ? (
    <Root className={className} {...rest}>
      <div className={LoadingClasses.message}>
        <CircularProgress className={LoadingClasses.icon} />
        <Typography variant="h5" mt={3} color="text.secondary">
          {loadingPrimary}
        </Typography>
        <Typography variant="body2">{loadingSecondary}</Typography>
      </div>
    </Root>
  ) : null;
};

export interface ILoadingProps {
  className?: string;
  loadingPrimary?: string;
  loadingSecondary?: string;
  sx?: SxProps;
}

const PREFIX = 'RaLoading';

export const LoadingClasses = {
  root: `${PREFIX}-root`,
  icon: `${PREFIX}-icon`,
  message: `${PREFIX}-message`,
};

const Root = styled('div', {
  name: PREFIX,
  overridesResolver: (props, styles) => styles.root,
})(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  [`& .${LoadingClasses.message}`]: {
    textAlign: 'center',
    fontFamily: 'Roboto, sans-serif',
    color: theme.palette.text.disabled,
    paddingTop: '1em',
    paddingBottom: '1em',
  },
  [`& .${LoadingClasses.icon}`]: {
    width: '9em',
    height: '9em',
  },
}));
