const ogs = require("open-graph-scraper");

const pipe = (fn, ...fns) => (...args) =>
  fns.reduce((prev, nextFn) => nextFn(prev), fn(...args));

const trace = fn => args => {
  fn(args);
  return args;
};

const urlRegex = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim;

const handleEmit = (urls, io, bst) => {
  urls
    .filter(url => !bst.contains(url))
    .forEach(command => {
      bst.insert(command);
      ogs({ url: command })
        .then(result => io.emit("message", result))
        .catch(error => console.log("error", error));
    });
};

const BinarySearchTree = url => {
  let value = url;
  let left;
  let right;

  const insert = v => {
    if (v >= value) {
      if (right == null) {
        right = BinarySearchTree(v);
      } else {
        return right.insert(v);
      }
    }
    if (v < value) {
      if (left == null) {
        left = BinarySearchTree(v);
      } else {
        return left.insert(v);
      }
    }
  };

  const contains = target => {
    if (target === value) {
      return true;
    } else if (target > value) {
      if (right != null) {
        return right.contains(target);
      }
    } else if (target < value) {
      if (left != null) {
        return left.contains(target);
      }
    } else {
      return false;
    }
  };

  return {
    insert,
    contains
  };
};

module.exports = {
  pipe,
  trace,
  urlRegex,
  handleEmit,
  BinarySearchTree
};
