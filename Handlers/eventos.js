const { getFiles } = require("./getFiles");

module.exports = () => {
  const eventFiles = getFiles("Events");
  eventFiles.forEach((value) => require(value));

  console.log("[INFO] Client events loaded!".yellow);
};
