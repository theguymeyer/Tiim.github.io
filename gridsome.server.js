// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const projects = require("./content/projects.json");
const publications = require("./content/publications.json");
const outreach = require("./content/outreach.json");
const socialMedia = require("./content/socialmedia.json");
const remoteImages = require("./content/remote-imgs.json");

module.exports = function(api) {
  api.loadSource(store => {
    addEach("Project", projects, p => p.name, store);
    addEach("Publication", publications, p => p.name, store);
    addEach("Outreach", outreach, p => p.name, store);
    addEach("SocialMedia", socialMedia, s => s.link, store);
    addEach("RemoteImage", remoteImages, i => i.id, store);
  });
};

function addEach(typeName, array, getId, store) {
  const projectType = store.addCollection({
    typeName
  });
  console.log("Loading " + typeName);
  array.forEach((e, i) =>
    projectType.addNode({
      id: getId(e),
      index: i,
      ...e
    })
  );
}
