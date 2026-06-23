<!-- DRAFT — maps to D1 `posts`. Fields below become columns; body after the line. -->
slug: the-auditor-doesnt-care
title: The 6-hour audit is a choice, not a constraint
dek: Your quality team didn't decide to spend six hours per cycle cross-checking documents by hand. The process decided for them. Here's how to take the decision back.
category: ESSAY
author: LeanWise AI
read_minutes: 6
status: draft
featured: 1
---

The IKEA auditor does not care how many hours your quality engineer spent
preparing the file. They do not award points for diligence, late nights, or the
size of the binder. They check one thing: does every declared value conform to
the CONNECT TSS spec that is in force *today*. Pass or fail. The effort behind
the submission is invisible — and so is the cost of producing it.

That cost is real, and at most IKEA-supplier plants it is enormous.

## Where the six hours go

A single compliance cycle for a furniture component is not one document. It is a
stack: a test report, one or more self-declarations, safety data sheets for every
surface treatment, a declaration of substances, a recycled-content certificate.
Each one carries dozens of fields. Each field has to be read, matched to the
right clause of the spec, and checked against a threshold that the spec may have
revised since the last cycle.

Done by hand, that is 200–300 individual checks per submission. A senior engineer
who knows the spec can clear it in about six hours. Someone newer takes longer
and misses more. Either way the plant is paying its most expensive quality person
to do reconciliation work — comparing a number on page 6 of a PDF to a number in
a spec table — that has nothing to do with judgment and everything to do with
attention.

The trap is that the six hours feel mandatory. They are not. They are the cost of
checking conformance *linearly, by a human, against a moving target*. Change any
one of those three and the six hours collapse.

## The number on the page is the only thing that matters

Compliance review has a property that makes it unusually automatable: the ground
truth is written down. The extracted value either matches the spec or it does
not. There is no taste, no negotiation, no "it depends." That is exactly the kind
of work software is good at — and exactly the kind of work humans are bad at
sustaining across 300 checks without drift.

LeanWise reads every document in the stack, extracts each declared field, and
matches it against the live CONNECT TSS spec, returning a confidence score on
every line. A field at 99% confidence with a clean spec match needs no human at
all. A field at 72% — a smudged scan, an ambiguous unit, a value near a
threshold — gets flagged for exactly the engineer who used to read all 300. They
now look at the five that are actually hard.

That is the shift: from reviewing everything to reviewing only the uncertain.

## What it adds up to

Across our first quarter in production, the plants running LeanWise cut the audit
cycle from **6 hours to 3 minutes** — a 75% reduction in the labor that touches
each submission — at **99.2% match accuracy** against a human-reviewer baseline,
with **zero failed audits**. The point is not the speed for its own sake. The
point is that the senior engineer's six hours go back into the work only a senior
engineer can do.

The auditor still doesn't care how you got there. That's the whole argument for
getting there cheaply.

---

*Bringing your next CONNECT audit set to a demo? We'll run it live against the
current spec and show you the confidence score on every line.*
