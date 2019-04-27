// Learning TODOs
// TODO Learn how to print out order of lines executed - or add statements to print this out
// TODO Learn how to debug from command line

// If modifying these scopes, delete token.json.
export { isBrowser, isTestingWithJest, isCommandLine };

// TODO Refactor?  Would making detectFunction an actual function work?
// TODO Learn why this works below
// TODO See https://stackoverflow.com/questions/17575790/environment-detection-node-js-or-browser/31090240
function isBrowser() {
  const detectFunction = new Function(
    "try {return this===window;}catch(e){ return false;}"
  );
  return detectFunction();
}

function isCommandLine() {
  var detectFunction = new Function(
    "try {return this===global;}catch(e){return false;}"
  );
  return detectFunction();
}

function isTestingWithJest() {
  return process.env.JEST_WORKER_ID !== undefined;
}
