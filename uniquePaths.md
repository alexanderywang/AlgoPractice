Unique Paths Problem
A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below).

The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below).

How many possible unique paths are there?

Unique Paths

Examples
Example #1

Input: m = 3, n = 2
Output: 3
Explanation:
From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:

1. Right -> Right -> Down
2. Right -> Down -> Right
3. Down -> Right -> Right
   Example #2

Input: m = 7, n = 3
Output: 28
Algorithms
Backtracking
First thought that might came to mind is that we need to build a decision tree where D means moving down and R means moving right. For example in case of boars width = 3 and height = 2 we will have the following decision tree:

                START
                /   \
               D     R
             /     /   \
           R      D      R
         /      /         \
        R      R            D

       END    END          END

We can see three unique branches here that is the answer to our problem.

function uniquePaths(width, height, steps = [[0, 0]], uniqueSteps = 0) {
// Fetch current position on board.
const currentPos = steps[steps.length - 1];

// Check if we've reached the end.
if (currentPos[0] === width - 1 && currentPos[1] === height - 1) {
// In case if we've reached the end let's increase total
// number of unique steps.
return uniqueSteps + 1;
}

// Let's calculate how many unique path we will have
// by going right and by going down.
let rightUniqueSteps = 0;
let downUniqueSteps = 0;

// Do right step if possible.
if (currentPos[0] < width - 1) {
steps.push([
currentPos[0] + 1,
currentPos[1],
]);

    // Calculate how many unique paths we'll get by moving right.
    rightUniqueSteps = uniquePaths(width, height, steps, uniqueSteps);

    // BACKTRACK and try another move.
    steps.pop();

}

// Do down step if possible.
if (currentPos[1] < height - 1) {
steps.push([
currentPos[0],
currentPos[1] + 1,
]);

    // Calculate how many unique paths we'll get by moving down.
    downUniqueSteps = uniquePaths(width, height, steps, uniqueSteps);

    // BACKTRACK and try another move.
    steps.pop();

}

// Total amount of unique steps will be equal to total amount of
// unique steps by going right plus total amount of unique steps
// by going down.
return rightUniqueSteps + downUniqueSteps;
}
Time Complexity: O(2 ^ n) - roughly in worst case with square board of size n.

Auxiliary Space Complexity: O(m + n) - since we need to store current path with positions.

Dynamic Programming
Let's treat BOARD[i][j] as our sub-problem.

Since we have restriction of moving only to the right and down we might say that number of unique paths to the current cell is a sum of numbers of unique paths to the cell above the current one and to the cell to the left of current one.

BOARD[i][j] = BOARD[i - 1][j] + BOARD[i][j - 1]; // since we can only move down or right.
Base cases are:

BOARD[0][any] = 1; // only one way to reach any top slot.
BOARD[any][0] = 1; // only one way to reach any slot in the leftmost column.
For the board 3 x 2 our dynamic programming matrix will look like:

0 1 2
0 1 1 1
1 1 2 3
Each cell contains the number of unique paths to it. We need the bottom right one with number 3.

const uniquePaths = (m, n) => {

// create an base array full of '1' as there is at least 1 path to each of the edge nodes
let solutionArray = Array(m).fill([]).map(() => {
return Array(n).fill(1);
});

// iterate over the rows and columns, excluding the row and column at index 0 which should stay at 1
for (let row = 1; row < m; row++) {
for(let column = 1; column < n; column++) {
// set each item in the array equal to the number of routes above plus the number of routes to the left
solutionArray[row][column] = solutionArray[row -1][column] + solutionArray[row][column - 1]
}
}

return solutionArray[m-1][n-1];
}
Time Complexity: O(m \* n) - since we're going through each cell of the DP matrix.

Auxiliary Space Complexity: O(m \* n) - since we need to have DP matrix.

Recursive Solution
recursiveUniquePaths = (m, n) => {

// if we're in Row 1 or Column 1, return 1 as there's only one route to these locations
if (m === 1 || n === 1) return 1;

// otherwise return the sum of the number of routes to the node above and the node to the left
return recursiveUniquePaths(m - 1, n) + recursiveUniquePaths(m, n - 1)

}

// with memoization

recursiveUniquePaths = (m, n, memo = Array(m + 1).fill([]).map(() => {
return Array(n + 1).fill(null)) => {

// if we're in Row 1 or Column 1, return 1 as there's only one route to these locations
if (m === 1 || n === 1) return 1;

// calculate a new value if the memo is undefined
if (memo[m][n] === null) {
memo[m][n] = recursiveUniquePaths(m - 1, n, memo) + recursiveUniquePaths(m, n - 1, memo);
}
return memo[m][n];

}

Time Complexity:

Without Memoization: O(2 ^ n) - roughly in worst case with square board of size n.
With Memoization: O(m \* n) - since we're going through each cell of the DP matrix.
Auxiliary Space Complexity: O(m + n) - since we have up to m + n calls on the stack at any given time.
