// Single source of truth for site content. Keep it in sync with the CV.
const portfolio = {
  name: 'Alireza Daneshvar',
  fullName: 'Alireza Daneshvar Garmroodi',
  role: 'Machine Learning Engineer | Control & Optimization',
  bio: 'Machine learning engineer with over four years of research and industry experience. I work on data-driven decision making, control, and optimization, and I write code that other people can maintain.',
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
      title: 'Preprint out: Sparse Dictionary Differentiable Predictive Control',
      body: 'Submitted to the American Control Conference (ACC) 2027, with Ján Drgoňa.',
      href: 'https://solaris-jhu.github.io/SD-DPC-website/'
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
      href:'https://doi.org/10.1016/j.est.2022.106147'
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
        'Validation protocols checked against historical records, which exposed gaps in the underlying data. Presented at OMAE 2026.'
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
        'Benchmarked against MILP and deep RL, landing within 2.7% of optimal cost. Published in the Journal of Energy Storage.'
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
      url: 'https://solaris-jhu.github.io/SD-DPC-website/'
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
      url: 'https://doi.org/10.1016/j.est.2022.106147'
    }
  ],

  projects: [
    {
      slug: 'sd-dpc-sparse-dictionary-control',
      detail: true,
      // Runs in the browser from exported policies.
      live: true,
      title: 'SD-DPC: Sparse Dictionary Differentiable Predictive Control',
      description:
        'Feedback policies that stay small enough to read, learned by differentiating a control objective through a model identified from data. Every benchmark met its constraints, at 17 µs per step and under 0.1 kB per policy.',
      tags: ['Control', 'Machine Learning', 'PyTorch'],
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
        'My M.A.Sc. thesis. Energy hub dispatch posed as a constrained scheduling problem and solved with safe deep reinforcement learning, landing within 2.7% of the MILP optimum.',
      tags: ['Reinforcement Learning', 'Optimization', 'Energy', 'PyTorch'],
      image: '/projects/energy-hub.png',
      status: 'Research',
      githubUrl: '#'
    },
    {
      slug: 'building-safe-rl-dpc',
      detail: true,
      title: 'Building Control With Safe RL and Differentiable Predictive Control',
      description:
        'Two controllers trained through a differentiable building model and compared on energy use and comfort violations. The work was released as a NeuroMANCER example.',
      tags: ['Reinforcement Learning', 'Control', 'Energy', 'PyTorch'],
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
        'A Pyomo model run over a full year of load data, covering unit outputs, energy balance, and capacity limits for each candidate system configuration.',
      tags: ['Optimization', 'Energy', 'Python'],
      image: '/projects/dompark-building.jpg',
      status: 'Project',
      githubUrl: '#'
    },
    {
      slug: 'hvac-rl-forecast-control',
      title: 'Optimal HVAC Control With Reinforcement Learning and Forecast Inputs',
      description:
        'An EnergyPlus building wrapped as a Gym environment, with an LSTM forecasting weather and a DQN agent setting supply air flow. It used 10% less energy than the rule-based controller.',
      tags: ['Reinforcement Learning', 'Control', 'Energy', 'PyTorch'],
      image: '/projects/hvac-rl-control.svg',
      status: 'Project',
      githubUrl: '#'
    },
    {
      slug: 'ahu-fault-detection',
      detail: true,
      title: 'Fault Detection and Diagnosis of an HVAC Air Handling Unit',
      description:
        'Supervised classification on real HVAC sensor data from a single zone. Five models were compared under k-fold validation, scored on accuracy and ROC curves.',
      tags: ['Machine Learning', 'Python'],
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
        'A chatbot that answers questions about PDFs you upload, retrieving the relevant passages before it answers so the replies stay grounded in the document.',
      tags: ['Machine Learning', 'Python'],
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
        'An assistant that answers questions about my work, reading from my portfolio and documents rather than guessing.',
      tags: ['Machine Learning', 'Python'],
      image: '/projects/chatbot_title.jpg',
      status: 'Live',
      githubUrl: '#'
    },
    {
      slug: 'snake-dqn-agent',
      detail: true,
      // Runs the trained agent on AWS Lambda.
      live: true,
      title: 'Reinforcement Learning Agent Playing PySnake',
      description:
        'A deep Q-network that learned to play Snake on its own. Pick a board size and watch it play a full game.',
      tags: ['Reinforcement Learning', 'PyTorch'],
      image: 'https://www.coolmathgames.com/sites/default/files/Snake_OG-logo.jpg',
      githubUrl: '#'
    }
  ]
};

export default portfolio;
