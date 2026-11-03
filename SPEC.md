# <Lab Bookings>

<!-- Exercise 2. Write the non-goals first. Every acceptance criterion must be checkable in under a minute.
     Keep these headings exactly as they are: the self-checks look for them by name.
     The full target is on the course site under Resources → The course project. -->

## Project option
Lab booking

## Goals
- Student users can preview available rooms and book a timeslot for available rooms at an available time.
- Student users may cancel their own bookings.
- Lab staff can make rooms available to student users.
- Rooms can be either labs or workstations.
- Lab staff can see all bookings.

## Non-goals
- No payments
- No mobile apps
- No auto refreshing pages
- No light vs dark mode
- No multi langauge support

## Constraints
- Passwords are never stored as readable text
- Two users cannot have the same username
- Passwords must be at least 8 characters long with at least 1 special letter such as !@#$%^ or &
- Website is in English only

## The model feature
- Model: Gemini 2.5 Flash, vision, called from `services/poster.js` and nowhere else.
- Input: the poster image an organizer uploads, and nothing about any member.
- Output: a suggested title, date and place, shown in the form for the organizer to correct.
- When it fails: no key, a timeout or a 429 all leave the form empty with a note saying to
  type it in. Nothing is ever saved without the organizer pressing save.

## Auth
- Local: e-mail and password, stored as a bcrypt hash.
- Provider: Sign in with Google, the authorization-code flow, on the server.
- Linking: matched on Google's account id. An address Google has not marked as verified is
  never linked to an existing account

## MCP tools
<!-- At least three tools your own MCP server exposes over this project's data.
     Each tool calls the same service functions the HTTP API calls, so the same rules apply.
     A description shorter than 20 characters is not a description. -->
| Tool | What it does | Who may call it |
| find_lecture | Return the title and topics of one course lecture by its number, 1 to 10. Use it when asked what a lecture covers. | Anyone |
| get_syllabus | Return the URL of the syllabus for the course. Use it when asked for the whole course syllabus or the main website. | Anyone |
| get_excercise_link | Return the URL of a specific excercise page. Use it when asked for a link to a particular excercise. | Anyone |

## UI
<!-- Stack, and the three or more screens. The graded checklist lives in docs/UI.md. -->
The first screen should be the log in screen. There should be a checkbox asking if you are a student or a staff member. The website footer is visible on every page and links to the "About section", which explains the purpose of the lab booking website.

## Architecture
<!-- Exercise 3. One request traced through every layer, naming the file for each one,
     plus one place where your own code does not match this layering. -->

## Acceptance criteria
<!-- Every criterion carries an id. A test proves it by naming that id in its title, for example
     test('AC-3 a booking that overlaps another is refused with 409', ...).
     Say who acts, what they see, and what must be true in the database. -->
- [AC-1] A student can see available rooms. Students can see the option for fully appointed rooms are grayed out.
- [AC-2] A student who selects an unavailable room for the selected day will see the message "This room is not available today." The next line states the reason, if any. For example, "Reason: This room is already full!"
- [AC-3] A lab staff member can see all rooms regardless of availability and who booked them for that timeslot. A lab staff member can cancel bookings for any room.
- [AC-4] If a room has 0 bookings on a day, a lab staff member can lock the room from being booked for a period of time. Locking a room asks the lab staff member for a reason. Reasons are in a dropdown menu. "The room is for repair.", "This room is being cleaned by maintenance.", "Other...". The "Other..." option allows lab staff members to type a reason. The selected reason will be visible to students when they select the locked room.
- [AC-6] A room has 4 timeslots per day. Each timeslot is 3 hours long. Rooms can be open from 7:30 to 19:30.
- [AC-7] Each room has a different maximum student capacity. Lab staff members can change the maximum student capacity, which will change how many students can book the same lab or workstation for the same timeslot.
- [AC-8] Each booked session can be optionally given a name by the first student that booked it.

### Slice 1: sign-in and available rooms
- [AC-9] A student must be able to sign in using their valid credentials. If the credentials are invalid, they receive an error message: "Invalid username or password."
- [AC-10] Upon successful sign-in, a student should be redirected to the dashboard, where they can see the available rooms for the current day.
- [AC-11] The system must ensure that only registered students can access the booking system. If a non-registered user attempts to access the booking system, they should see a message: "You must be a registered student to book a room." and are redirected to the log-in page.

## Traceability
<!-- Filled in from Exercise 3 onward: each AC id, and the test that names it. -->
| Criterion | Test |
| --- | --- |
| AC-1 |  |

## Spec vs result
The specs passed my criterions, but the result failed to deliver a working locally hosted website. I don't know what is the problem yet, but I will try to find the solution and change the spec.md accordingly.
