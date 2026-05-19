'use client';

import { useState } from 'react';
import { 
  ExternalLink, 
  Bookmark, 
  ThumbsUp, 
  Share2, 
  MapPin, 
  DollarSign, 
  Briefcase, 
  Globe, 
  BarChart,
  ChevronDown,
  ChevronUp,
  Building,
  Star
} from 'lucide-react';

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

interface JobDetailPanelProps {
  job: Job;
  onSaveJob: (jobId: string) => void;
  onDismissJob: (jobId: string) => void;
  onApply: (job: Job) => void;
  savedJobs: string[];
  hasApplied: boolean;
}

export default function JobDetailPanel({ 
  job, 
  onSaveJob, 
  onDismissJob, 
  onApply, 
  savedJobs,
  hasApplied 
}: JobDetailPanelProps) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showJobDetails, setShowJobDetails] = useState(true);
  const [showAboutCompany, setShowAboutCompany] = useState(true);
  const [copiedUrl, setCopiedUrl] = useState(false);

  const isSaved = savedJobs.includes(job.id);

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

  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    } catch (error) {
      console.error('Failed to copy URL:', error);
    }
  };

  const handleBookmark = () => {
    onSaveJob(job.id);
  };

  const handleDismiss = () => {
    onDismissJob(job.id);
  };

  const truncateDescription = (text: string, maxLength: number = 200) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? 'fill-yellow-400 text-yellow-400' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="bg-white border border-[#e4e2e0] rounded-lg p-6 sticky top-16 max-h-[calc(100vh-80px)] overflow-y-auto">
      {/* Job Title and Company */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h1>
        <div className="flex items-center gap-2 mb-2">
          {job.company_website ? (
            <a
              href={job.company_website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              {job.company}
              <ExternalLink className="w-4 h-4" />
            </a>
          ) : (
            <span className="text-gray-700">{job.company}</span>
          )}
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {job.location}
          </div>
          {formatSalary(job) && (
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              {formatSalary(job)}
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => onApply(job)}
          disabled={hasApplied}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
            hasApplied
              ? 'bg-green-600 text-white cursor-not-allowed'
              : 'bg-[#2557a7] text-white hover:bg-[#1e4385]'
          }`}
        >
          {hasApplied ? 'Applied ✓' : 'Apply with HireFlow'}
        </button>
        
        <button
          onClick={handleBookmark}
          className={`p-3 border rounded-lg transition-colors ${
            isSaved
              ? 'border-blue-600 text-blue-600 bg-blue-50'
              : 'border-gray-300 text-gray-600 hover:bg-gray-50'
          }`}
          title={isSaved ? 'Remove from saved' : 'Save job'}
        >
          <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
        </button>
        
        <button
          onClick={handleDismiss}
          className="p-3 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
          title="Dismiss job"
        >
          <ThumbsUp className="w-5 h-5 rotate-180" />
        </button>
        
        <button
          onClick={handleShare}
          className="p-3 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors relative"
          title="Share job"
        >
          <Share2 className="w-5 h-5" />
          {copiedUrl && (
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
              Copied!
            </span>
          )}
        </button>
      </div>

      {/* Job Details Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-gray-900">Job details</h2>
          <a
            href="/candidate/profile"
            className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            Here's how the job details align with your profile
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="space-y-3">
          {formatSalary(job) && (
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Pay</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-green-700 bg-green-100 px-2 py-1 rounded">
                  ✓ {formatSalary(job)}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          )}

          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Job type</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-green-700 bg-green-100 px-2 py-1 rounded">
                ✓ {job.job_type}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          {job.work_mode && (
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Work mode</span>
              </div>
              <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                {job.work_mode}
              </span>
            </div>
          )}

          {job.experience_level && (
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <BarChart className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Experience</span>
              </div>
              <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                {job.experience_level}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Full Job Description */}
      {job.description && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-gray-900">Full job description</h2>
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              {showFullDescription ? 'Show less' : 'Show more'}
              {showFullDescription ? (
                <ChevronUp className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          </div>
          
          <div className="text-sm text-gray-700 leading-relaxed">
            {showFullDescription ? (
              <div dangerouslySetInnerHTML={{ __html: job.description }} />
            ) : (
              <div>
                {truncateDescription(job.description)}
                {job.description.length > 200 && (
                  <button
                    onClick={() => setShowFullDescription(true)}
                    className="text-blue-600 hover:text-blue-700 ml-1"
                  >
                    Show more
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* About the Company */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-gray-900">About the company</h2>
          <button
            onClick={() => setShowAboutCompany(!showAboutCompany)}
            className="text-gray-400 hover:text-gray-600"
          >
            {showAboutCompany ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>

        {showAboutCompany && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-900">{job.company}</span>
            </div>
            
            {(job.industry || job.company_size) && (
              <div className="text-sm text-gray-600">
                {job.industry && <span>{job.industry}</span>}
                {job.industry && job.company_size && <span> · </span>}
                {job.company_size && <span>{job.company_size}</span>}
              </div>
            )}

            {job.rating && (
              <div className="flex items-center gap-2">
                <div className="flex">{renderStars(job.rating)}</div>
                <span className="text-sm text-gray-600">{job.rating.toFixed(1)}</span>
              </div>
            )}

            {job.company_website && (
              <a
                href={job.company_website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                Visit website
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
