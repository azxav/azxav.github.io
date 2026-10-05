export type ProjectKind = "personal" | "competition";

export interface ProjectLink {
  label: string;
  href: string;
}

export interface ProjectSection {
  heading: string;
  items: string[];
}

export interface ProjectTodo {
  title: string;
  body: string;
  items: string[];
}

export interface ProjectStat {
  value: string;
  label: string;
}

export interface Project {
  slug: string;
  title: string;
  kind: ProjectKind;
  summary: string;
  repo: string;
  links?: ProjectLink[];
  paragraphs: string[];
  sections?: ProjectSection[];
  stack?: string[];
  stat?: ProjectStat;
  stats?: ProjectStat[];
  todo?: ProjectTodo;
}

export const kindLabel: Record<ProjectKind, string> = {
  personal: "Personal",
  competition: "Competition",
};

/**
 * Display order is array order.
 * Add a project by appending one object. The site picks it up on the
 * home index, the projects page, and /projects/[slug]/.
 */
export const projects: Project[] = [
  {
    slug: "2brain",
    title: "2Brain",
    kind: "personal",
    summary:
      "Corporate AI assistant with a managed memory layer, permission-aware retrieval, and cited answers.",
    repo: "https://github.com/azxav/2brain-techawards",
    links: [{ label: "2brainai.tech", href: "https://2brainai.tech" }],
    paragraphs: [
      "I built 2Brain as a corporate AI assistant with a managed memory layer. Retrieval is permission-aware, and agents cite sources or say when evidence is missing.",
      "Notes, documents, conversations, and connected sources land in one place people and agents can query, instead of a chat that forgets where an answer came from.",
      "The memory layer uses gbrain (MIT).",
    ],
    stack: ["Bun", "PGLite", "Postgres", "pgvector", "MCP"],
  },
  {
    slug: "agent-platform",
    title: "Agent Platform",
    kind: "personal",
    summary:
      "Multi-agent LangGraph platform with per-run cost caps, pack registry, and golden evals (mock LLM).",
    repo: "https://github.com/azxav/agent-platform",
    paragraphs: [
      "I put together this multi-agent FastAPI service: packs, SSE streaming, and a hard cost cap on every run. Packs I keep in the demo are research_analysis, meeting_prep, and financial_memo (sample only — not a bank product).",
      "908 tests pass. Golden evals are 10/10 with the mock model.",
      "MIT code from Brescou/langgraph-agent-stack is credited in the repo.",
    ],
    stack: ["Python", "FastAPI", "LangGraph", "Prometheus", "Docker"],
  },
  {
    slug: "bank-doc-rag",
    title: "Bank Doc RAG",
    kind: "personal",
    summary:
      "Multilingual bank-document RAG with LangGraph, Qdrant citations, and an offline demo.",
    repo: "https://github.com/azxav/bank-doc-rag",
    paragraphs: [
      "I built a retrieval assistant over synthetic bank-style documents in Uzbek, Russian, and English. A LangGraph flow pulls passages from Qdrant and the answer has to cite them. Not affiliated with any bank.",
      "The demo runs offline without API keys. OpenRouter is optional for live models.",
      "Validation is partial. The test split did not run after OpenRouter returned 402, so I do not claim a full RAGAS score.",
    ],
    stack: ["Python", "FastAPI", "LangGraph", "Qdrant", "Docker"],
  },
  {
    slug: "kaggle-s6e3",
    title: "Kaggle S6E3",
    kind: "competition",
    summary: "Predict Customer Churn. Rank 57 of 4,142, score 0.91824.",
    repo: "https://github.com/azxav/kaggle-S6E3",
    links: [
      {
        label: "Competition",
        href: "https://www.kaggle.com/competitions/playground-series-s6e3",
      },
    ],
    stats: [
      { value: "57 / 4,142", label: "Leaderboard rank" },
      { value: "0.91824", label: "Score" },
    ],
    paragraphs: [
      "Kaggle Playground Series S6E3 entry: predict the probability that a customer churns. Scoring is ROC-AUC.",
      "Leaderboard rank 57 of 4,142, with score 0.91824.",
      "Feature-family sweeps, GBDTs, tabular deep nets, DVAE features, and stacking.",
    ],
  },
  {
    slug: "kgmon",
    title: "KGMON",
    kind: "personal",
    summary:
      "Automation for a Kaggle competition, from the workspace through a guarded submission.",
    repo: "https://github.com/azxav/kgmon",
    paragraphs: [
      "Codex-compatible plugin that runs a Kaggle competition as a repeatable local workflow: workspace, checks, experiments, and packaging. Platform access wraps the vendored shepsci/kaggle-skill.",
      "It builds a competition workspace, profiles the data, plans validation, and blocks that plan when leakage guards fire. Experiments record lineage. Ensemble search and a final package follow. Submission stays guarded and asks for confirmation.",
    ],
    sections: [
      {
        heading: "Workflow",
        items: [
          "Bootstrap a competition workspace and capture the rules",
          "Profile train, test, and sample files, and infer the task contract",
          "Plan validation folds and stop when leakage risk is high",
          "Run experiments, search ensembles, and write a final package",
          "Push a notebook and submit only with an explicit confirmation",
        ],
      },
    ],
    stack: ["Python", "Typer", "SQLite", "MCP"],
  },
  {
    slug: "orbit-wars",
    title: "Orbit Wars",
    kind: "personal",
    summary:
      "Behavioral cloning from replays to a board-level policy and an exportable agent.",
    repo: "https://github.com/azxav/orbit_warsv2",
    paragraphs: [
      "Behavioral-cloning pipeline for Orbit Wars. Replay JSON becomes a dataset. A neural policy trains on that dataset. A checkpoint exports to a single Python file that can be submitted.",
      "The policy is an encoder–decoder with attention. Training checkpoints store weights, optimizer state, and RNG state so a run can resume. The repository does not report match results, so this page does not either.",
    ],
    sections: [
      {
        heading: "Steps",
        items: [
          "Build a dataset from replay JSON, with a held-out slice",
          "Validate unmatched and ambiguous labels",
          "Train the behavioral-cloning policy",
          "Evaluate a checkpoint",
          "Export a runnable Python agent",
        ],
      },
    ],
    stack: ["Python", "PyTorch"],
  },
  {
    slug: "traffic-vision",
    title: "Traffic Vision",
    kind: "personal",
    summary:
      "Fixed-camera traffic event detection with YOLO11s, ByteTrack, and junction rules.",
    repo: "https://github.com/azxav/traffic-vision",
    paragraphs: [
      "Offline event detection on a fixed camera. Marks congestion, failure to yield, and red-light running, and sketches a causal accident-risk score.",
      "A hand-labelled junction is registered to the first frame. YOLO11s and ByteTrack run every third frame. Temporal rules then read motion, lane, queue, and signal features. The risk score combines time-to-collision, hard braking, and movement on a red signal.",
      "That risk curve is an experimental baseline. The development set has no accident labels, so it is not calibrated. Sample-set notes and timing live in the repository; this page does not repeat them.",
    ],
    sections: [
      {
        heading: "Pipeline",
        items: [
          "Register a hand-labelled reference scene to each video’s first frame.",
          "Run YOLO11s and ByteTrack every third frame, and restore source coordinates after downscaling.",
          "Extract smoothed motion, lane, road, queue, crosswalk, and stop-line features.",
          "Apply temporal rules for congestion, yielding conflicts, and red-light running.",
          "Score causal risk from time-to-collision, hard braking, and red-signal movement.",
        ],
      },
    ],
    stack: ["Python", "YOLO11s", "ByteTrack", "PyTorch"],
  },
  {
    slug: "kuairand",
    title: "KuaiRand",
    kind: "personal",
    summary:
      "Two-stage recommender. Calibrated CatBoost ranker AUC 0.644 vs 0.572 for popularity.",
    repo: "https://github.com/azxav/recsys_kuirand",
    paragraphs: [
      "Two-stage recommender on the KuaiRand dataset. Retrieval proposes candidates. A ranker orders them. A small service returns the slate.",
      "Retrieval uses implicit ALS, BPR, and a PyTorch two-tower model. Ranking uses CatBoost. The API is FastAPI. Redis Streams log impressions for a worker, with ClickHouse, Postgres, and Qdrant in the stack, and MLflow for runs.",
      "On the unbiased random-policy log, the calibrated CatBoost ranker reaches AUC 0.644, against 0.572 for popularity.",
    ],
    sections: [
      {
        heading: "Service",
        items: [
          "POST /v1/events and POST /v1/recommend",
          "Similar items, plus experiment create, read, and assign",
          "Health, readiness, and metrics endpoints",
          "Recommend responses include objective scores, blend features, and candidate count",
        ],
      },
    ],
    stack: [
      "Python",
      "FastAPI",
      "CatBoost",
      "PyTorch",
      "Redis",
      "ClickHouse",
      "Postgres",
      "Qdrant",
      "MLflow",
    ],
  },
];

const slugs = new Set<string>();

for (const project of projects) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.slug)) {
    throw new Error(`Project slug is not url-safe: ${project.slug}`);
  }
  if (slugs.has(project.slug)) {
    throw new Error(`Duplicate project slug: ${project.slug}`);
  }
  slugs.add(project.slug);
  if (!project.repo.startsWith("https://github.com/azxav/")) {
    throw new Error(`Project repo must be an azxav GitHub URL: ${project.slug}`);
  }
  if (!project.title.trim() || !project.summary.trim() || project.paragraphs.length === 0) {
    throw new Error(`Project is missing copy: ${project.slug}`);
  }
}
