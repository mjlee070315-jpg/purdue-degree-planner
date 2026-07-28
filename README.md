# Smart Course Planner — Purdue Engineering Degree Path Optimizer

A constraint-based degree scheduler covering six Purdue engineering
curricula: Industrial, Mechanical, Electrical, Civil, and Chemical
Engineering, plus Computer Science. Instead of manually tracking
prerequisites and credit caps every semester, the planner models each
degree as a dependency graph, solves for the fastest feasible path to
graduation, and mathematically verifies how close that path is to optimal.

**Pages:** `index.html` (project overview) · `planner.html` (the tool)

## The model

Each major is its own directed acyclic graph (40–43 courses), sourced from
Purdue's published plans of study and department handbooks.

- **Decision variable:** `x[course, semester] ∈ {0,1}`
- **Constraints:** every prerequisite of a course must be scheduled in a
  strictly earlier semester; total credits per semester ≤ a user-set cap
- **Objective:** minimize the number of semesters to graduation

The planner solves this with a **greedy topological scheduler**: at each
step it computes each unfinished course's longest remaining dependency
chain and prioritizes courses on that critical path, packing each semester
up to the credit cap.

### Optimality verification (no ILP solver required)

This is a precedence-constrained scheduling problem (related to
P|prec|C_max), which is NP-hard in general — exact solving doesn't scale
cheaply in a browser. Instead, the planner computes a **combinatorial lower
bound** on every update:

- **LB1 (capacity):** ⌈ total remaining credits / credit cap ⌉
- **LB2 (critical path):** longest remaining prerequisite chain + 1
- **Bound = max(LB1, LB2)** — no valid schedule can beat this

If the greedy result matches the bound, the schedule is **provably
optimal**. If not, the gap is shown honestly — closing it exactly is
NP-hard at this scale, but the greedy result is guaranteed within that gap
of the true optimum. Run against all six majors at an 18-credit cap: IE,
ME, ChemE, and CE come back provably optimal; ECE and CS land one semester
above the bound.

## Project structure

```
index.html      – landing page / project write-up (problem, model, complexity, features)
planner.html    – the interactive planner (major selector, optimizer, GPA calc)
style.css       – shared design system
planner.js      – course data for all 6 majors + scheduling engine + rendering
```

No build step, no dependencies — plain HTML/CSS/JS. Storage auto-detects
its environment (`localStorage` in a normal browser, `window.storage` if
run inside Claude's artifact runtime). Progress is stored per-major, so
switching majors in the selector never loses your place.

## Majors modeled

| Major | Courses | Source |
|---|---|---|
| Industrial Engineering, BSIE | 41 | BSIE plan of study |
| Mechanical Engineering, BSME | 41 | ME recommended plan-of-study PDF |
| Electrical Engineering, BSEE | 43 | ECE suggested arrangement of courses PDF |
| Computer Science, BS | 40 | CS core + track system |
| Chemical Engineering, BSChE | 40 | ChE undergrad program guide (2025–26) |
| Civil Engineering, BSCE | 40 | CE curriculum (Purdue-portion of articulation plan) |

Elective and track slots (General Education, Technical Electives, CS Track
Requirements, etc.) are shown as generic placeholders — swap in specific
course titles once chosen.

## Deploying to GitHub Pages

1. Create a new repository on GitHub.
2. From this folder:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Smart Course Planner"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Source → Deploy from a branch → `main` / root**.
4. Live at `https://<your-username>.github.io/<repo-name>/` within a minute or two.

## Data source & disclaimer

Course lists, credit hours, and prerequisite sequencing are drawn from
Purdue's published plans of study and department curriculum handbooks.
This is an independent, unofficial planning aid — always confirm current
requirements against myPurduePlan / DegreeWorks and an academic advisor
before registering.
