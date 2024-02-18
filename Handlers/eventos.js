const { getFiles } = require("./getFiles");

module.exports = () => {
  const eventFiles = getFiles("Events");
  eventFiles.forEach((value) => require(value));
  
  console.log(`💭  [INFO]: momo eventos Loaded`)
};
