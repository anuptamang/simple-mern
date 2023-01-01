import { ReactElement } from 'react'
import { Outlet } from 'react-router'
import AdminSidebar from '../../components/Admin/AdminSidebar'
import AdminArea from '../../components/UI/Wrapper/AdminArea'
import AdminContent from '../../components/UI/Wrapper/AdminArea/AdminContent'

type Iprops = {
  children?: ReactElement
}

const Admin = ({ children }: Iprops) => {
  return (
    <>
      <AdminArea>
        <AdminSidebar />
        <AdminContent>{children ? children : <Outlet />}</AdminContent>
      </AdminArea>
    </>
  )
}

export default Admin
