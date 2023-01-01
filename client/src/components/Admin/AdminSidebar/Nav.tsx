import ContentBox from '../../UI/ContentBox'
import AdminSummary from './AdminSummary'
import NavList from './NavList'

const Nav = (props: any) => {
  return (
    <ContentBox sx={{ textAlign: 'center' }}>
      <AdminSummary />
      <NavList />
    </ContentBox>
  )
}

export default Nav
