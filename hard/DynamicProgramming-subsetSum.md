Prompt
Given a target sum and an array of positive integers, return true if any combination of numbers in the array can add to the target. Each number in the array may only be used once. Return false if the numbers cannot be used to add to the target sum.

Examples
subsetSum(2, [1, 10, 5, 3]); // false
subsetSum(10, [1, 10, 5, 3]); // true
subsetSum(9, [1, 10, 5, 3]); // true
subsetSum(19, [1, 10, 5, 3]); // true
subsetSum(17, [1, 10, 5, 3]); // false
Solutions
With dynamic programming techniques—i.e. recognizing overlapping subproblems and avoiding repeated work—we can optimize this to O(n\*m) where n is the target number and m is the size of the array of possible numbers to draw from. Both solutions below fall under the banner of "dynamic programming".

We can have an optimized "bottom-up" solution that is iterative. One approach is to accumulate a set of possible sums starting from 0. We could loop through each given number and add it to every number already in the set. We can then include each of these new possibilities into the possible sums set:

/_
example: subsetSum(17, [1, 10, 5, 3])
=> set of possible sums: [0]
=> add 1 to each possible sum
=> set of possible sums: [0, 1]
=> add 10 to each possible sum
=> set of possible sums: [0, 1, 10, 11]
=> add 5 to each possible sum
=> set of possible sums: [0, 1, 10, 11, 5, 6, 15, 16]
...etc
_/
Furthermore, while adding each new possible sum into the set, we could check if it's equal to the target. If so, we can return true. Otherwise, if it's greater than the target we shouldn't bother adding it in (after all, something greater than the target couldn't possibly be useful for adding up to the target).

An implementation:

// using the ES6 data structure Set: http://exploringjs.com/es6/ch_maps-sets.html#sec_set
function subsetSum(target, nums) {
// initialize possible sums to just a set containing 0
const possibleSums = new Set([0]);
for (const num of nums) {
// copy the current set of possibilities so that we loop down it without the set changing right from under our feet
const currentPossibleSums = new Set(possibleSums);
for (const sum of currentPossibleSums) {
// add each possible sum to each number in the original array of numbers
const newSum = sum + num;
// if it matches the target we're done!
if (newSum === target) return true;
// otherwise, add it to the set of possibilities (as long as it's less than the target)
if (newSum < target) possibleSums.add(newSum);
}
}
// if we get here that means we've exhausted all possible sums less than the target and have found nothing
return false;
}

// similar solution with arrays instead of sets
function subsetSum(target, arr) {
let sums = [0];
for (let i = 0; i < arr.length; i++) {
let sumsCopy = [...sums]; // create a new array to iterate through; iterating through the array that we're mutating will lead to some weird behavior
for (let j = 0; j < sumsCopy.length; j++) {
let newSum = sumsCopy[j] + arr[i];
if (newSum === target) return true;
else if (newSum < target) sums.push(newSum);
}
}
return false;
}
Or we can have an optimized "top-down" recursive solution that takes advantage of memoization. This approach involves stepping through each number in the array and determining whether 1) including it in the sum will lead to a true result (using the remaining numbers) or 2) excluding it from the sum will lead to a true result (using the remaining numbers). We can do so by 1) subtracting that number from the target and recursing onward to the next number and 2) keeping the target the same and recursing onward to the next number. If either of these possibilities returns true, then the ultimate result is true.

We can have two/three base cases. If the target reaches 0 return true. Or if the target ever becomes negative, return false—so that we do not continue recursing needlessly. Similarly, if we reach the end of the array of numbers, we should return false.

That all could look something like:

// initialize the index to 0
function subsetSum(target, nums, idx = 0) {
// if we've hit 0 we're done!
if (target === 0) return true;
// stop trying and return false if the target is negative OR if we've reached the end of the array
if (target < 0 || idx === nums.length) return false;
const num = nums[idx];
// capture the boolean result for the possibility of _excluding_ the current number from the sum
// recursively try with the same target, but continue onto the next index
const whenExcluded = subsetSum(target, nums, idx + 1);
// capture the boolean result for the possibility of _including_ the current number in the sum
// recursively try with the target minus this number and continue onto the next index
const whenIncluded = subsetSum(target - num, nums, idx + 1);
// return whether either possibility came back true
return whenExcluded || whenIncluded;
}
But this alone would be O(2^n) because for each possibility, we consider two more possibilities, etc. This generates a tree of possibilities with 2^n nodes. On the other hand, many of the nodes in this tree are identical.

For example, with subsetSum(100, [1,2,3,4,5,6,7,8,9,10]) we might arrive at the possible subtarget of 2 by subtracting 1 from 3, 2 from 4, 3 from 5, 4 from 6, 5 from 7, 6 from 8, 7 from 9, or 8 from 10.

Since many of the possibilities we generate are redundant, we can find the answer once and cache it for future attempts. That way, if we come across a possibility we've seen before, we needn't explore any of it's "subtargets"—we can just return the cached result right away.

Here's what the solution looks like with delicious memoization sprinkled on top.

Like so:

// initialize the index to 0 and the memoized results to an empty object
function subsetSum(target, nums, idx = 0, memo = {}) {
// if we've seen this target and already solved for it, return the answer right away
if (memo.hasOwnProperty(target)) return memo[target];
// if we've hit 0 we're done!
if (target === 0) return true;
// stop trying and return false if the target is negative OR if we've reached the end of the array
if (target < 0 || idx === nums.length) return false;
const num = nums[idx];
// capture the boolean result for the possibility of _excluding_ the current number from the sum
// recursively try with the same target, but continue onto the next index
const whenExcluded = subsetSum(target, nums, idx + 1, memo);
// capture the boolean result for the possibility of _including_ the current number in the sum
// recursively try with the target minus this number and continue onto the next index
const whenIncluded = subsetSum(target - num, nums, idx + 1, memo);
// determine whether either possibility came back true
const result = whenExcluded || whenIncluded;
// cache this answer, associating it with this particular target
memo[target] = result;
return result;
}
Additions:
subsetsum visualization

Here is a repl showing the difference between the memoized and non-memoized versions
Here are the slides
Here is a video of the O(n\*m) solution

// coderbyte addendum

Simple (Naive) solution

The algorithm for the exponential time, naive solution, is as follows: First we will generate every possible set (the power set), and then check if the sum of any of these sets equals the sum S. For example:

arr = [1, 2, 3]
sum = 5

All possible sets:
[][1]
[2][3]
[1, 2][1, 3]
[2, 3][1, 2, 3]

We can see that we can get a sum of 5 by adding the elements in the set [2, 3]. To generate all possible sets of an array, we'll implement the following algorithm:

(1) The initial power set only contains the empty set: [[]](2) We loop through each element in the array and add it to every element in the power set.
(3) Then we take the union of these two sets.
(4) Once we get the power set, we check to see if the sum equals our goal S.

Example

arr = [1, 2, 3]
sum = 5
sets = [[]]

Step 1: Add 1 to the power set
[[], [1]]

Step 2: Add 2 to the power set
[[], [1], [1, 2], [2]]

Step 3: Add 3 to the power set
[[], [1], [1, 2], [2], [1, 3], [2, 3], [1, 2, 3], [3]]

Code

function ArrayAdditionI(arr) {

// get largest number and remove it from array
var sum = Math.max.apply(null, arr);
arr.splice(arr.indexOf(sum), 1);

// power set
var sets = [[]];

// generate the power set and for each new set
// check if the temporary sum equals our sum above
for (var i = 0; i < arr.length; i++) {
for (var j = 0, len = sets.length; j < len; j++) {
var temp = sets[j].concat(arr[i]);
sets.push(temp);
var s = temp.reduce(function(p, c) { return p + c; });
if (s === sum) { return "true"; }
}
}

return "false";

}

ArrayAdditionI(readline());

This algorithm runs in O(2n) time because in the worse case, we need to create every possible subset of the array to check if any of them equal the goal sum, and there are 2n possible sets.

Revision Note

There was an older article on Coderbyte which had a more efficient solution to this problem, but it was incorrect when dealing with negative numbers. A user provided an updated, correct solution in Python in the comment section of that post which can be viewed here.
