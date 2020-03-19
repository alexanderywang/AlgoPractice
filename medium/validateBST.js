class BST {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// one thought
function isBST(root, min = -Infinity, max = Infinity) {
  if (root.value <= min || root.value >= max) return false;
  else
    return (
      !root.value ||
      (root.left < root.value &&
        isBST(root.left, min, root.value) &&
        (!root.right ||
          (root.right > root.value && isBST(root.right, root.value, max))))
    );
}

function validateBst(tree, min = -Infinity, max = Infinity) {
  if (tree.value >= min && tree.value < max) {
    let left, right;
    if (tree.right) {
      right = validateBst(tree.right, tree.value, max);
    } else right = true;
    if (tree.left) {
      left = validateBst(tree.left, min, tree.value);
    } else left = true;
    return left && right;
  } else return false;
}
