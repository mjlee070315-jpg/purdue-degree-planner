// ============================================================
// Smart Course Planner — test suite
//
// Zero-dependency, zero-build-step tests for the algorithmic core of
// planner.js: the CPM (Critical Path Method) analysis, the greedy
// scheduler, and the combinatorial lower bound the optimality claim
// rests on. Runs entirely in the browser against tests.html — no
// Node/npm required, matching the rest of this project's philosophy.
//
// planner.js is loaded as a classic script before this file, so every
// top-level function it defines (computeCPM, buildSchedule,
// lowerBoundSemesters, longestPaths, PROGRAMS) is already a global.
// ============================================================

const RESULTS = [];
let pass = 0, fail = 0;

function test(name, fn) {
  try {
    fn();
    RESULTS.push({ name, ok: true });
    pass++;
  } catch (e) {
    RESULTS.push({ name, ok: false, error: e.message, stack: e.stack });
    fail++;
  }
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg || 'assertion failed');
}
function assertEqual(actual, expected, msg) {
  if (actual !== expected) {
    throw new Error((msg ? msg + ' — ' : '') + `expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

// ---- small synthetic course-graph builder for isolated algorithm tests ----
function course(id, prereq, credits, term) {
  return { id, prereq, credits: credits || 3, term: term || 1, cat: 'major' };
}

// ============================================================
// longestPaths — longest remaining chain from each node
// ============================================================
test('longestPaths: linear chain A->B->C->D gives depths 3,2,1,0', () => {
  const courses = [
    course('A', []), course('B', ['A']), course('C', ['B']), course('D', ['C']),
  ];
  const lp = longestPaths(courses);
  assertEqual(lp.A, 3, 'A should have 3 courses depending on it transitively');
  assertEqual(lp.B, 2);
  assertEqual(lp.C, 1);
  assertEqual(lp.D, 0, 'D has no dependents');
});

test('longestPaths: independent courses all have depth 0', () => {
  const courses = [course('A', []), course('B', []), course('C', [])];
  const lp = longestPaths(courses);
  assertEqual(lp.A, 0); assertEqual(lp.B, 0); assertEqual(lp.C, 0);
});

// ============================================================
// computeCPM — Early/Late Start/Finish, slack, critical path
// ============================================================
test('computeCPM: linear chain of 4 has duration 4 and every course critical', () => {
  const courses = [
    course('A', []), course('B', ['A']), course('C', ['B']), course('D', ['C']),
  ];
  const cpm = computeCPM(courses);
  assertEqual(cpm.duration, 4);
  assertEqual(cpm.criticalCount, 4, 'a pure chain has no slack anywhere');
  assertEqual(cpm.ES.A, 0); assertEqual(cpm.EF.A, 1);
  assertEqual(cpm.ES.D, 3); assertEqual(cpm.EF.D, 4);
  courses.forEach(c => assertEqual(cpm.slack[c.id], 0, c.id + ' should have zero slack'));
});

test('computeCPM: diamond graph (A->B,A->C,B->D,C->D) — known ES/EF/LS/LF', () => {
  // A is 1 step, B and C are parallel (both depend only on A), D depends on both.
  const courses = [
    course('A', []), course('B', ['A']), course('C', ['A']), course('D', ['B', 'C']),
  ];
  const cpm = computeCPM(courses);
  assertEqual(cpm.duration, 3, 'A -> {B|C} -> D is 3 steps regardless of B/C order');
  assertEqual(cpm.ES.A, 0); assertEqual(cpm.EF.A, 1);
  assertEqual(cpm.ES.B, 1); assertEqual(cpm.ES.C, 1);
  assertEqual(cpm.ES.D, 2); assertEqual(cpm.EF.D, 3);
  // B and C are symmetric siblings feeding the same D, so both are on the
  // critical path (zero slack) — this is the textbook case CPM is built to catch.
  assertEqual(cpm.slack.A, 0); assertEqual(cpm.slack.B, 0);
  assertEqual(cpm.slack.C, 0); assertEqual(cpm.slack.D, 0);
});

test('computeCPM: a course with real slack is correctly identified as non-critical', () => {
  // A -> B -> D (critical, length 3) and A -> C -> D but C is a dead-end
  // side branch that also feeds D, so C has slack if the B-path is longer.
  // Build: A->B->C->D (chain) plus a slack node E that only depends on A
  // and has nothing depending on it — E should show positive slack.
  const courses = [
    course('A', []), course('B', ['A']), course('C', ['B']), course('D', ['C']),
    course('E', ['A']), // dead-end parallel branch, not on the critical path
  ];
  const cpm = computeCPM(courses);
  assertEqual(cpm.duration, 4, 'critical path is still A->B->C->D');
  assert(cpm.slack.E > 0, 'E should have positive slack since it does not block anything');
  assertEqual(cpm.slack.A, 0); assertEqual(cpm.slack.B, 0);
  assertEqual(cpm.slack.C, 0); assertEqual(cpm.slack.D, 0);
});

// ============================================================
// buildSchedule — greedy scheduler invariants
// ============================================================
test('buildSchedule: never exceeds the credit cap when more than one course could fit', () => {
  const courses = [
    course('A', [], 5), course('B', [], 5), course('C', [], 5), course('D', [], 5),
  ];
  const sched = buildSchedule([], 12, courses);
  sched.forEach(term => {
    assert(term.credits <= 12, `term ${term.term} has ${term.credits} credits, over the 12 cap`);
  });
});

test('buildSchedule: a single course heavier than the cap is still scheduled alone (no infinite stall)', () => {
  const courses = [course('BIG', [], 19)];
  const sched = buildSchedule([], 12, courses);
  assertEqual(sched.length, 1);
  assertEqual(sched[0].courses[0].id, 'BIG');
});

test('buildSchedule: every course prerequisite is scheduled in a strictly earlier term', () => {
  const courses = [
    course('A', [], 3), course('B', ['A'], 3), course('C', ['B'], 3),
    course('D', [], 3), course('E', ['D'], 3),
  ];
  const sched = buildSchedule([], 6, courses);
  const termOf = {};
  sched.forEach(t => t.courses.forEach(c => { termOf[c.id] = t.term; }));
  courses.forEach(c => {
    c.prereq.forEach(p => {
      assert(termOf[p] < termOf[c.id],
        `${c.id} (term ${termOf[c.id]}) must come after its prereq ${p} (term ${termOf[p]})`);
    });
  });
});

test('buildSchedule: schedules every course exactly once, none dropped or duplicated', () => {
  const courses = [
    course('A', []), course('B', ['A']), course('C', ['A']), course('D', ['B', 'C']),
    course('E', []), course('F', ['E']),
  ];
  const sched = buildSchedule([], 9, courses);
  const seen = {};
  let total = 0;
  sched.forEach(t => t.courses.forEach(c => {
    seen[c.id] = (seen[c.id] || 0) + 1;
    total++;
  }));
  assertEqual(total, courses.length, 'total scheduled courses should equal input course count');
  courses.forEach(c => assertEqual(seen[c.id], 1, c.id + ' should appear exactly once'));
});

test('buildSchedule: already-completed courses are excluded from the output', () => {
  const courses = [course('A', []), course('B', ['A']), course('C', ['B'])];
  const sched = buildSchedule(['A'], 6, courses);
  const scheduledIds = sched.flatMap(t => t.courses.map(c => c.id));
  assert(!scheduledIds.includes('A'), 'A was marked completed and should not be re-scheduled');
  assertEqual(scheduledIds.length, 2);
});

// ============================================================
// lowerBoundSemesters — must be a *valid* lower bound: the greedy
// schedule this product calls "provably optimal" can never legally
// use fewer semesters than this bound claims are necessary. If this
// test ever fails, the optimality claim in the UI is not trustworthy.
// ============================================================
test('lowerBoundSemesters: never exceeds what the greedy scheduler actually uses', () => {
  const courses = [
    course('A', [], 5), course('B', ['A'], 5), course('C', ['A'], 4),
    course('D', ['B', 'C'], 3), course('E', [], 3), course('F', ['E'], 3), course('G', [], 3),
  ];
  const cap = 12;
  const bound = lowerBoundSemesters(courses, cap);
  const sched = buildSchedule([], cap, courses);
  assert(bound <= sched.length,
    `lower bound (${bound}) must not exceed the actual greedy schedule length (${sched.length})`);
});

test('lowerBoundSemesters: matches the credit-sum bound when there are no prerequisites at all', () => {
  // 4 independent 5-credit courses, cap 12 -> ceil(20/12) = 2 semesters minimum.
  const courses = [course('A', [], 5), course('B', [], 5), course('C', [], 5), course('D', [], 5)];
  assertEqual(lowerBoundSemesters(courses, 12), 2);
});

test('lowerBoundSemesters: matches the chain-depth bound when credits are not the constraint', () => {
  // A 5-course linear chain, tiny credit load, huge cap -> bound is chain length, not credits.
  const courses = [
    course('A', [], 1), course('B', ['A'], 1), course('C', ['B'], 1),
    course('D', ['C'], 1), course('E', ['D'], 1),
  ];
  assertEqual(lowerBoundSemesters(courses, 18), 5);
});

// ============================================================
// Real-data regression — run every actual major in PROGRAMS through
// the same invariants, so a future data edit that breaks a prereq
// reference or stalls the scheduler is caught immediately instead of
// silently shipping to the live site.
// ============================================================
Object.keys(PROGRAMS).forEach(key => {
  const program = PROGRAMS[key];
  const courses = program.courses;

  test(`[${key}] every prerequisite id referenced actually exists in this major's course list`, () => {
    const ids = new Set(courses.map(c => c.id));
    courses.forEach(c => {
      c.prereq.forEach(p => {
        assert(ids.has(p), `${key}: ${c.id} lists prerequisite "${p}" which is not a course in this major`);
      });
    });
  });

  test(`[${key}] no duplicate course ids`, () => {
    const seen = new Set();
    courses.forEach(c => {
      assert(!seen.has(c.id), `${key}: duplicate course id ${c.id}`);
      seen.add(c.id);
    });
  });

  test(`[${key}] no prerequisite cycles (longestPaths terminates and is finite for every course)`, () => {
    const lp = longestPaths(courses);
    courses.forEach(c => {
      assert(Number.isFinite(lp[c.id]), `${key}: ${c.id} has a non-finite longest-path value, likely a cycle`);
    });
  });

  test(`[${key}] full-schedule build from scratch (18 cr/sem cap) places every course exactly once`, () => {
    const sched = buildSchedule([], 18, courses);
    const seen = {};
    let total = 0;
    sched.forEach(t => t.courses.forEach(c => { seen[c.id] = (seen[c.id] || 0) + 1; total++; }));
    assertEqual(total, courses.length, `${key}: expected all ${courses.length} courses scheduled, got ${total}`);
    courses.forEach(c => assertEqual(seen[c.id], 1, `${key}: ${c.id} should be scheduled exactly once`));
  });

  test(`[${key}] full-schedule build never exceeds the 18 cr/sem cap`, () => {
    const sched = buildSchedule([], 18, courses);
    sched.forEach(t => assert(t.credits <= 18, `${key}: term ${t.term} has ${t.credits} credits, over cap`));
  });

  test(`[${key}] lower bound never exceeds the actual greedy schedule length`, () => {
    const bound = lowerBoundSemesters(courses, 18);
    const sched = buildSchedule([], 18, courses);
    assert(bound <= sched.length,
      `${key}: lower bound (${bound}) exceeds actual schedule length (${sched.length}) — the optimality claim would be false`);
  });

  test(`[${key}] every course has non-negative credits and a valid category`, () => {
    // Note: 0 credits is legitimate — e.g. ECE 20000 "Sophomore Seminar" is a
    // real 0-credit-hour pass/fail course in Purdue's actual curriculum.
    const validCats = new Set(['fye', 'major', 'support', 'elective']);
    courses.forEach(c => {
      assert(c.credits >= 0, `${key}: ${c.id} has negative credits`);
      assert(validCats.has(c.cat), `${key}: ${c.id} has unrecognized category "${c.cat}"`);
    });
  });
});

// ============================================================
// Render results
// ============================================================
function renderResults() {
  const root = document.getElementById('testResults');
  const summary = document.getElementById('testSummary');
  summary.innerHTML = `<span class="${fail === 0 ? 'all-pass' : 'has-fail'}">${pass} passed</span>` +
    (fail > 0 ? `, <span class="has-fail">${fail} failed</span>` : '') +
    ` &nbsp;·&nbsp; ${RESULTS.length} total`;

  root.innerHTML = RESULTS.map(r => `
    <div class="test-row ${r.ok ? 'ok' : 'fail'}">
      <span class="test-icon">${r.ok ? '✓' : '✗'}</span>
      <span class="test-name">${r.name}</span>
      ${r.ok ? '' : `<div class="test-error">${r.error}</div>`}
    </div>
  `).join('');
}
renderResults();
