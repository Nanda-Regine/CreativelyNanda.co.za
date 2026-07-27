# 📚 VARSITY ACADEMIC EXCELLENCE ENGINE
# Operations Manual
*The complete reference guide for using your academic system at full capacity.*

**Mirembe Muse — Where Transformation Has a Template**
**Version 1.0 | For University Students**

---

## Purpose of This Manual

This Operations Manual is your comprehensive reference for the Varsity Academic Excellence Engine. Where the Quick-Start Guide gets you set up, this manual explains the logic behind each database, how to use every field effectively, how the system supports you through different stages of a term, and how to maintain it so it works when the pressure is highest.

Read through this once at the start of your first term using the system. Return to specific sections as needed throughout the year.

---

## System Architecture — How the 7 Databases Connect

The Varsity Academic Excellence Engine is a relational system. The databases are designed to link to each other, so context flows from one area to the next without duplication.

```
MY SUBJECTS (anchor database)
    ↓ links to
ASSIGNMENTS & TASKS ←→ STUDY SESSIONS
    ↓                        ↓
EXAM PREP TRACKER      (session logs build revision history)
    ↓
TERM GOALS & PROGRESS (tracks academic category goals)

WELLNESS CHECK-INS ← standalone (links to overall wellbeing picture)
DETAILED WEEKLY SCHEDULE ← standalone (time-blocking tool)
```

My Subjects is your anchor. Every assignment belongs to a subject. Every study session is about a subject. Every exam is tied to a subject. Create your subjects first, before entering any other data.

---

## Database 1 — My Subjects

### Purpose
My Subjects is your complete module registry for the term or semester. It holds your current mark, target mark, effort level, and lecturer details — giving you an at-a-glance picture of where you stand in each subject.

### Field Reference

| Field | Type | Description |
|-------|------|-------------|
| Subject Name | Title | Full module name as it appears on your academic record |
| Subject Code | Text | Official module code (e.g., BUS201) |
| Subject Type | Select | ✅ Compulsory / ⭐ Elective / 🔁 Repeating |
| Lecturer | Text | Lecturer or professor's name |
| Lecture Times | Text | Days and times of your timetabled lectures |
| Semester | Select | Semester 1 / Semester 2 / Year Module |
| Grade Level | Select | Difficulty rating scale 1–5 |
| Credits | Number | NQF credit value of the module |
| Current Mark % | Number | Your current cumulative mark |
| Target Mark % | Number | The mark you are aiming for |
| Term Average | Formula | Calculated average across linked assessments |
| Difficulty Level | Select | Low / Medium / High / Very High |
| Study Hours/Week | Number | Your weekly target study hours for this module |
| Status | Select | On Track / Needs Attention / Struggling / Excellent |
| Resources Folder | Files | Link to your study materials folder |
| Notes | Text | Lecturer guidance, exam style, important context |

### Status Definitions

**Excellent** — Current mark is at or above target. Maintain the strategy.

**On Track** — Current mark is within 5% of target. Keep the current effort level.

**Needs Attention** — Current mark is 6–15% below target. Increase study hours, seek tutorials, form a study group.

**Struggling** — Current mark is more than 15% below target. This requires an action plan: additional support, academic advising, and an urgent conversation with your lecturer.

### Operating Procedures

**Setting up subjects:**
Create every module at the start of the semester. Set your Target Mark % based on your degree requirements — not just what feels comfortable. If you need 60% to pass and 75% to qualify for honours, set the appropriate target.

**Updating Current Mark %:**
Update this field every time you receive an assessment result. The gap between Current Mark % and Target Mark % is your most important academic data point.

**Grade Level vs Difficulty Level:**
Grade Level refers to your academic level (1st year, 2nd year, etc.). Difficulty Level is your personal experience of how hard the module content is. Both matter for planning your study time allocation.

**Notes field:**
Record your lecturer's stated exam preferences, assignment style guidance, and any advice from tutorials. This is institutional knowledge that benefits you every revision session.

---

## Database 2 — Assignments & Tasks

### Purpose
Assignments & Tasks is your complete academic to-do list. Every assessment, submission, practical, quiz, and group project lives here, linked to its subject, with a due date and priority. Nothing gets forgotten.

### Field Reference

| Field | Type | Description |
|-------|------|-------------|
| Task Name | Title | Clear, specific description of the assessment |
| Subject | Relation | Linked subject from My Subjects |
| Type | Select | Assignment / Test / Exam / Practical / Presentation / Group Project / Tutorial / Reading |
| Due Date | Date | Hard submission or test date |
| Weight % | Number | Percentage of total module mark |
| Priority | Select | 🔴 URGENT / 🟠 High / 🟡 Medium / 🟢 Low |
| Status | Select | To Do / In Progress / Submitted / Marked / Revision Needed |
| Estimated Hours | Number | Your estimate of total time required |
| Actual Hours | Number | Hours you actually spent |
| Mark Received | Number | Result once returned |
| Notes | Text | Rubric notes, submission requirements, group member names |

### Priority Logic

Set priority based on both urgency (how soon it is due) and weight (how much it counts):

- A 30% assignment due in 5 days = 🔴 URGENT
- A 5% quiz due in 3 days = 🟠 High
- A 20% assignment due in 3 weeks = 🟡 Medium
- A 5% tutorial submission due next month = 🟢 Low

Never set priority based on how much you enjoy the subject. Weight and deadline decide priority.

### Operating Procedures

**Loading all assessments at the start of term:**
On Day 1 of the semester, go through every module outline and enter every single assessment into this database. Set due dates, weights, and types immediately. This one session gives you visibility over your entire semester.

**Estimated vs Actual Hours:**
Estimate hours when you create the task. Update Actual Hours as you work. Over time, the gap between estimate and actual becomes your calibration data — helping you plan future terms more accurately.

**After results:**
When you receive a mark, update the Mark Received field and change Status to Marked. If the mark is below target, change to Revision Needed and create a linked task for additional study.

**Group projects:**
Use the Notes field to list group members, agreed deadlines, and individual responsibilities. Link the task to all relevant subjects if the project spans modules.

---

## Database 3 — Study Sessions

### Purpose
Study Sessions is your academic training log. Every time you sit down to study, you create an entry. Over time, this database becomes your revision history, focus pattern tracker, and the proof of the work you have put in.

### Field Reference

| Field | Type | Description |
|-------|------|-------------|
| Session Time | Title | The time block — e.g., 06:00–08:00 |
| Date | Date | Date of the session |
| Subject | Relation | Linked subject from My Subjects |
| Study Method | Select | See method list below |
| Type | Select | Active Recall / Problem Solving / Reading / Note-Making / Group Study / Past Papers / Tutorial |
| Focus Area | Text | Specific topic or chapter covered |
| Topics Covered | Text | Detailed list of content worked through |
| What I Learned | Text | Key takeaways and new understanding |
| Questions/Confusion | Text | Unresolved questions to follow up |
| Duration (min) | Number | Actual session length in minutes |
| Energy Level Before | Select | Low / Medium / High |
| Energy Level After | Select | Low / Medium / High |
| Focus Level | Select | 😴 Poor / 😐 Fair / 👍 Good / 🔥 Excellent |
| Location | Text | Where you studied |
| Completed | Checkbox | Tick when the planned session is done |
| Notes | Text | Anything else worth recording |

### Study Method Guide

| Method | Best Used For |
|--------|--------------|
| 📄 Practice Papers | Exam preparation, technique, time management |
| 🔁 Active Recall | Memorisation, concept retention, testing understanding |
| 📝 Note Summarising | Condensing lecture content, creating revision notes |
| 👥 Group Study | Problem-solving, explaining concepts, peer accountability |
| 📖 Textbook Reading | Building foundational understanding of new content |
| 🃏 Flashcards | Definitions, formulas, key terms |
| 🎥 Video Review | Complex concepts, alternative explanations |

### Operating Procedures

**Logging in real time:**
Create the session entry before you start — fill in your planned Subject, Method, and Focus Area as your intention. Complete the remaining fields (Topics Covered, What I Learned, Questions) when you finish. This two-step approach is more accurate than logging from memory.

**Questions/Confusion field:**
This is one of the most valuable fields in the system. Every unresolved question you log here becomes your lecturer question list, your study group agenda, and your exam focus list. Review it before every test.

**Energy Level tracking:**
Logging energy before and after sessions reveals your productive windows. If your Energy After is consistently Low for evening sessions, you may be studying in a depleted state. Use this data to restructure your schedule.

**Session length:**
Log actual duration, not planned duration. If you planned 2 hours and completed 90 minutes, log 90 minutes. Accuracy is more useful than appearing disciplined.

---

## Database 4 — Exam Prep Tracker

### Purpose
The Exam Prep Tracker manages your preparation for every major assessment — from the moment you know about it to the day you write it. It is your most important database in the weeks before exam season.

### Field Reference

| Field | Type | Description |
|-------|------|-------------|
| Exam Name | Title | Descriptive name including subject and type |
| Subject | Relation | Linked subject from My Subjects |
| Exam Date | Date | The date of the assessment |
| Exam Time | Text | Start time |
| Venue | Text | Room or hall |
| Format | Text | Written / Multiple Choice / Practical / Oral, etc. |
| Total Marks | Number | Maximum marks available |
| Term Weight | Text | Percentage of total module mark |
| Target Mark % | Number | Your mark goal for this assessment |
| Confidence Level | Number | Self-rated out of 10 |
| Prep Status | Select | ⚪ Not Started / 🟡 In Progress / 🟠 Active Review / 🟢 Ready |
| Study Start Date | Date | When you committed to beginning preparation |
| Target Study Hours | Number | Total hours you plan to dedicate |
| Study Hours Logged | Rollup | Auto-calculated from linked Study Sessions |
| Topics to Cover | Text | Full syllabus breakdown |
| Topics Mastered | Text | What you are confident in |
| Weak Areas | Text | What still needs work |
| Past Papers Done | Number | Number of practice papers completed |
| Practice Tests Planned | Number | Number of papers you plan to complete |
| Actual Mark % | Number | Your result once returned |
| What Went Well | Text | Post-exam reflection |
| What to Improve | Text | For next time |
| Notes | Text | Lecturer guidance, exam tips, study strategy |

### Prep Status Definitions

**⚪ Not Started** — Exam is logged but preparation has not begun. Every exam should be logged as Not Started as soon as you know the date.

**🟡 In Progress** — You have begun reviewing content but have not yet reached active revision intensity. Typically 3+ weeks out.

**🟠 Active Review** — You are in focused, high-intensity preparation. Past papers are being completed, weak areas targeted. Typically 1–2 weeks out.

**🟢 Ready** — You have covered all topics, completed your target past papers, and addressed your weak areas. Confidence Level should be 7+ for this status.

### Operating Procedures

**Load exams immediately when dates are announced:**
Do not wait until the semester assessment schedule is published. The moment a lecturer mentions a test date in class, create the entry. Early loading gives the system time to help you.

**Weak Areas field — use it ruthlessly:**
The first thing you should add to a new exam entry is your Weak Areas — what you already know you struggle with in this subject. These are the topics that need the most study time. Review and update this field after every Study Session logged against this exam.

**Study Hours Logged rollup:**
This field automatically counts hours from linked Study Sessions. To make it work accurately, link each Study Session to its corresponding exam in addition to its subject, or create a naming convention that lets you filter by exam period.

**Post-exam reflection:**
Within 48 hours of writing, log your Actual Mark % (once received), What Went Well, and What to Improve. This creates a term-by-term learning record that helps you improve your strategy, not just your content knowledge.

---

## Database 5 — Term Goals & Progress

### Purpose
Term Goals & Progress is your strategic layer. It holds the big-picture goals that drive your academic choices — from grade targets to career preparation to personal development. It bridges what you want with what you are doing about it.

### Field Reference

| Field | Type | Description |
|-------|------|-------------|
| Goal | Title | Short, specific goal statement |
| Goal Description | Text | Expanded detail on what success looks like |
| Semester | Select | Which semester this goal applies to |
| Category | Select | 📚 Academic / 💼 Career / 💰 Financial / 🌱 Personal / 🏃 Wellness |
| Subject | Relation | Linked subject (for academic goals) |
| Priority | Select | Critical / High / Medium / Low |
| Status | Select | ⚪ Not Started / 🟡 In Progress / ✅ Achieved / ❌ Abandoned |
| Progress % | Number | Your estimate of how far you are toward this goal |
| Action Steps | Text | The specific, scheduled actions that will achieve this goal |
| Obstacles | Text | Known challenges and how you plan to address them |
| Success Metric | Text | How you will know you have achieved this goal |
| Support Needed | Text | What help, resources, or people you need |
| Target Date | Date | When you aim to achieve this goal |
| Reflection Notes | Text | What you have learned from pursuing this goal |

### Goal Setting Standards

A goal without a success metric is a wish. Use this format to write effective goals:

**Goal:** Achieve 75% in Financial Accounting
**Success Metric:** Final semester mark of 75% or higher in ACC202
**Action Steps:** Weekly tutorial attendance, 5 past papers completed before exam, tutor session every Friday
**Target Date:** End of Semester 1

### Operating Procedures

**Setting goals at the start of each term:**
Create at least one Academic goal for each subject you are taking. Add one Wellness goal (this directly supports academic performance) and one Career or Personal goal. Three to six goals per term is a manageable number for meaningful tracking.

**Updating Progress %:**
Update Progress % weekly during your Sunday review session. This is a subjective estimate — it is meant to prompt reflection, not produce a precise calculation. If a goal feels stuck at the same percentage for three weeks, revisit the Action Steps.

**Reflection Notes:**
Write in this field whether you achieve the goal or not. The most valuable learning often comes from goals that were missed. What did the obstacle teach you? What would you do differently?

---

## Database 6 — Wellness Check-Ins

### Purpose
Wellness Check-Ins exist because academic performance and wellbeing are not separate systems. Stress, sleep, and motivation directly affect your ability to concentrate, retain information, and perform under exam conditions. This database makes your mental and physical state visible so you can respond to early warning signs before they become crises.

### Field Reference

| Field | Type | Description |
|-------|------|-------------|
| Name / Label | Title | Your feeling state — e.g., Good, Stressed, Overwhelmed |
| Check-in Date | Date | Date of this check-in |
| How I'm Feeling | Select | 😄 Great / 😊 Good / 😐 Okay / 😟 Stressed / 😰 Overwhelmed / 🌱 Recovering |
| Stress Level | Number | Self-rated 1–10 (1 = calm, 10 = in crisis) |
| Sleep Quality | Select | Poor / Fair / Good / Excellent |
| Hours Slept | Number | Hours of sleep last night |
| Energy Level | Number | Self-rated 1–10 |
| Mental Clarity | Text | Short description of your focus capacity today |
| Motivation Level | Number | Self-rated 1–10 |
| Physical Health | Text | Brief note on how your body feels |
| Did I Ask For Help? | Select | Yes / No / Not Needed |
| Challenges Faced | Text | What was hard today |
| Self-Care Activities | Text | What you did to take care of yourself |
| What Went Well Today | Text | At least one positive thing from the day |
| Gratitude Note | Text | One thing you are grateful for |
| Need Support With | Text | What you need help with right now |
| Tomorrow's Intention | Text | One focused intention for the next day |

### Operating Procedures

**Frequency:**
Aim for a daily check-in, ideally at the same time each day — before bed works well for most students. If daily feels like too much, commit to at least three per week.

**Stress Level 7+:**
If your Stress Level is 7 or higher for three or more consecutive check-ins, this is a signal to take action — not just log it. Reach out to a friend, lecturer, or campus counselling service. The Did I Ask For Help? field is not decorative.

**Pattern recognition:**
After 4–6 weeks of consistent check-ins, filter by How I'm Feeling or sort by Stress Level and look for patterns. What days are consistently harder? What conditions correlate with your highest focus and motivation? Use this data to adjust your schedule and study habits.

**Gratitude Note:**
Research consistently shows that brief daily gratitude practice reduces cortisol and improves sleep quality. This field is not optional decoration — it is an evidence-based tool.

---

## Database 7 — Detailed Weekly Schedule

### Purpose
The Detailed Weekly Schedule is your time-blocking tool. It turns your commitments — lectures, study sessions, sport, meals, rest — into a visible, structured week so you can stop holding your schedule in your head and start executing it.

### Field Reference

| Field | Type | Description |
|-------|------|-------------|
| Time Block | Title | The time slot — e.g., 08:00–10:00 |
| Day | Select | Monday through Sunday |
| Activity | Text | What you are doing in this block |
| Subject/Category | Relation or Select | Linked subject or general category |
| Location | Text | Where this takes place |
| Notes | Text | Any relevant context for this block |

### Time-Blocking Principles

**Block lectures first.** Your fixed academic timetable is non-negotiable. Enter all lectures, practicals, and tutorials before anything else.

**Schedule study, not just classes.** A 2-hour lecture gap between 10:00–12:00 is a study block, not free time. Block it deliberately before the week begins.

**Protect your recovery blocks.** Sleep, meals, and physical activity are not optional extras — they are performance inputs. Block them like any other commitment.

**Use a weekly template.** Create one weekly schedule that represents your ideal week, then duplicate it each Sunday and adjust for the week ahead.

### Weekly Schedule Review (Every Sunday)
1. Open your schedule for the coming week
2. Adjust any blocks that need to move due to new commitments
3. Add any exam preparation blocks based on upcoming tests
4. Check that you have at least 7–8 hours of sleep blocked each night
5. Confirm you have at least one full recovery period in the week

---

## Term Management — Using the System at Scale

### Start of Term Protocol

**Week 1:**
- Enter all subjects in My Subjects with Target Mark % set
- Load all assessments from module outlines into Assignments & Tasks
- Set all Term Goals for the semester
- Build your Detailed Weekly Schedule baseline
- Complete your first Wellness Check-In

**Week 2:**
- Load all exams with dates into Exam Prep Tracker with Study Start Dates set
- Begin logging Study Sessions daily
- Review your schedule against actual commitments and adjust

### Mid-Term Review (Week 6–7)

Conduct a mid-term review to assess where you stand:

- [ ] Update Current Mark % in My Subjects for all subjects with received results
- [ ] Review Assignments & Tasks — anything overdue or blocked?
- [ ] Review Exam Prep Tracker — are you on track with study hours for upcoming exams?
- [ ] Review Term Goals Progress % — are any goals off track?
- [ ] Review last 4 weeks of Wellness Check-Ins — any concerning patterns?
- [ ] Adjust study hours in your Weekly Schedule based on which subjects need most attention

### End of Term Protocol

**Last week of term:**
- [ ] Mark all submitted assignments with their received marks
- [ ] Complete post-exam reflections for all completed exams
- [ ] Update Status on all Term Goals to Achieved or Abandoned with reflection
- [ ] Review My Subjects — update Current Mark % with final semester results
- [ ] Archive completed term data (rename databases or create archived views)
- [ ] Prepare fresh entries for the coming term

---

## Campus Resources to Link

Use the Documents Library or the Notes fields in My Subjects to link to:

- Lecturer contact details and office hours
- Module outlines and assessment schedules
- Past paper repositories (your university library or department website)
- Campus tutoring and academic support services
- Student financial aid office (NSFAS, bursaries)
- Campus counselling and mental health services
- Career centre and graduate recruitment resources

---

## Troubleshooting Common Issues

**Study Hours Logged not matching actual sessions:**
Confirm that each Study Session is linked to the correct subject via the relation field. Rollup fields only count properly linked entries.

**Assignments view showing completed items:**
Create a filtered view called 'Active Tasks' that shows only Status ≠ Submitted/Marked. This keeps your working view clean without deleting completed records.

**Exam Prep Tracker not counting down days correctly:**
The Days Until field is a formula based on today's date and the Exam Date. If it appears incorrect, check that the Exam Date field is set to the correct date format. Notion uses the local timezone — ensure your Notion account timezone matches your location.

**Feeling behind and not using the system:**
This is normal. The system is most useful during high-pressure periods, which are also when it is hardest to maintain. If you have fallen behind on logging, do not try to backfill everything. Start fresh today, set a 10-minute daily habit for updates, and move forward.

---

## 🌟 A Note from Nanda

> *"This system was built for the student who is carrying more than just textbooks.*
>
> *The first-generation student. The NSFAS student. The student who works weekends, sends money home, and still shows up to 7am lectures.*
>
> *You deserve a system that works as hard as you do.*
>
> *Use it consistently, especially when it feels hardest. That is exactly when it will carry you."*
>
> — **Nandawula Regine Kabali-Kagwa, Founder, Mirembe Muse Digital**
> *3x Business Graduate, Nelson Mandela University*

---

*🌿 Mirembe Muse — Where Transformation Has a Template*

**Study with intention. Rest without guilt. Graduate with your name on it.**
