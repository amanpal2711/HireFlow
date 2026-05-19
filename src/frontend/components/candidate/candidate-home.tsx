'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { Search, MapPin } from 'lucide-react';
import CandidateNavbar from './candidate-navbar';
import JobCard from './job-card';
import JobDetailPanel from './job-detail-panel';
import ApplyModal from './apply-modal';
import { supabase } from '@/backend/supabase/client';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: string;
  salary_min?: number;
  salary_max?: number;
  job_type: string;
  easy_apply: boolean;
  posted_at: string;
  benefits?: string[];
  skills?: string[];
  nice_to_have?: string[];
  description?: string;
  company_website?: string;
  work_mode?: string;
  experience_level?: string;
  company_size?: string;
  industry?: string;
  rating?: number;
}

export default function CandidateHome() {
  const { user } = useUser();
  const [jobs, setJobs] = useState<Job[]>([]);
  
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [savedJobs, setSavedJobs] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('savedJobs');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [dismissedJobs, setDismissedJobs] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const dismissed = localStorage.getItem('dismissedJobs');
      return dismissed ? JSON.parse(dismissed) : [];
    }
    return [];
  });
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load user's profile location
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        if (!authUser) return;

        const { data: profile } = await supabase
          .from('profiles')
          .select('location')
          .eq('user_id', authUser.id)
          .single();

        if (profile?.location) {
          setLocation(profile.location);
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    };

    loadProfile();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);

        // Fetch jobs with company information
        const { data, error } = await supabase
          .from('jobs')
          .select(`
            *,
            companies (
              id, name, slug, logo_url, 
              website, industry, company_size
            )
          `)
          .eq('status', 'active')
          .order('created_at', { ascending: false })
          .limit(20);

        if (error) {
          console.error('Error fetching jobs:', error);
          setError(error.message);
          return;
        }

        setJobs(data || []);
        if (data && data.length > 0) {
          setSelectedJob(data[0]);
        }

      } catch (err: unknown) {
        console.error('Error loading jobs:', err);
        setError(err instanceof Error ? err.message : 'Failed to load jobs');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
    }
  }, [savedJobs]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('dismissedJobs', JSON.stringify(dismissedJobs));
    }
  }, [dismissedJobs]);

  const handleSaveJob = (jobId: string) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const handleDismissJob = (jobId: string) => {
    setDismissedJobs(prev => [...prev, jobId]);
    // If dismissed job is selected, select next available job
    if (selectedJob?.id === jobId) {
      const availableJobs = getFilteredJobs().filter(job => 
        !dismissedJobs.includes(job.id) && job.id !== jobId
      );
      if (availableJobs.length > 0) {
        setSelectedJob(availableJobs[0]);
      }
    }
  };

  const handleApply = (job: Job) => {
    setSelectedJob(job);
    setShowApplyModal(true);
  };

  const handleApplicationSubmit = async (resumeFile?: File, coverLetter?: string) => {
    if (!selectedJob || !user) return;

    try {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) return;

      let resumeUrl = '';
      if (resumeFile) {
        const fileName = `resumes/${authUser.id}/${Date.now()}-${resumeFile.name}`;
        const { error: uploadError } = await supabase.storage
          .from('resumes')
          .upload(fileName, resumeFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('resumes')
          .getPublicUrl(fileName);

        resumeUrl = publicUrl;
      }

      // Create application
      const { error: applicationError } = await supabase
        .from('applications')
        .insert({
          user_id: authUser.id,
          job_id: selectedJob.id,
          resume_url: resumeUrl,
          cover_letter: coverLetter || '',
        });

      if (applicationError) throw applicationError;

      // Create notification
      await supabase
        .from('notifications')
        .insert({
          user_id: authUser.id,
          title: 'Application Submitted',
          message: `You successfully applied for ${selectedJob.title} at ${selectedJob.company}`,
          type: 'success',
          job_id: selectedJob.id,
        });

      setAppliedJobs(prev => [...prev, selectedJob.id]);
      setShowApplyModal(false);
      
      // Show success message
      alert('Application submitted successfully!');
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Error submitting application. Please try again.');
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search logic would be implemented here
    console.log('Searching for:', searchQuery, location);
  };

  const getFilteredJobs = () => {
    let filtered = jobs;

    // Apply filter
    if (activeFilter !== 'All') {
      switch (activeFilter) {
        case 'Easy Apply':
          filtered = filtered.filter(job => job.easy_apply);
          break;
        case 'Remote':
          filtered = filtered.filter(job => 
            job.work_mode?.toLowerCase().includes('remote')
          );
          break;
        case 'Full-time':
          filtered = filtered.filter(job => 
            job.job_type.toLowerCase().includes('full-time')
          );
          break;
        case 'Internship':
          filtered = filtered.filter(job => 
            job.job_type.toLowerCase().includes('internship')
          );
          break;
        case '₹5L+ LPA':
          filtered = filtered.filter(job => 
            (job.salary_min && job.salary_min >= 500000) ||
            (job.salary_max && job.salary_max >= 500000)
          );
          break;
      }
    }

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (location) {
      filtered = filtered.filter(job =>
        job.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    return filtered;
  };

  const filters = ['All', 'Easy Apply', 'Remote', 'Full-time', 'Internship', '₹5L+ LPA'];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <CandidateNavbar />
        <div className="pt-14 flex items-center justify-center min-h-[calc(100vh-56px)]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading jobs...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {error && (
        <div style={{
          background: '#fee2e2', 
          color: '#dc2626',
          padding: '16px',
          margin: '16px',
          borderRadius: '8px',
          fontFamily: 'monospace'
        }}>
          <strong>Error:</strong> {error}
        </div>
      )}
      
      <CandidateNavbar />

      {/* Hero Search Section */}
      <div className="bg-gradient-to-b from-[#f3f2f1] to-white pt-16 pb-6">
        <div className="max-w-6xl mx-auto px-6">
          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex w-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="flex-1 flex items-center px-4 border-r border-gray-200">
                <Search className="w-5 h-5 text-gray-400 mr-3" />
                <input
                  type="text"
                  placeholder="Job title, keywords, or company"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 py-3 outline-none text-gray-900 placeholder-gray-500"
                />
              </div>
              <div className="flex-1 flex items-center px-4">
                <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                <input
                  type="text"
                  placeholder="City, state, zip code, or remote"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="flex-1 py-3 outline-none text-gray-900 placeholder-gray-500"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-[#2557a7] text-white font-medium hover:bg-[#1e4385] transition-colors"
              >
                Find jobs
              </button>
            </div>
          </form>

          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900">
              Welcome, {user?.firstName || 'there'}!
            </h2>
          </div>
        </div>
      </div>

      {/* Main Content - Split Layout */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex gap-6">
          {/* Left Column - Job List */}
          <div className="w-[45%]">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Jobs for you</h3>
              
              {/* Filter Pills */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                      activeFilter === filter
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto">
              {jobs.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p className="mb-2">No jobs found in database.</p>
                  <p className="text-sm">Please run the SQL setup script to populate jobs data.</p>
                </div>
              ) : getFilteredJobs().length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No jobs found matching your criteria.</p>
                </div>
              ) : (
                getFilteredJobs().map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    isSelected={selectedJob?.id === job.id}
                    onSelect={setSelectedJob}
                    onSaveJob={handleSaveJob}
                    onDismissJob={handleDismissJob}
                    savedJobs={savedJobs}
                    dismissedJobs={dismissedJobs}
                  />
                ))
              )}
            </div>
          </div>

          {/* Right Column - Job Details */}
          <div className="w-[55%]">
            {selectedJob ? (
              <JobDetailPanel
                job={selectedJob}
                onSaveJob={handleSaveJob}
                onDismissJob={handleDismissJob}
                onApply={handleApply}
                savedJobs={savedJobs}
                hasApplied={appliedJobs.includes(selectedJob.id)}
              />
            ) : (
              <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
                <p className="text-gray-500">Select a job to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      {selectedJob && (
        <ApplyModal
          isOpen={showApplyModal}
          onClose={() => setShowApplyModal(false)}
          job={selectedJob}
          onApplicationSuccess={handleApplicationSubmit}
        />
      )}
    </div>
  );
}
