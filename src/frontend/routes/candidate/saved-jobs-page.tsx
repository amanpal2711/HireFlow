'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { Bookmark, Calendar, DollarSign, MapPin, Briefcase } from 'lucide-react';
import { supabase } from '@/backend/supabase/client';
import { useRouter } from 'next/navigation';

interface SavedJob {
  id: string;
  job_id: string;
  title: string;
  company: string;
  location: string;
  salary?: string;
  salary_min?: number;
  salary_max?: number;
  job_type: string;
  posted_at: string;
  applied: boolean;
}

export default function SavedJobsPage() {
  useUser();
  const router = useRouter();
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'applied' | 'not_applied'>('all');

  const loadSavedJobs = async () => {
    try {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) return;

      // Get saved jobs from localStorage first
      const savedJobIds = JSON.parse(localStorage.getItem('savedJobs') || '[]');
      
      if (savedJobIds.length === 0) {
        setIsLoading(false);
        return;
      }

      // Get job details
      const { data: jobsData, error: jobsError } = await supabase
        .from('jobs')
        .select('*')
        .in('id', savedJobIds)
        .order('posted_at', { ascending: false });

      if (jobsError) throw jobsError;

      // Check which jobs have been applied to
      const { data: applications } = await supabase
        .from('applications')
        .select('job_id')
        .eq('user_id', authUser.id);

      const appliedJobIds = applications?.map(app => app.job_id) || [];

      // Combine data
      const combinedJobs = (jobsData || []).map(job => ({
        id: job.id,
        job_id: job.id,
        title: job.title,
        company: job.company,
        location: job.location,
        salary: job.salary,
        salary_min: job.salary_min,
        salary_max: job.salary_max,
        job_type: job.job_type,
        posted_at: job.posted_at,
        applied: appliedJobIds.includes(job.id)
      }));

      setSavedJobs(combinedJobs);
    } catch (error) {
      console.error('Error loading saved jobs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSavedJobs();
  }, []);

  const handleUnsaveJob = async (jobId: string) => {
    try {
      // Update localStorage
      const savedJobIds = JSON.parse(localStorage.getItem('savedJobs') || '[]');
      const updatedIds = savedJobIds.filter((id: string) => id !== jobId);
      localStorage.setItem('savedJobs', JSON.stringify(updatedIds));

      // Update state
      setSavedJobs(prev => prev.filter(job => job.job_id !== jobId));
    } catch (error) {
      console.error('Error unsaving job:', error);
    }
  };

  const handleApply = (job: SavedJob) => {
    router.push(`/candidate?apply=${job.job_id}`);
  };

  const formatSalary = (job: SavedJob) => {
    if (job.salary) return job.salary;
    
    if (job.salary_min && job.salary_max) {
      const avg = (job.salary_min + job.salary_max) / 2;
      if (avg >= 100000) {
        return `₹${(job.salary_min / 100000).toFixed(0)} - ${(job.salary_max / 100000).toFixed(0)} LPA`;
      } else {
        return `₹${job.salary_min.toLocaleString()} - ${job.salary_max.toLocaleString()} a month`;
      }
    }
    
    return null;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const filteredJobs = savedJobs.filter(job => {
    if (filter === 'applied') return job.applied;
    if (filter === 'not_applied') return !job.applied;
    return true;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-14">
        <div className="flex items-center justify-center min-h-[calc(100vh-56px)]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-14">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Saved jobs</h1>
          <p className="text-gray-600">
            {savedJobs.length} {savedJobs.length === 1 ? 'job' : 'jobs'} saved
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-6 mb-6 border-b border-gray-200">
          <button
            onClick={() => setFilter('all')}
            className={`pb-3 px-1 border-b-2 font-medium text-sm transition-colors ${
              filter === 'all'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            All ({savedJobs.length})
          </button>
          <button
            onClick={() => setFilter('applied')}
            className={`pb-3 px-1 border-b-2 font-medium text-sm transition-colors ${
              filter === 'applied'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Applied ({savedJobs.filter(job => job.applied).length})
          </button>
          <button
            onClick={() => setFilter('not_applied')}
            className={`pb-3 px-1 border-b-2 font-medium text-sm transition-colors ${
              filter === 'not_applied'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Not applied ({savedJobs.filter(job => !job.applied).length})
          </button>
        </div>

        {/* Jobs List */}
        {filteredJobs.length === 0 ? (
          <div className="text-center py-12">
            <Bookmark className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {filter === 'all' ? 'No saved jobs yet' : 
               filter === 'applied' ? 'No applied jobs' : 'No unapplied jobs'}
            </h3>
            <p className="text-gray-600 mb-6">
              {filter === 'all' ? 'Start saving jobs you\'re interested in to see them here.' :
               'Jobs in this category will appear here.'}
            </p>
            {filter === 'all' && (
              <button
                onClick={() => router.push('/candidate')}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Browse jobs
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <div
                key={job.job_id}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {job.title}
                    </h3>
                    <p className="text-gray-600 mb-2">{job.company}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </div>
                      {formatSalary(job) && (
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          <span className="text-green-700">{formatSalary(job)}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {job.job_type}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      Posted {formatDate(job.posted_at)}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {job.applied ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Applied ✓
                      </span>
                    ) : (
                      <button
                        onClick={() => handleApply(job)}
                        className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
                      >
                        Apply Now
                      </button>
                    )}
                    
                    <button
                      onClick={() => handleUnsaveJob(job.job_id)}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                      title="Remove from saved"
                    >
                      <Bookmark className="w-5 h-5 fill-current" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
