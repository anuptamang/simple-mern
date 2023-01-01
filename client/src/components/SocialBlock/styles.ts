import styled from '@emotion/styled'
import { Link } from '@mui/material'

export const IconHolder = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  border: 2px solid rgba(255, 255, 255, 0.2);
  text-decoration: none;

  svg {
    color: #fff;
  }

  &:hover {
    opacity: 0.8;
  }
`
