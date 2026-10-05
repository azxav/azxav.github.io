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
      "A corporate assistant people can ask about notes and documents, with permissions and cited sources.",
    repo: "https://github.com/azxav/2brain-techawards",
    links: [{ label: "2brainai.tech", href: "https://2brainai.tech" }],
    paragraphs: [
      "Project by Azizbek (azxav). A corporate assistant people can ask about their work. It keeps notes, documents, conversations, and connected sources in one place, and only shows what each person is allowed to see.",
      "Answers point back to those sources, or say when the assistant does not know. The memory layer uses gbrain.",
    ],
    stack: ["Bun", "PGLite", "Postgres", "pgvector", "MCP"],
  },
  {
    slug: "agent-platform",
    title: "Agent Platform",
    kind: "personal",
    summary:
      "Platform where several AI agents work together on one job, with a hard spend limit per run.",
    repo: "https://github.com/azxav/agent-platform",
    paragraphs: [
      "Project by Azizbek (azxav). A platform where several AI agents work together on one job, with a hard limit on how much each run can spend.",
      "Ready-made packs handle research write-ups, meeting prep, and a sample finance memo. Progress streams live as the run goes.",
    ],
    stack: ["Python", "FastAPI", "LangGraph", "Prometheus", "Docker"],
  },
  {
    slug: "bank-doc-rag",
    title: "Bank Doc RAG",
    kind: "personal",
    summary:
      "Assistant that answers questions about bank-style documents in Uzbek, Russian, and English.",
    repo: "https://github.com/azxav/bank-doc-rag",
    paragraphs: [
      "Project by Azizbek (azxav). An assistant that answers questions about bank-style documents in Uzbek, Russian, and English — the kind of policies and forms a bank might keep on file.",
      "It finds the relevant passages first, then writes an answer that points back to those places in the documents.",
    ],
    stack: ["Python", "FastAPI", "LangGraph", "Qdrant", "Docker"],
  },
  {
    slug: "uzbek-voice-agent",
    title: "Uzbek Voice Agent",
    kind: "personal",
    summary:
      "Turns spoken Uzbek into text from an uploaded audio file, with an optional live room.",
    repo: "https://github.com/azxav/uzbek-voice-agent",
    stats: [
      { value: "14.29%", label: "WER on 7 unique FLEURS uz_uz test-prefix utterances" },
      { value: "7.00%", label: "CER on the same 7 utterances" },
    ],
    paragraphs: [
      "Project by Azizbek (azxav). This turns spoken Uzbek into text. An HTTP path accepts an uploaded audio file, and an optional live room runs through LiveKit.",
      "Speech is recognized with NavAI whisper-small. The room returns text only, with no spoken reply.",
      "On a small FLEURS sample, measured word error was 14.29% and character error was 7.00%.",
    ],
    stack: ["Python", "FastAPI", "LiveKit", "Whisper", "Docker"],
  },
  {
    slug: "kaggle-s6e3",
    title: "Kaggle S6E3",
    kind: "competition",
    summary:
      "Kaggle contest to predict whether a customer will leave, ranked 57 of 4,142 with score 0.91824.",
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
      "A Kaggle contest to predict whether a customer will leave, called churn. Entries are scored with ROC-AUC.",
      "This entry placed 57 of 4,142, with a score of 0.91824.",
      "The work tried different sets of features, tree models, neural nets, and a stack that combines those models.",
    ],
  },
  {
    slug: "kgmon",
    title: "KGMON",
    kind: "personal",
    summary:
      "Helper that runs a Kaggle competition locally, from workspace setup through a submission you confirm.",
    repo: "https://github.com/azxav/kgmon",
    paragraphs: [
      "A helper that runs a Kaggle competition as a repeatable local workflow. It sets up a workspace, checks the data, runs experiments, and packages a submission.",
      "It only submits when you confirm. Calls to Kaggle go through a vendored Kaggle skill.",
    ],
    sections: [
      {
        heading: "Workflow",
        items: [
          "Set up a competition workspace and save the rules",
          "Check train, test, and sample files and work out the task",
          "Plan validation and stop when the plan might leak answers",
          "Run experiments, try combining models, and write a final package",
          "Upload a notebook and submit only after an explicit confirmation",
        ],
      },
    ],
    stack: ["Python", "Typer", "SQLite", "MCP"],
  },
  {
    slug: "orbit-wars",
    title: "Orbit Wars",
    kind: "personal",
    summary: "Learns to play Orbit Wars by copying moves from past Kaggle games.",
    repo: "https://github.com/azxav/orbit_warsv2",
    paragraphs: [
      "Project by Azizbek (azxav). Orbit Wars is a Kaggle real-time strategy game: players send fleets between planets on a board that orbits a sun, and the side with the most ships after the match wins.",
      "This project teaches an agent to play by copying moves from past games. Replays become training data, a neural policy learns from them, and the result exports as one Python file ready to submit.",
    ],
    sections: [
      {
        heading: "Steps",
        items: [
          "Build a dataset from replay files, holding some games back",
          "Check labels that do not match a move or could mean more than one",
          "Train the policy that copies past moves",
          "Evaluate a saved checkpoint",
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
      "Watches a fixed junction camera and flags jam, yield failures, and red-light running.",
    repo: "https://github.com/azxav/traffic-vision",
    paragraphs: [
      "Software that watches a fixed traffic camera at a junction and flags problems: jammed roads, cars that fail to yield, and red-light running.",
      "It tracks vehicles frame by frame, applies junction rules, and builds a simple risk score from near-misses and hard braking.",
    ],
    sections: [
      {
        heading: "Pipeline",
        items: [
          "Line up a hand-labelled junction with the first frame of each video.",
          "Detect and track vehicles on every third frame, then map them back to the original picture.",
          "Read smoothed motion, lane, road, queue, crosswalk, and stop-line signals.",
          "Apply rules over time for jams, yield failures, and red-light running.",
          "Score risk from near-misses, hard braking, and movement on a red light.",
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
      "A recommender that finds candidate videos first, then ranks them, beating a simple popularity baseline.",
    repo: "https://github.com/azxav/recsys_kuirand",
    paragraphs: [
      "Project by Azizbek (azxav). A recommender that first finds candidate videos, then ranks them for the user. It is built on the KuaiRand dataset.",
      "The ranker beats a simple popularity baseline, with AUC 0.644 against 0.572.",
    ],
    sections: [
      {
        heading: "Service",
        items: [
          "POST /v1/events and POST /v1/recommend",
          "Similar items, plus create, read, and assign an experiment",
          "Health, readiness, and metrics endpoints",
          "A recommendation includes scores, how the list was blended, and how many candidates were considered",
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
