const portfolio = {
  name: 'Alireza Daneshvar',
  tagline: 'Quantitative Analyst | AI/ML Engineer | Data Scientist',
  bio: 'I blend advanced mathematics, artificial intelligence, machine learning, and full-stack engineering to turn complex ideas into reliable real-world tools. My work focuses on building explainable models, production-ready ML systems, and clean interfaces for decision-making.',
  avatar: 'public/1745210232896.jpeg',
  cvUrl: '/cv.pdf',
  stats: {
    yearsExperience: 4
  },
  skills: [
    {
      category: 'Languages',
      items: ['Python', 'SQL', 'JavaScript', 'C++', 'Bash']
    },
    {
      category: 'ML & AI',
      items: ['PyTorch', 'Scikit-learn', 'Transformers', 'Reinforcement Learning', 'Computer Vision']
    },
    {
      category: 'Data & MLOps',
      items: ['Pandas', 'Spark', 'MLflow', 'Docker', 'FastAPI']
    },
    {
      category: 'Cloud & Web',
      items: ['AWS', 'Azure', 'React', 'Tailwind CSS', 'PostgreSQL']
    }
  ],
  projects: [
    {
      title: 'Leakage Risk Sequence Model',
      description: 'An LSTM-based framework that combines well operation histories and static features to predict leakage risk and flow severity.',
      tags: ['Deep Learning', 'Time Series', 'Risk Modeling'],
      githubUrl: 'https://github.com/yourname/leakage-risk-model',
      demoUrl: 'https://your-demo-link.com',
      image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=1200&q=80',
      featured: true
    },
    {
      title: 'RAG Research Assistant',
      description: 'A retrieval-augmented chatbot that indexes technical documents and answers questions with grounded context.',
      tags: ['NLP', 'RAG', 'LLM'],
      githubUrl: 'https://github.com/yourname/rag-assistant',
      demoUrl: 'https://your-demo-link.com',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80',
      featured: true
    },
    {
      title: 'RL Control Playground',
      description: 'A collection of reinforcement learning experiments for safe control, policy learning, and constrained optimization.',
      tags: ['Reinforcement Learning', 'Control', 'Optimization'],
      githubUrl: 'https://github.com/yourname/rl-control-playground',
      demoUrl: '',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      featured: false
    },
    {
      title: 'Vision Defect Detector',
      description: 'A computer vision pipeline for detecting visual defects using transfer learning and model monitoring.',
      tags: ['Computer Vision', 'MLOps'],
      githubUrl: 'https://github.com/yourname/vision-defect-detector',
      demoUrl: '',
      image: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1200&q=80',
      featured: false
    },
    {
      title: 'Quant Signal Lab',
      description: 'A research-style dashboard for experimenting with market signals, factor features, and backtesting ideas.',
      tags: ['Quant', 'Data Visualization'],
      githubUrl: 'https://github.com/yourname/quant-signal-lab',
      demoUrl: '',
      image: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&w=1200&q=80',
      featured: false
    }
  ],
  experience: [
    {
      company: 'Research Lab',
      role: 'Machine Learning Engineer',
      period: '2024 - Present',
      bullets: [
        'Built sequence models for noisy industrial datasets with sparse labels and imbalanced outcomes.',
        'Designed experiment tracking workflows for model comparison, reproducibility, and error analysis.',
        'Created dashboards and technical reports to communicate model behavior to researchers and stakeholders.'
      ]
    },
    {
      company: 'AI Product Studio',
      role: 'Full-Stack ML Developer',
      period: '2022 - 2024',
      bullets: [
        'Developed FastAPI services for ML inference and integrated them with React-based product interfaces.',
        'Containerized applications with Docker and deployed models to cloud environments.',
        'Implemented data validation and monitoring workflows for production ML pipelines.'
      ]
    }
  ],
  publications: [
    {
      title: 'Safe Reinforcement Learning for Energy System Optimization',
      venue: 'Journal of Energy Storage',
      year: '2024',
      url: 'https://example.com/publication'
    }
  ],
  contact: {
    email: 'hello@example.com',
    github: 'https://github.com/yourname',
    linkedin: 'https://linkedin.com/in/yourname',
    twitter: 'https://twitter.com/yourname'
  }
};

export default portfolio;
