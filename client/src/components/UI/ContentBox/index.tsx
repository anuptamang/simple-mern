import { BoxStyled } from './styles'

const ContentBox = (props: any) => {
  return <BoxStyled {...props}>{props.children}</BoxStyled>
}

export default ContentBox
