'use client';

import { useState, useRef, useEffect } from 'react';
import { X, Upload, FileText, AlertCircle } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { supabase } from '@/backend/supabase/client';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: string;
  job_type: string;
  description?: string;
}

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job;
  onApplicationSuccess: () => void;
}

export default function ApplyModal({ isOpen, onClose, job, onApplicationSuccess }: ApplyModalProps) {
  const { user } = useUser();
    const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [resume, setResume] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [hasResume, setHasResume] = useState(false);
  const [resumeUrl, setResumeUrl] = useState('');

  // Check if user already has a resume on file
  useEffect(() => {
    const checkExistingResume = async (): Promise<void> => {
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        if (!authUser) return;

        const { data: profile } = await supabase
          .from('profiles')
          .select('resume_url')
          .eq('user_id', authUser.id)
          .single();

        if (profile?.resume_url) {
          setHasResume(true);
          setResumeUrl(profile.resume_url);
        }
      } catch (error) {
        console.error('Error checking resume:', error);
      }
    };

    if (isOpen) {
      checkExistingResume();
    }
  }, [isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === 'application/pdf') {
        setResume(file);
        setError('');
      } else {
        setError('Please upload a PDF file');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) throw new Error('User not authenticated');

      let resumeToUse = resumeUrl;

      // Upload new resume if provided
      if (resume) {
        const fileName = `resumes/${authUser.id}/${Date.now()}-${resume.name}`;
        const { error: uploadError } = await supabase.storage
          .from('resumes')
          .upload(fileName, resume);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('resumes')
          .getPublicUrl(fileName);

        resumeToUse = publicUrl;

        // Update profile with new resume
        await supabase
          .from('profiles')
          .update({ resume_url: resumeToUse })
          .eq('user_id', authUser.id);
      }

      // Check if already applied
      const { data: existingApplication } = await supabase
        .from('applications')
        .select('id')
        .eq('user_id', authUser.id)
        .eq('job_id', job.id)
        .single();

      if (existingApplication) {
        setError('You have already applied to this job');
        setIsSubmitting(false);
        return;
      }

      // Create application
      const { error: applicationError } = await supabase
        .from('applications')
        .insert({
          user_id: authUser.id,
          job_id: job.id,
          company: job.company,
          job_title: job.title,
          resume_url: resumeToUse,
          cover_letter: coverLetter,
          phone: phone,
          status: 'Applied',
          applied_at: new Date().toISOString()
        });

      if (applicationError) throw applicationError;

      // Update job applications count
      await supabase.rpc('increment_applications_count', { job_id: job.id });

      // Create notification
      await supabase
        .from('notifications')
        .insert({
          user_id: authUser.id,
          title: 'Application submitted!',
          message: `Your application to ${job.company} has been submitted successfully.`,
          type: 'application',
          link: '/candidate/applications'
        });

      onApplicationSuccess();
      onClose();
      
      // Show success toast (you can implement this with a toast library)
      alert(`✓ Application submitted to ${job.company}!`);
      
    } catch (error) {
      console.error('Application error:', error);
      setError('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Apply to {job.company}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Resume Section */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Resume</h3>
            
            {hasResume && !resume ? (
              <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-green-900">
                      ✓ Resume on file
                    </p>
                    <p className="text-xs text-green-700">
                      {resumeUrl.split('/').pop()}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Change
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-sm text-gray-600 mb-2">
                  Upload your resume (PDF only)
                </p>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Choose file
                </button>
                {resume && (
                  <p className="mt-2 text-sm text-green-600">
                    Selected: {resume.name}
                  </p>
                )}
              </div>
            )}
            
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Cover Letter */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Cover letter (optional)
            </label>
            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Tell the employer why you're a great fit for this position..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Confirm Details */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm your details</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={`${user?.firstName || ''} ${user?.lastName || ''}`}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={user?.primaryEmailAddress?.emailAddress || ''}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={isSubmitting || (!hasResume && !resume)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Submitting...' : 'Submit application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
