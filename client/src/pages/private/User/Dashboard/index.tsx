import { Helmet } from 'react-helmet';
import DashboardSection from '../../../../features/DashboardSection';

const Dashboard = () => {
  return (
    <>
      <Helmet>
        <title>User Dashboard | My App</title>
      </Helmet>
      <DashboardSection />
    </>
  );
};

export default Dashboard;
