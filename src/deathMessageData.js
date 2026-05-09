const deathMessages = {
  fall: [
    "You fell out of scope. Product says that was intentional.",
    "Gravity filed a blocker and assigned it to you.",
    "You missed the platform. Let's call it a learning sprint.",
  ],
  bug: [
    "Regression detected.\nSomehow this left your dev env.",
    "A bug reached production and \n it's your commit.",
    "Looks like this one needs a hotfix\n and a very quiet postmortem.",
  ],
  ticket: [
    "Jira says this is urgent,\nso naturally it shows up\n2 days before sprint end.",
    "A surprise P0 sprint-jacked your roadmap.",
    "Stakeholder feedback arrived with no acceptance criteria.",
  ],
  hazard: [
    "Merge conflict hurts.\nEspecially when your branches caused it.",
    "The blocker was marked resolved,\nbut only in the meeting notes.",
    "Scope creep got promoted\nto requirement from the start",
  ],
};

// Export the constant so other files can access it
export { deathMessages }; 
