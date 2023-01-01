import { S } from './styles'

interface Iprops {
  imageUrl: string | undefined
  imageAlt: string
}

const CoverImage = ({ imageUrl, imageAlt }: Iprops) => {
  return (
    <S.ImageHolder>
      <S.Image src={imageUrl && imageUrl} alt={imageAlt && imageAlt} />
    </S.ImageHolder>
  )
}

export default CoverImage
