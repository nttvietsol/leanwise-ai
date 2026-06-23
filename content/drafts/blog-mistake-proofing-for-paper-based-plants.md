<!-- DRAFT — maps to D1 `posts`. Fields below become columns; body after the line. -->
slug: mistake-proofing-for-paper-based-plants
title: Mistake-proofing for paper-based plants
dek: Poka-yoke kept defects off your production line for decades. The same discipline applies to the compliance paperwork that leaves the building — and that's where the costly mistakes now hide.
category: METHOD
author: LeanWise AI
read_minutes: 5
status: draft
featured: 0
---

Every lean plant already knows poka-yoke. You designed the fixture so the part
only seats one way. You color-coded the bins so the wrong fastener can't be
picked. You made the error physically impossible instead of asking the operator
to be careful. Mistake-proofing on the line is mature, instinctive, and it works.

The paperwork that leaves the building never got the same treatment. And that is
now where the expensive mistakes live.

## The defect you can't see on the floor

A wrong torque value on a work instruction shows up fast — the part fails, the
line stops, someone fixes it. A wrong value in a compliance declaration shows up
*at the audit*, weeks later, when it is no longer cheap to fix. A single field
that doesn't conform — a formaldehyde figure transcribed from the wrong row, a
recycled-content claim that no longer meets the revised threshold, an SDS that
references a superseded test method — and the audit fails. The shipment stops.
The defect was invisible because nothing on the floor was wrong. The error was in
the document, and the document was checked by a tired human at the end of a long
cycle.

Paper-based plants are especially exposed: values are re-keyed from PDFs into
spreadsheets, spreadsheets into declarations, declarations into the auditor's
portal. Every hand-off is a transcription, and every transcription is a chance to
introduce a defect that no fixture will catch.

## Poka-yoke for the document, not the operator

The lean answer is not "train people to be more careful." It never was. The
answer is to make the mistake structurally hard.

Applied to compliance documents, that means three controls:

1. **Extract, don't re-key.** Read the value directly from the source document
   (the test report, the SDS) instead of asking someone to copy it. The most
   common defect — transcription — disappears when no one transcribes.
2. **Match against the live spec, automatically.** A threshold that changed last
   month should fail the check this month without anyone remembering it changed.
   The spec is the fixture; the value either seats or it doesn't.
3. **Surface uncertainty, don't hide it.** Give every extracted field a
   confidence score. A clean 99% match needs no one. A 72% — a poor scan, an
   ambiguous unit, a value sitting on a threshold — routes to a human *before* it
   reaches the auditor, not after.

This is the same logic as the bin and the fixture, moved upstream from the part
to the paperwork: design the process so the wrong value can't pass quietly.

## Why it matters more than it used to

CONNECT specs are not static. They revise, and a plant that passed last cycle can
fail this cycle on a value it never touched. Manual review cannot keep a moving
target in everyone's head across 300 checks. Mistake-proofing can — because the
check is against the current spec by construction, every time, with no one
relying on memory.

You already trust poka-yoke with your defect rate on the line. The documents that
leave the building deserve the same discipline. That's where the failed audits
come from now.

---

*Curious where your current document set would flag? Bring it to a demo and we'll
mistake-proof it live against the spec in force today.*
