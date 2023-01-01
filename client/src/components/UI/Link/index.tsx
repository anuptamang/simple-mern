import { Link as MuiLink, LinkProps } from '@mui/material'
import { Link as ReactRouterLink } from 'react-router-dom'

const Link = (props: LinkProps) => {
  return (
    <MuiLink {...props} component={ReactRouterLink} to={props.href ?? '#'} />
  )
}

export default Link
