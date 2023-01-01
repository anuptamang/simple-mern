import { ChildrenProps } from '../../../../types/general'
import { S } from './styles'

const PageHolder = ({ children }: ChildrenProps) => {
  return <S.PageHolder>{children}</S.PageHolder>
}

export default PageHolder
