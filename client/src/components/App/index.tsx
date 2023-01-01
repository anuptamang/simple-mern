import { Suspense, lazy } from 'react'
import ScrollToTop from '../UI/ScrollToTop'

const AppRouter = lazy(() => import('../../routes/AppRouter'))

function App() {
  return (
    <>
      <Suspense fallback={null}>
        <ScrollToTop />
        <AppRouter />
      </Suspense>
    </>
  )
}

export default App
