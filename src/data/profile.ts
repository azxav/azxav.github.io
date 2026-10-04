export const profile = {
  name: "Azizbek Xasanov",
  title: "AI & ML engineer",
  location: "Tashkent",
  email: "azxav000@gmail.com",
  github: "https://github.com/azxav",
  githubHandle: "azxav",
  linkedin: "https://www.linkedin.com/in/azizbek-xasanov/",
  site: "https://azxav.github.io",
  education: {
    school: "New Uzbekistan University",
    credential: "Bachelor of AI & Robotics",
    years: "2024–2028",
  },
  roles: [
    {
      org: "SATashkent",
      title: "AI & ML developer",
      dates: "June 2025 – December 2025",
      year: "2025",
      bullets: [
        "Worked on an adaptive testing system that selects a set of questions so students can improve their skills and knowledge more efficiently.",
        "Worked on VideoExplanation, which generates an animation video from an input SAT question so the question is easier to understand.",
      ],
    },
    {
      org: "Mutolaa",
      title: "AI & ML developer",
      dates: "September 2024 – December 2024",
      year: "2024",
      bullets: [
        "Focused on developing a retrieval-augmented generation (RAG) system.",
        "Worked with a fairseq model on automatic data preparation for training a text-to-speech model.",
      ],
    },
  ],
  skills: {
    technical: ["Python", "ML algorithms", "PyTorch", "Keras", "Scikit-learn"],
    tools: ["Google Cloud", "AWS", "MLflow", "MongoDB", "FastAPI", "Docker", "Git"],
  },
  languages: [
    { name: "English", level: "C1" },
    { name: "Russian", level: null },
  ],
  certifications: [
    "The Machine Learning Process A–Z, 365 Data Science",
    "Scientific Computing with Python, freeCodeCamp",
    "Google Cloud Skill Boost, Google Developers Central Asia",
    "Data Analysis with Python, freeCodeCamp",
  ],
  honours: [
    "URBAN.TECH Hackathon, 1st place in INDUSTRY TECH",
    "Ideathon at the 4th World Conference on Creative Economy, honourable mention",
    "CBU coding challenge, 3rd place",
    "Kaggle S6E3, rank 57 of 4,142",
  ],
} as const;
