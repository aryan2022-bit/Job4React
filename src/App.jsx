import { 
  Route, createBrowserRouter, 
  createRoutesFromElements, RouterProvider 
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import JobsPage from './pages/JobsPage';
import NotFoundPage from './pages/NotFoundPage';
import JobPage, { jobLoader } from './pages/JobPage';
import AddJobPage from './pages/AddJobPage';
import EditJobPage from './pages/EditJobPage';

const App = () => {
  // Get jobs from localStorage or fetch from json
  const getJobs = async () => {
    const local = localStorage.getItem('jobs');
    if (local) {
      return JSON.parse(local);
    } else {
      const res = await fetch('/jobs.json');
      const jobs = await res.json();
      localStorage.setItem('jobs', JSON.stringify(jobs));
      return jobs;
    }
  };

  //Add New Job
  const addJob = async (newJob) => {
    const jobs = await getJobs();
    const updatedJobs = [...jobs, { ...newJob, id: Date.now().toString() }];
    localStorage.setItem('jobs', JSON.stringify(updatedJobs));
    return;
  }

  //Delete Job
  const deleteJob = async (id) => {
    const jobs = await getJobs();
    const updatedJobs = jobs.filter(job => job.id !== id);
    localStorage.setItem('jobs', JSON.stringify(updatedJobs));
    return;
  }

  //Update Job
  const updateJob = async (job) => {
    const jobs = await getJobs();
    const updatedJobs = jobs.map(j => j.id === job.id ? job : j);
    localStorage.setItem('jobs', JSON.stringify(updatedJobs));
    return;
  }

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
      <Route index element={<HomePage />}/>
      <Route path='/jobs' element={<JobsPage/>}/>
      <Route path='/add-job' element={<AddJobPage addJobSubmit={addJob} />}/>
      <Route path='/edit-job/:id' element={<EditJobPage updateJobSubmit={updateJob}/>} loader={jobLoader} />
      <Route path='/jobs/:id' element={<JobPage deleteJob={deleteJob}/>} loader={jobLoader} />
      <Route path='*' element={<NotFoundPage/>}/>
    </Route> 
   )
)

  return <RouterProvider 
  router={router} 
  fallbackElement={<div>Please wait, fetching jobs....</div>}
  />
}

export default App
