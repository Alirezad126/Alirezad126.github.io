const portfolio = {
  name: 'Alireza Daneshvar',
  tagline: 'Quantitative Analyst | AI/ML Engineer | Data Scientist',
  bio: 'I blend advanced mathematics, artificial intelligence, machine learning, and full-stack engineering to turn complex ideas into reliable real-world tools. My work focuses on building explainable models, production-ready ML systems, and clean interfaces for decision-making.',
  avatar: 'avatar.jpeg',
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
    slug: 'safe-rl-energy-hub',
    title: 'M.Sc. Thesis: Optimal Dispatch of an Energy Hub with Compressed Air Energy Storage',
    description:
      'A safe deep reinforcement learning method for optimizing energy hub operation while satisfying operational constraints.',
    tags: ['Reinforcement Learning', 'Energy Systems', 'Optimization'],
    image: '/projects/energy-hub.png',
    status: 'Research',
    githubUrl: '#',
    demoUrl: '#'
  },
  {
    slug: 'building-safe-rl-dpc',
    title: 'Learning to Control a Building With Safe Reinforcement Learning and Differentiable Predictive Control',
    description:
      'A safe reinforcement learning and differentiable predictive control project for controlling room temperature within comfort limits while respecting constraints.',
    tags: ['Safe RL', 'DPC', 'NeuroMANCER', 'Control', 'Python'],
    image: '/projects/building-safe-rl.png',
    status: 'GitHub',
    githubUrl: 'https://github.com/pnnl/neuromancer/blob/master/examples/domain_examples/RL_DPC_building_control.ipynb',
    demoUrl: '#'
  },
  {
    slug: 'rag-gpt-document-chatbot',
    title: 'RAG-GPT: Personalized Document Query Chatbot',
    description:
      'A retrieval-augmented chatbot that allows users to upload PDF documents and interactively query their content.',
    tags: ['RAG', 'LangChain',  'FastAPI'],
    image: 'https://miro.medium.com/v2/resize:fit:4800/format:webp/1*jtNZIbJ_MQc6u2TVt9QQAA.png',
    status: 'Live',
    githubUrl: 'https://github.com/Alirezad126/RAGBot',
    demoUrl: '#'
  },
  {
    slug: 'snake-dqn-agent',
    title: 'Reinforcement Learning Agent Playing PySnake Game',
    description:
      'A DQN-based reinforcement learning agent that learns to play a Snake game environment autonomously.',
    tags: ['Reinforcement Learning', 'PyTorch', 'Game AI'],
    image: 'https://www.coolmathgames.com/sites/default/files/Snake_OG-logo.jpg',
    status: 'Live',
    githubUrl: '#',
    demoUrl: '#'
  },
  {
    slug: 'personal-ai-chatbot',
    title: 'AI Chatbot with Retrieval-Augmented Generation',
    description:
      'A personalized AI chatbot that serves as a virtual representation of myself using portfolio and document data.',
    tags: ['RAG', 'Chatbot', 'Vector Database', ],
    image: '/projects/chatbot_title.jpg',
    status: 'Live',
    githubUrl: '#',
    demoUrl: '#'
  }
],  experience: [
  {
    company: 'Concordia University',
    role: 'Machine Learning Researcher',
    period: 'Oct 2025 – Present',
    bullets: [
      'Analyze large-scale oil and gas well datasets across Alberta to identify spatial and temporal patterns associated with surface casing vent flow and gas migration leakage.',
      'Develop statistical and machine learning models to predict leakage occurrence using geological, operational, and regulatory well-integrity features.',
      'Build probabilistic risk assessment workflows to support leakage-risk evaluation and environmental decision-making from historical testing data.'
    ]
  },
  {
    company: 'Johns Hopkins University',
    role: 'Machine Learning Researcher',
    period: 'Mar 2025 – Present',
    bullets: [
      'Conduct research on reinforcement learning, differentiable predictive control, and learning-based control methods for constrained dynamical systems.',
      'Contribute to NeuroMANCER, a PyTorch-based open-source scientific machine learning framework developed with PNNL collaborators.',
      'Implement mathematical solvers and learning-based optimization methods for safe control, model predictive control, and physics-informed machine learning applications.'
    ]
  },
  {
    company: 'Concordia University',
    role: 'Research Assistant',
    period: 'May 2021 – Apr 2023',
    bullets: [
      'Developed and validated a safe deep reinforcement learning framework for optimal energy-hub dispatch under operational constraints.',
      'Achieved near-optimal control performance with 2.7% error while maintaining constraint satisfaction in energy storage and energy management systems.',
      'Implemented regression-based models to approximate complex energy storage behavior, reaching an R² score of 0.993 and improving system-level predictive accuracy.',
      'Published a peer-reviewed journal article on safe reinforcement learning for energy hub optimization in the Journal of Energy Storage.'
    ]
  },
  {
    company: 'IranBar',
    role: 'Data Scientist',
    period: 'Jun 2019 – May 2020',
    bullets: [
      'Developed machine learning models for freight price prediction using historical shipment, bidding, and operational data.',
      'Reduced bidding time by 30% and improved agreement rates by 25% through regression-based pricing recommendations.',
      'Built scalable data pipelines with PySpark and SparkSQL to support continuous data processing and model training workflows.',
      'Applied MLOps practices including model versioning, CI/CD workflows, and retraining strategies to improve model reliability under changing market conditions.'
    ]
  }
],
  publications: [
  {
    title: 'Learning Safe Control Policies: Reinforcement Learning-Enabled Differentiable Predictive Control',
    venue: 'IFAC World Congress',
    year: '2026',
    url: '#'
  },
  {
    title: 'Differentiable Predictive Control with Sparse Dictionary Policies and Safe Online Adaptation',
    venue: 'In Progress',
    year: '2026',
    url: '#'
  },
  {
    title: 'Optimal Dispatch of an Energy Hub with Compressed Air Energy Storage: A Safe Reinforcement Learning Approach',
    venue: 'Journal of Energy Storage',
    year: '2022',
    url: 'https://doi.org/10.1016/j.est.2022.105488'
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
