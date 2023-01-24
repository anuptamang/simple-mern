import React from 'react';
import TasksSection from '../../../features/TasksSection';
import { Helmet } from 'react-helmet';

const Tasks = () => {
  return <>
<Helmet>
        <title>Tasks Manage Area | My App</title>
      </Helmet>

<TasksSection />;
  </>
  
};

export default Tasks;
