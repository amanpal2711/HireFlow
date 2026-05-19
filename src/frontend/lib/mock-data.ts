export interface Job {
  id: string
  title: string
  company: string
  companyLogo: string
  location: string
  type: 'full-time' | 'part-time' | 'contract' | 'internship'
  experience: 'entry' | 'mid' | 'senior' | 'lead'
  salaryMin: number
  salaryMax: number
  postedDate: string
  skills: string[]
  description: string
  requirements: string[]
  responsibilities: string[]
  remote: boolean
  aiMatch: number
  easyApply: boolean
  department: string
  industry: string
  companySize: string
  deadline: string
}

export interface Company {
  id: string
  name: string
  logo: string
  website: string
  industry: string
  founded: number
  size: string
  hq: string
  description: string
  culture: string[]
  benefits: string[]
  rating: number
  reviewCount: number
  followers: number
  photos: string[]
}

export interface Review {
  id: string
  company: string
  rating: number
  role: string
  pros: string[]
  cons: string[]
  date: string
  helpful: number
}

export interface Salary {
  id: string
  role: string
  company: string
  location: string
  base: number
  total: number
  experience: string
  date: string
}

export interface User {
  id: string
  name: string
  email: string
  role: 'candidate' | 'employer'
  avatar?: string
  profile?: {
    title?: string
    location?: string
    experience?: string
    skills?: string[]
    resume?: string
    bio?: string
    company?: string
  }
}

export const jobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechMahindra',
    companyLogo: '/companies/techmahindra.svg',
    location: 'Bengaluru, Karnataka',
    type: 'full-time',
    experience: 'senior',
    salaryMin: 1800000,
    salaryMax: 2800000,
    postedDate: '2024-04-15',
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
    description: 'We are looking for a skilled Frontend Developer to join our dynamic team and help build amazing user experiences.',
    requirements: ['5+ years of experience in frontend development', 'Strong proficiency in React and TypeScript', 'Experience with modern CSS frameworks', 'Understanding of responsive design principles'],
    responsibilities: ['Develop and maintain web applications', 'Collaborate with design and backend teams', 'Optimize applications for maximum speed and scalability', 'Write clean, maintainable code'],
    remote: true,
    aiMatch: 92,
    easyApply: true,
    department: 'Engineering',
    industry: 'IT Services',
    companySize: '10000+',
    deadline: '2024-05-15'
  },
  {
    id: '2',
    title: 'Product Manager',
    company: 'Flipkart',
    companyLogo: '/companies/flipkart.svg',
    location: 'Mumbai, Maharashtra',
    type: 'full-time',
    experience: 'mid',
    salaryMin: 2500000,
    salaryMax: 3500000,
    postedDate: '2024-04-14',
    skills: ['Product Strategy', 'Analytics', 'Agile', 'Stakeholder Management'],
    description: 'Join our product team to drive innovation and create exceptional customer experiences for millions of users.',
    requirements: ['3-5 years of product management experience', 'Strong analytical and problem-solving skills', 'Experience with agile methodologies', 'Excellent communication skills'],
    responsibilities: ['Define product vision and strategy', 'Work with engineering teams to deliver features', 'Analyze user feedback and data', 'Collaborate with cross-functional teams'],
    remote: false,
    aiMatch: 88,
    easyApply: false,
    department: 'Product',
    industry: 'E-commerce',
    companySize: '5000-10000',
    deadline: '2024-05-01'
  },
  {
    id: '3',
    title: 'UX Designer',
    company: 'Swiggy',
    companyLogo: '/companies/swiggy.svg',
    location: 'Delhi, NCR',
    type: 'full-time',
    experience: 'mid',
    salaryMin: 1200000,
    salaryMax: 2000000,
    postedDate: '2024-04-13',
    skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
    description: 'We are seeking a talented UX Designer to create intuitive and delightful user experiences for our food delivery platform.',
    requirements: ['3+ years of UX design experience', 'Proficiency in Figma and design tools', 'Strong portfolio of design projects', 'Understanding of user-centered design principles'],
    responsibilities: ['Create wireframes and prototypes', 'Conduct user research and testing', 'Design and maintain design systems', 'Collaborate with product and engineering teams'],
    remote: true,
    aiMatch: 85,
    easyApply: true,
    department: 'Design',
    industry: 'Food Tech',
    companySize: '5000-10000',
    deadline: '2024-04-30'
  },
  {
    id: '4',
    title: 'Backend Engineer',
    company: 'Zomato',
    companyLogo: '/companies/zomato.svg',
    location: 'Pune, Maharashtra',
    type: 'full-time',
    experience: 'senior',
    salaryMin: 2000000,
    salaryMax: 3000000,
    postedDate: '2024-04-12',
    skills: ['Node.js', 'MongoDB', 'AWS', 'Microservices'],
    description: 'Looking for an experienced Backend Engineer to build scalable systems that power our restaurant discovery and food delivery platform.',
    requirements: ['4+ years of backend development experience', 'Strong knowledge of Node.js and databases', 'Experience with cloud services', 'Understanding of system design'],
    responsibilities: ['Design and develop backend services', 'Optimize database performance', 'Implement security best practices', 'Participate in code reviews'],
    remote: false,
    aiMatch: 90,
    easyApply: false,
    department: 'Engineering',
    industry: 'Food Tech',
    companySize: '5000-10000',
    deadline: '2024-05-10'
  },
  {
    id: '5',
    title: 'Data Scientist',
    company: 'Ola Cabs',
    companyLogo: '/companies/ola.svg',
    location: 'Bengaluru, Karnataka',
    type: 'full-time',
    experience: 'senior',
    salaryMin: 2200000,
    salaryMax: 3200000,
    postedDate: '2024-04-11',
    skills: ['Python', 'Machine Learning', 'SQL', 'Data Visualization'],
    description: 'Join our data science team to build ML models that optimize ride allocation and improve customer experience.',
    requirements: ['4+ years of data science experience', 'Strong programming skills in Python', 'Experience with ML frameworks', 'Knowledge of statistical analysis'],
    responsibilities: ['Build and deploy ML models', 'Analyze large datasets', 'Create data visualizations', 'Collaborate with product teams'],
    remote: true,
    aiMatch: 87,
    easyApply: true,
    department: 'Data Science',
    industry: 'Transportation',
    companySize: '5000-10000',
    deadline: '2024-05-05'
  },
  {
    id: '6',
    title: 'Marketing Manager',
    company: 'Paytm',
    companyLogo: '/companies/paytm.svg',
    location: 'Noida, Uttar Pradesh',
    type: 'full-time',
    experience: 'mid',
    salaryMin: 1500000,
    salaryMax: 2200000,
    postedDate: '2024-04-10',
    skills: ['Digital Marketing', 'Campaign Management', 'Analytics', 'Content Strategy'],
    description: 'We are looking for a creative Marketing Manager to drive our digital marketing initiatives and brand growth.',
    requirements: ['3-5 years of marketing experience', 'Experience with digital marketing channels', 'Strong analytical skills', 'Creative thinking'],
    responsibilities: ['Develop marketing campaigns', 'Manage social media presence', 'Analyze campaign performance', 'Collaborate with sales team'],
    remote: false,
    aiMatch: 82,
    easyApply: true,
    department: 'Marketing',
    industry: 'Fintech',
    companySize: '10000+',
    deadline: '2024-04-28'
  }
]

export const companies: Company[] = [
  {
    id: '1',
    name: 'TechMahindra',
    logo: '/companies/techmahindra.svg',
    website: 'https://www.techmahindra.com',
    industry: 'IT Services',
    founded: 1986,
    size: '10000+',
    hq: 'Pune, Maharashtra',
    description: 'TechMahindra is a leading provider of digital transformation, consulting, and business reengineering services.',
    culture: ['Innovation', 'Collaboration', 'Customer Focus', 'Continuous Learning'],
    benefits: ['Health Insurance', 'Flexible Work', 'Training Programs', 'Performance Bonus'],
    rating: 4.2,
    reviewCount: 3420,
    followers: 45000,
    photos: ['/photos/techmahindra-1.jpg', '/photos/techmahindra-2.jpg', '/photos/techmahindra-3.jpg']
  },
  {
    id: '2',
    name: 'Flipkart',
    logo: '/companies/flipkart.svg',
    website: 'https://www.flipkart.com',
    industry: 'E-commerce',
    founded: 2007,
    size: '5000-10000',
    hq: 'Bengaluru, Karnataka',
    description: 'Flipkart is India\'s largest e-commerce marketplace, offering a wide range of products across categories.',
    culture: ['Customer Obsession', 'Innovation', 'Bias for Action', 'Ownership'],
    benefits: ['Stock Options', 'Health Coverage', 'Flexible Hours', 'Learning Budget'],
    rating: 4.5,
    reviewCount: 5678,
    followers: 120000,
    photos: ['/photos/flipkart-1.jpg', '/photos/flipkart-2.jpg', '/photos/flipkart-3.jpg']
  },
  {
    id: '3',
    name: 'Swiggy',
    logo: '/companies/swiggy.svg',
    website: 'https://www.swiggy.com',
    industry: 'Food Tech',
    founded: 2014,
    size: '5000-10000',
    hq: 'Bengaluru, Karnataka',
    description: 'Swiggy is India\'s leading online food ordering and delivery platform, delivering happiness to millions.',
    culture: ['Speed', 'Innovation', 'Customer First', 'Team Work'],
    benefits: ['Free Meals', 'Health Insurance', 'Gym Membership', 'ESOPs'],
    rating: 4.3,
    reviewCount: 2890,
    followers: 67000,
    photos: ['/photos/swiggy-1.jpg', '/photos/swiggy-2.jpg', '/photos/swiggy-3.jpg']
  }
]

export const reviews: Review[] = [
  {
    id: '1',
    company: 'TechMahindra',
    rating: 4,
    role: 'Senior Software Engineer',
    pros: ['Great work-life balance', 'Good learning opportunities', 'Supportive management'],
    cons: ['Slow career growth', 'Bureaucratic processes'],
    date: '2024-03-15',
    helpful: 234
  },
  {
    id: '2',
    company: 'Flipkart',
    rating: 5,
    role: 'Product Manager',
    pros: ['Amazing work culture', 'Great compensation', 'Impactful projects'],
    cons: ['Long working hours during sales'],
    date: '2024-03-10',
    helpful: 567
  }
]

export const salaries: Salary[] = [
  {
    id: '1',
    role: 'Frontend Developer',
    company: 'TechMahindra',
    location: 'Bengaluru',
    base: 1800000,
    total: 2200000,
    experience: '4 years',
    date: '2024-03-01'
  },
  {
    id: '2',
    role: 'Product Manager',
    company: 'Flipkart',
    location: 'Bengaluru',
    base: 2800000,
    total: 3500000,
    experience: '5 years',
    date: '2024-02-15'
  }
]

export const categories = [
  'Engineering',
  'Design',
  'Marketing',
  'Product',
  'Sales',
  'Data Science',
  'Operations',
  'HR',
  'Finance',
  'Customer Support'
]

export const locations = [
  'Bengaluru',
  'Mumbai',
  'Delhi NCR',
  'Pune',
  'Hyderabad',
  'Chennai',
  'Kolkata',
  'Ahmedabad',
  'Jaipur',
  'Chandigarh',
  'Remote'
]

export const skills = [
  'React',
  'TypeScript',
  'Node.js',
  'Python',
  'Java',
  'AWS',
  'Docker',
  'Kubernetes',
  'MongoDB',
  'PostgreSQL',
  'Figma',
  'Adobe Creative Suite',
  'Agile',
  'Scrum',
  'Machine Learning',
  'Data Analysis',
  'Digital Marketing',
  'SEO',
  'Content Writing',
  'Project Management'
]
