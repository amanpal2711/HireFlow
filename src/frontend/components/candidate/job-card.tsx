'use client';

import { Bookmark, ThumbsUp, MapPin, Briefcase, DollarSign } from 'lucide-react';

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
}

interface JobCardProps {
  job: Job;
  isSelected: boolean;
  onSelect: (job: Job) => void;
  onSaveJob: (jobId: string) => void;
  onDismissJob: (jobId: string) => void;
  savedJobs: string[];
  dismissedJobs: string[];
}

export default function JobCard({ 
  job, 
  isSelected, 
  onSelect, 
  onSaveJob, 
  onDismissJob, 
  savedJobs, 
  dismissedJobs 
}: JobCardProps) {
  const isSaved = savedJobs.includes(job.id);
  const isNewJob = new Date(job.posted_at) > new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);

  const formatSalary = (job: Job) => {
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

  const getBenefitsToShow = () => {
    const allBenefits = [...(job.benefits || []), ...(job.nice_to_have || []), ...(job.skills || [])];
    return allBenefits.slice(0, 3);
  };

  const getAdditionalBenefitsCount = () => {
    const allBenefits = [...(job.benefits || []), ...(job.nice_to_have || []), ...(job.skills || [])];
    return Math.max(0, allBenefits.length - 3);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSaveJob(job.id);
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDismissJob(job.id);
  };

  if (dismissedJobs.includes(job.id)) {
    return null;
  }

  return (
    <div
      className={`bg-white border rounded-lg p-4 mb-2 cursor-pointer transition-all ${
        isSelected 
          ? 'border-l-3 border-l-[#2557a7] border-[#2557a7]' 
          : 'border-[#e4e2e0] hover:shadow-md'
      }`}
      onClick={() => onSelect(job)}
    >
      {/* Top row with badges and action buttons */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex gap-2 flex-wrap">
          {job.easy_apply && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Easily apply
            </span>
          )}
          {isNewJob && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
              New
            </span>
          )}
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={handleBookmark}
            className={`p-1 rounded hover:bg-gray-100 transition-colors ${
              isSaved ? 'text-blue-600' : 'text-gray-400'
            }`}
            title={isSaved ? 'Remove from saved' : 'Save job'}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={handleDismiss}
            className="p-1 rounded hover:bg-gray-100 transition-colors text-gray-400"
            title="Dismiss job"
          >
            <ThumbsUp className="w-4 h-4 rotate-180" />
          </button>
        </div>
      </div>

      {/* Main job content */}
      <div className="mb-3">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{job.title}</h3>
        <p className="text-sm text-gray-600 mb-1">{job.company}</p>
        <div className="flex items-center gap-3 text-sm text-gray-600">
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
        </div>
      </div>

      {/* Job type and benefits */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
            <Briefcase className="w-3 h-3 mr-1" />
            {job.job_type}
          </span>
        </div>

        {getBenefitsToShow().length > 0 && (
          <div className="flex flex-wrap gap-1">
            {getBenefitsToShow().map((benefit, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-50 text-gray-600 border border-gray-200"
              >
                {benefit}
              </span>
            ))}
            {getAdditionalBenefitsCount() > 0 && (
              <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-50 text-gray-600 border border-gray-200">
                +{getAdditionalBenefitsCount()} more
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
