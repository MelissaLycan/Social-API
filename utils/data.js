const users = [
  {
    username: "MelissaLycan",
    email: "melissamlycan@gmail.com",
    thoughts: [
      {
        thoughtText: "I want to save the world.",
        username: "MelissaLycan",
        reactions: 155,
      },
    ],
    friends: ["BenMachock"],
  },
  {
    username: "BenMachock",
    email: "Ben.Machock@2U.com",
    thoughts: [
      {
        thoughtText: "This is the Way.",
        username: "BenMachock",
        reactions: 25,
      },
    ],
    friends: ["MelissaLycan", "JasonLycan"],
  },
  {
    username: "JasonLycan",
    email: "jasonmlycan@gmail.com",
    thoughts: [
      {
        thoughtText: "We can be friends even if we disagree.",
        username: "JasonLycan",
        reactions: 279,
      },
    ],
    friends: ["BenMachock"],
  },
];

// Export the functions for use in seed.js
module.exports = users;
