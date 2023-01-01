import { LinkProps, Link as MuiLink } from '@mui/material';
import { NavLink as ReactRouterLink } from 'react-router-dom';

const NavLink = (props: LinkProps) => {
  return (
    <MuiLink {...props} component={ReactRouterLink} to={props.href ?? '#'} />
  );
};

export default NavLink;
