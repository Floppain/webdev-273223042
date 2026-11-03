# Agent log

One entry per agent session, newest at the bottom. Be honest: what went wrong is the useful part.

<!-- Copy this block for each session:

## YYYY-MM-DD · <short title>
- Goal:
- Delegated:
- Checkpoints:
- Went wrong:
- Changed by hand:

-->

## 2026-10-16 · <October 16>
- Goal: Work on exercise 1 from step 8
- Delegated: Tool calls
- Checkpoints: 2
- Went wrong: Nothing
- Changed by hand: Second tool call description

## 2026-10-16 · <October 20>
- Goal: Work on exercise 2, filling in spec.md and planning the project's scope
- Delegated: Criterion checks
- Checkpoints: 1
- Went wrong: Nothing
- Changed by hand: Acceptance criterion


## 2026-11-02 · <Nov 02>
- Goal: Adding new tool calls
- Delegated: Calling get_syllabus, planning slice 1 with Gemini
- Checkpoints: 0
- Went wrong: I asked Gemini where my tools table was, and the question hanged for >4 minutes. I was unable to plan slice 1 because I reached my daily limit. Also, the excercise 2 task 5 asks for a self check that requires you to have "ok" on the UI, but the UI file is expected to be handed in on excercise 4 according to UI.md?
- Changed by hand: New tools and descriptions, spec.md tools table

## 2026-11-03 - <Nov 03>
- Goal: Complete slices, planning, and implementation with Gemini
- Delegated: Planning for the database tables, sign in authentifications
- Checkpoints: 2
- Went wrong: Prompts hanged for a while in the first 20 ish minutes using different models. Gemini 3.5 and 3.8 are a lot more useful. Will resume this session to complete list screens later: gemini --resume 2e1538a8-5cc3-412b-8d3f-8fe1de4b0d2a

  How to check Slice 1:
   1. Run all test suites:
   1    node test/auth.test.js && node test/room.test.js

   2. Start the application:
   1    npm start

   3. Open http://localhost:3000 in your browser, sign in with student@test.com / Password123!, and view
      the dashboard displaying available rooms, fully appointed rooms (grayed out), and unavailable room
      reasons (AC-1, AC-2, AC-9, AC-10, AC-11).