import { ReactElement, Suspense, lazy } from 'react'
import { Outlet } from 'react-router'
import { ToastContainer } from 'react-toastify'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { Wrapper } from '../../components/UI/Wrapper'
// import Main from '../../components/UI/Wrapper/Main'
import Loading from '../../components/UI/Loading'
import PageHolder from '../../components/UI/Wrapper/PageHolder'

const Main = lazy(() => import('../../components/UI/Wrapper/Main'))

type Iprops = {
  children?: ReactElement
}

const General = ({ children }: Iprops) => {
  return (
    <>
      <Wrapper>
        <Header />
        <PageHolder>
          <Suspense fallback={<Loading />}>
            <Main>{children ? children : <Outlet />}</Main>
          </Suspense>
        </PageHolder>
        <Footer />
        <ToastContainer />
      </Wrapper>
    </>
  )
}

export default General
