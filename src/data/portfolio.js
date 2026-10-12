// Single source of truth for site content. Keep it in sync with the CV.
const portfolio = {
  name: 'Alireza Daneshvar',
  fullName: 'Alireza Daneshvar Garmroodi',
  role: 'Machine Learning Engineer | Control & Optimization',
  bio: 'Machine learning engineer with 4+ years of research and industry experience across different fields. My focus is data-driven decision making, control, and optimization, and developing and maintaining production code.',
  bioLong:
    'I write Python, SQL and PySpark, build optimization models with Pyomo and Gurobi, and track experiments in MLflow. Research at Johns Hopkins University and Concordia University has trained me to work independently on open-ended problems, from framing the model to delivering a tested result.',
  avatar: '/avatar.jpeg',
  cvUrl: '/cv.pdf',

  contact: {
    email: 'alireza.dg1998@gmail.com',
    github: 'https://github.com/Alirezad126',
    linkedin: 'https://www.linkedin.com/in/ali-reza-daneshvar-garmroodi-910ba4194',
    location: 'Hamilton, Ontario, Canada'
  },

  // Newest first. `date` is rendered as "Mon YYYY"; `href` is optional.
  news: [
    {
      date: '2026-10',
      tag: 'Preprint',
      title: 'Preprint: SD-DPC — Sparse Dictionary Differentiable Predictive Control',
      body: 'Submitted to the American Control Conference (ACC) 2027, with Ján Drgoňa.',
      href: 'https://arxiv.org/abs/2610.02466'
    },
    {
      date: '2026-07',
      tag: 'Conference',
      title: 'Learning Safe Control Policies presented at the IFAC World Congress',
      body: 'Reinforcement learning-enabled differentiable predictive control, with collaborators at UC Berkeley and PNNL.'
    },
    {
      date: '2026-03',
      tag: 'Conference',
      title: 'Well-leakage risk modelling presented at OMAE 2026',
      body: 'A hurdle model for probabilistic leakage risk built from noisy historical well-integrity records.',
      href: 'https://asmedigitalcollection.asme.org/OMAE/proceedings-abstract/OMAE2026/89589/1236398'
    },
    {
      date: '2025-10',
      tag: 'Position',
      title: 'Joined Concordia University as a Machine Learning Researcher',
      body: 'Probabilistic modelling of well leakage risk from noisy time-series records, and validation protocols that expose gaps in the underlying data.'
    },
    {
      date: '2025-02',
      tag: 'Position',
      title: 'Started machine learning research with Johns Hopkins University',
      body: 'Differentiable predictive control for constrained systems, contributing differentiable optimization components to NeuroMANCER.',
      href: 'https://github.com/pnnl/neuromancer'
    },
    {
      date: '2022-09',
      tag: 'Paper',
      title: 'Published in the Journal of Energy Storage',
      body: 'Optimal dispatch of an energy hub with compressed air energy storage using a safe reinforcement learning approach.',
      href: 'https://doi.org/10.1016/j.est.2022.105488'
    }
  ],

  skills: [
    {
      category: 'Programming',
      items: ['Python', 'C++', 'Bash', 'SQL', 'JavaScript']
    },
    {
      category: 'Optimization & Control',
      items: ['Pyomo', 'Gurobi', 'CasADi', 'IPOPT', 'NeuroMANCER']
    },
    {
      category: 'Machine Learning',
      items: [
        'PyTorch',
        'TensorFlow',
        'scikit-learn',
        'Hugging Face',
        'OpenCV',
        'OpenAI Gym'
      ]
    },
    {
      category: 'Data Engineering',
      items: ['pandas', 'NumPy', 'PySpark', 'PostgreSQL', 'Snowflake', 'Databricks']
    },
    {
      category: 'MLOps & Deployment',
      items: ['Docker', 'FastAPI', 'Flask', 'MLflow', 'Git', 'GitHub Actions', 'AWS']
    },
    {
      category: 'Web',
      items: ['React', 'HTML5', 'Tailwind CSS']
    }
  ],

  experience: [
    {
      company: 'Concordia University',
      role: 'Machine Learning Researcher',
      location: 'Montreal, QC, Canada',
      period: 'Oct 2025 – Present',
      bullets: [
        'Build probabilistic models of well leakage risk from noisy time-series records with a hurdle (classify, then regress) model.',
        'Define validation protocols against historical records that expose gaps in the underlying data; presented at OMAE 2026.'
      ]
    },
    {
      company: 'Johns Hopkins University',
      role: 'Machine Learning Researcher',
      location: 'Remote, United States',
      period: 'Feb 2025 – Present',
      bullets: [
        'Develop differentiable predictive control (DPC) methods that turn constrained optimization problems into control policies evaluated in a single forward pass, enabling fast real-time decisions.',
        'Design sparse, interpretable control policies with safe online adaptation, trained end to end through physics-based dynamics.',
        'Build benchmarks comparing MPC and learning-based controllers on closed-loop performance and constraint satisfaction.',
        'Contribute differentiable optimization components to NeuroMANCER (PNNL) via pull requests and code review.'
      ]
    },
    {
      company: 'Concordia University',
      role: 'Research Assistant',
      location: 'Montreal, QC, Canada',
      period: 'May 2021 – Apr 2023',
      bullets: [
        'Formulated energy hub dispatch with compressed air energy storage as a constrained scheduling problem that minimizes operating cost, solved with a safe deep RL method combining primal-dual optimization and imitation learning.',
        "Built regression surrogates that linearize the storage system's thermodynamics to keep long-horizon optimization tractable.",
        'Benchmarked against MILP and deep RL, within 2.7% of optimal cost; published in the Journal of Energy Storage.'
      ]
    },
    {
      company: 'IranBar',
      role: 'Data Scientist',
      location: 'Tehran, Iran',
      period: 'Jun 2019 – May 2020',
      bullets: [
        'Shipped price-prediction models into production, cutting quotation time 30% and raising agreement rates 25%.',
        'Built data pipelines with PySpark, pandas, and SQL to pre-process large-scale freight datasets for model training.',
        'Maintained deployed models with versioning, CI/CD, monitoring, and scheduled retraining.'
      ]
    }
  ],

  education: [
    {
      school: 'Concordia University',
      degree: 'M.A.Sc. in Building Engineering',
      note: 'GPA 4.1 / 4.3 · Outstanding Thesis',
      location: 'Montreal, QC, Canada',
      period: 'Jan 2021 – Apr 2023'
    },
    {
      school: 'Iran University of Science and Technology',
      degree: 'B.A.Sc. in Mechanical Engineering',
      note: 'Ranked 5th in cohort',
      location: 'Tehran, Iran',
      period: 'Sep 2016 – Aug 2020'
    }
  ],

  publications: [
    {
      title: 'SD-DPC: Sparse Dictionary Differentiable Predictive Control',
      authors: 'A. Daneshvar Garmroodi, J. Drgoňa',
      venue: 'Submitted to the American Control Conference (ACC)',
      year: '2027',
      url: 'https://arxiv.org/abs/2610.02466'
    },
    {
      title:
        'Learning Safe Control Policies: Reinforcement Learning-Enabled Differentiable Predictive Control',
      authors: 'T. Banker, A. Daneshvar Garmroodi, N. Lawrence, J. Drgoňa, A. Mesbah',
      venue: 'IFAC World Congress',
      year: '2026',
      url: '#'
    },
    {
      title:
        "From Reports to Risk Assessment: Insights and Gaps in Alberta's SCVF and GM Records",
      venue: 'ASME International Conference on Ocean, Offshore and Arctic Engineering (OMAE)',
      year: '2026',
      url: 'https://asmedigitalcollection.asme.org/OMAE/proceedings-abstract/OMAE2026/89589/1236398'
    },
    {
      title:
        'Optimal Dispatch of an Energy Hub with Compressed Air Energy Storage: A Safe Reinforcement Learning Approach',
      authors: 'A. Daneshvar Garmroodi, F. Nasiri, F. Haghighat',
      venue: 'Journal of Energy Storage',
      year: '2022',
      url: 'https://doi.org/10.1016/j.est.2022.105488'
    }
  ],

  projects: [
    {
      slug: 'sd-dpc-sparse-dictionary-control',
      detail: true,
      title: 'SD-DPC: Sparse Dictionary Differentiable Predictive Control',
      description:
        'Sparse, interpretable feedback policies learned by differentiating a constrained predictive-control objective through a SINDy model — constraints satisfied on every benchmark at 17 µs and under 0.1 kB per policy.',
      tags: ['Differentiable Predictive Control', 'SINDy', 'NeuroMANCER', 'PyTorch'],
      image: '/projects/sddpc-method.png',
      imageFit: 'contain',
      status: 'Preprint',
      githubUrl: 'https://github.com/SOLARIS-JHU/SD-DPC'
    },
    {
      slug: 'safe-rl-energy-hub',
      detail: true,
      title: 'Optimal Dispatch of an Energy Hub with Compressed Air Energy Storage',
      description:
        'M.A.Sc. thesis. Energy hub dispatch posed as a constrained scheduling problem and solved with safe deep RL, within 2.7% of the MILP optimum.',
      tags: ['Safe RL', 'Optimization', 'Energy Systems', 'PyTorch'],
      image: '/projects/energy-hub.png',
      status: 'Research',
      githubUrl: '#'
    },
    {
      slug: 'building-safe-rl-dpc',
      detail: true,
      title: 'Building Control With Safe RL and Differentiable Predictive Control',
      description:
        'Primal-dual DDPG and a DPC policy trained through a differentiable building model, compared on energy use and constraint violations. Released as a NeuroMANCER example.',
      tags: ['Safe RL', 'DPC', 'NeuroMANCER', 'PyTorch'],
      image: '/projects/building-safe-rl.jpg',
      status: 'Open Source',
      githubUrl:
        'https://github.com/pnnl/neuromancer/blob/master/examples/domain_examples/RL_DPC_building_control.ipynb'
    },
    {
      slug: 'dompark-energy-optimization',
      detail: true,
      title: 'Operational Cost Optimization of the Dompark Complex Energy System',
      description:
        'A Pyomo mathematical program over a full year of load data: unit outputs, energy-balance constraints, and capacity limits across candidate system configurations.',
      tags: ['Optimization', 'Pyomo', 'Energy Systems'],
      image: '/projects/dompark-building.jpg',
      status: 'Project',
      githubUrl: '#'
    },
    {
      slug: 'hvac-rl-forecast-control',
      title: 'Optimal HVAC Control With Reinforcement Learning and Forecast Inputs',
      description:
        'An EnergyPlus building wrapped as a Gym environment, an LSTM forecasting weather inputs, and a DQN agent setting supply air flow — 10% less energy than a rule-based controller.',
      tags: ['Reinforcement Learning', 'EnergyPlus', 'PyTorch'],
      image: '/projects/hvac-rl-control.svg',
      status: 'Project',
      githubUrl: '#'
    },
    {
      slug: 'ahu-fault-detection',
      detail: true,
      title: 'Fault Detection and Diagnosis of an HVAC Air Handling Unit',
      description:
        'Supervised classification on real single-zone HVAC sensor data, comparing Decision Tree, Random Forest, SVM, KNN, and Naive Bayes under k-fold validation and ROC/AUC.',
      tags: ['Machine Learning', 'scikit-learn'],
      image: '/projects/ahu-schematic.png',
      imageFit: 'contain',
      status: 'Project',
      githubUrl: '#'
    },
    {
      slug: 'rag-gpt-document-chatbot',
      detail: true,
      title: 'RAG-GPT: Personalized Document Query Chatbot',
      description:
        'A retrieval-augmented chatbot that lets users upload PDFs and query their content, built with LangChain, FastAPI, and a vector store.',
      tags: ['RAG', 'LangChain', 'FastAPI'],
      image:
        'https://miro.medium.com/v2/resize:fit:4800/format:webp/1*jtNZIbJ_MQc6u2TVt9QQAA.png',
      status: 'Live',
      githubUrl: 'https://github.com/Alirezad126/RAGBot'
    },
    {
      slug: 'personal-ai-chatbot',
      detail: true,
      title: 'AI Chatbot with Retrieval-Augmented Generation',
      description:
        'A personalized assistant that answers questions about my work from portfolio and document data.',
      tags: ['RAG', 'Chatbot', 'Vector Database'],
      image: '/projects/chatbot_title.jpg',
      status: 'Live',
      githubUrl: '#'
    },
    {
      slug: 'snake-dqn-agent',
      detail: true,
      title: 'Reinforcement Learning Agent Playing PySnake',
      description:
        'A DQN agent that learns to play a Snake environment autonomously.',
      tags: ['Reinforcement Learning', 'PyTorch'],
      image: 'https://www.coolmathgames.com/sites/default/files/Snake_OG-logo.jpg',
      status: 'Live',
      githubUrl: '#'
    }
  ]
};

export default portfolio;
