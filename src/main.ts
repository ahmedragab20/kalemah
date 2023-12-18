import Doc from "./lib/core/doc";

const doc = new Doc({
  key: "new-doc",
  languages: [
    {
      content: {
        title: "Hello World",
        description: "This is a new document",
      },
    },
  ],
});

console.log(doc);
