Youngest Common Ancestor
PROMPT
You're given three inputs, all of which are instances of a class which has a 'name' property and an 'ancestor' property pointing to the node's immediate ancestor. The first input is the top ancestor in an ancestral tree (the only node that does not have an ancestor of its own), and the other two inputs are descendants in the ancestral tree. Write a function that returns the youngest common ancestor to the two descendents.

test cases


      A
     /  \
    B    C
   / \  / \
  D   E F  G
 / \
H   I


getYoungestCommonAncestor(Node A, Node E, Node H) <----- Should return Node B

Solutions
You may give your interviewee the following description of the ancestral tree data structure if they ask for it.


class AncestralTree {
  constructor(name, ancestorNode) {
    this.name = name;
    this.ancestor = ancestorNode;
  }
}

Solution 1:

We can find the youngest common ancestor by creating a list of ancestors for both nodes and comparing to see where they differ.

function getYoungestCommonAncestor(topAncestor, descendantOne, descendantTwo) {

  // helper function for generating a list of node ancestors
  function findAncestors(startingNode) {
    let currentNode = startingNode;
    let nodeAncestors = []
    while (currentNode) {
      nodeAncestors.unshift(currentNode);
      currentNode = currentNode.ancestor;
    }
    return nodeAncestors;
  }

  let d1ancestors = findAncestors(descendantOne);
  let d2ancestors = findAncestors(descendantTwo);


  for (let i = 0; i < d1ancestors.length; i++) {
    if (d1ancestors[i] !== d2ancestors[i]) {
      return d1ancestors[i - 1];
    }
  }

  // if both descendant arguments point to the same node
  return descendantOne;

}

// O(n + m) time | O(n + m) space  <---- where 'n' and 'm' are the depth of the descendant nodes.
Solution 2:

We can save space complexity by writing helper-functions that keep track of the depth of the descendant nodes instead of generating a list of ancestors.

function getYoungestCommonAncestor(topAncestor, descendantOne, descendantTwo) {
  const depthOne = getDescendantDepth(descendantOne, topAncestor);
  const depthTwo = getDescendantDepth(descendantTwo, topAncestor);

  // determine which descendant is lower and put the arguments in the right order for backtrackAncestralTree
  if (depthOne > depthTwo) {
    return backtrackAncestralTree(descendantOne, descendantTwo, depthOne - depthTwo);
  } else {
    return backtrackAncestralTree(descendantTwo, descendantOne, depthTwo - depthOne);
  }
}

// count steps from descendant to topAncestor
function getDescendantDepth(descendant, topAncestor) {
  let depth = 0;
  let currentNode = descendant;
  while (currentNode !== topAncestor) {
    depth++;
    currentNode = currentNode.ancestor;
  }
  return depth;
}

function backtrackAncestralTree(lowerDescendant, higherDescendant, diff) {

  // move up the tree from the lowerDescendant until we are referencing two nodes at the same depth
  while (diff > 0) {
    lowerDescendant = lowerDescendant.ancestor;
    diff--;
  }

  // move up the tree from both nodes until we hit a common node.
  while (lowerDescendant !== higherDescendant) {
    lowerDescendant = lowerDescendant.ancestor;
    higherDescendant = higherDescendant.ancestor;
  }

  return lowerDescendant;
}


// O(n + m) time | O(1) space  <---- where 'n' and 'm' are the depth of the descendant nodes.
Interviewer Prompts:
Make sure your interviewee is considering edge cases, like what happens if one of the nodes is the topAncestor or if one of the nodes is the most recent common ancestor. If they manage to find one of the solutions within the time limit, encourage them to try and find the other.
