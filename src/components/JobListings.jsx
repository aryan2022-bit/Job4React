import React from 'react'
import { useState, useEffect } from 'react';
import JobListing from './JobListing';
import Spinner from './Spinner';


const JobListings = ({isHome = false}) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        let data;
        const local = localStorage.getItem('jobs');
        if (local) {
          data = JSON.parse(local);
        } else {
          const res = await fetch('/jobs.json');
          data = await res.json();
          localStorage.setItem('jobs', JSON.stringify(data));
        }
        // If on home page, limit to 3 jobs
        setJobs(isHome ? data.slice(0, 3) : data);
      } catch (error) {
        console.log('Error fetching data!', error);
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, [])

    return (
    // {/* <!-- Browse Jobs --> */}
      <section className="bg-blue-50 px-4 py-10">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
            { isHome ? 'Recent Jobs' : 'Browse Jobs'}
          </h2>

            { loading ? ( <Spinner loading = {loading}/> ): (
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {jobs.map((job) => (
              <JobListing key = {job.id} job = { job }  /> 
            ))}
              </div>
            )}
            

          
        </div>
      </section>
  )
}

export default JobListings
