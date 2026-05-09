const deathMessages = {
  fall: [
    "You fell out of scope. Product says that was intentional.",
    "Gravity filed a blocker and assigned it to you.",
    "You missed the platform. Let's call it a learning sprint.",
  ],
  bug: [
    "Regression detected. Somehow this passed QA.",
    "A bug escaped triage and chose violence.",
    "Looks like this one needs a hotfix and a very quiet postmortem.",
  ],
  ticket: [
    "Jira says this is urgent, so naturally it appeared from nowhere.",
    "A surprise P0 sprint-jacked your roadmap.",
    "Stakeholder feedback arrived with no acceptance criteria.",
  ],
  hazard: [
    "Merge conflict hurts. Especially when it has opinions.",
    "The blocker was marked resolved, but only in the meeting notes.",
    "Scope creep got promoted to must-have.",
  ],
};

// Export the constant so other files can access it
export { deathMessages }; 
