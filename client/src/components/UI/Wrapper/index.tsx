import { ChildrenProps } from '../../../types/general'
import { S } from './styles'

const Wrapper = ({ children }: ChildrenProps) => {
  return <S.Wrapper>{children}</S.Wrapper>
}

export { Wrapper }
