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
    slug: "traffic-vision",
    title: "Traffic Vision",
    kind: "personal",
    summary:
      "Fixed-camera traffic event detection with YOLO11s, ByteTrack, and junction rules.",
    repo: "https://github.com/azxav/traffic-vision",
    paragraphs: [
      "Traffic Vision is a personal project for offline event detection on a fixed camera. It marks congestion, failure to yield, and red-light running, and it sketches a causal accident-risk score.",
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
      "Two-stage recommender MVP: retrieval, a CatBoost ranker, and a FastAPI service.",
    repo: "https://github.com/azxav/recsys_kuirand",
    paragraphs: [
      "A personal recommender MVP on the KuaiRand dataset. Retrieval proposes candidates. A ranker orders them. A small service returns the slate.",
      "Retrieval uses implicit ALS, BPR, and a PyTorch two-tower model. Ranking uses CatBoost. The API is FastAPI. Redis Streams log impressions for a worker, with ClickHouse, Postgres, and Qdrant in the stack, and MLflow for runs.",
      "This is an MVP, not a production traffic system. No offline or online metrics are stated here because the repository README does not report them.",
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
  {
    slug: "kaggle-s6e3",
    title: "Kaggle S6E3",
    kind: "competition",
    summary: "Predict Customer Churn. Rank 57 of 4,143.",
    repo: "https://github.com/azxav/kaggle-S6E3",
    links: [
      {
        label: "Competition",
        href: "https://www.kaggle.com/competitions/playground-series-s6e3",
      },
    ],
    stat: { value: "57 / 4,143", label: "Leaderboard rank" },
    paragraphs: [
      "Personal entry in Kaggle Playground Series S6E3, Predict Customer Churn. The public task is to predict the probability that a customer churns. Submissions are scored with ROC-AUC.",
      "The only result this site reports is the rank on the résumé: 57 of 4,143.",
    ],
    todo: {
      title: "Approach",
      body: "The repository README does not describe the model, features, or validation. Nothing here should be read as a method write-up.",
      items: [
        "Model, features, and validation setup",
        "What to say about the 57 / 4,143 result in an interview",
      ],
    },
  },
  {
    slug: "2brain",
    title: "2Brain",
    kind: "personal",
    summary:
      "Corporate AI assistant with a managed memory layer, built on licensed gbrain.",
    repo: "https://github.com/azxav/2brain-techawards",
    paragraphs: [
      "2Brain is a corporate AI assistant with a managed memory layer. Notes, documents, conversations, and connected sources become a shared record that people and agents can query, with citations and access controls, instead of a chat that forgets where an answer came from.",
      "The public repository is an incubation edition built on Garry Tan’s licensed gbrain. Command-line names stay gbrain so the project remains compatible with that source. The license is MIT, and the copyright notice from the licensed snapshot is kept.",
    ],
    stack: ["Bun", "PGLite", "Postgres", "pgvector", "MCP"],
    todo: {
      title: "What I built",
      body: "The product above describes the assistant. It does not list what Azizbek added on top of the licensed gbrain source. That list is not in the materials used to build this site.",
      items: [
        "Modules, changes, or product behavior he authored",
        "What he would demo in an interview",
      ],
    },
  },
  {
    slug: "kgmon",
    title: "KGMON",
    kind: "personal",
    summary:
      "Automation for a Kaggle competition, from the workspace through a guarded submission.",
    repo: "https://github.com/azxav/kgmon",
    paragraphs: [
      "KGMON is a personal, Codex-compatible plugin for running a Kaggle competition as a repeatable workflow. Platform access wraps the vendored shepsci/kaggle-skill. The rest is a local spine for the workspace, checks, experiments, and packaging.",
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
      "A personal behavioral-cloning pipeline for Orbit Wars. Replay JSON becomes a dataset. A neural policy trains on that dataset. A checkpoint exports to a single Python file that can be submitted.",
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
