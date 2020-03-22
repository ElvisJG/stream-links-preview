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

module.exports = BinarySearchTree;
