Move Element To End
Prompt
You are given an array of integers and a target integer. Write a function that moves all instances of the target integer in the array to the end of the array. The order of the non-target integers in the array should be maintained.

Example

Input: ([2, 1, 2, 2, 2, 3, 4, 2], 2)
Output: [1, 3, 4, 2, 2, 2, 2, 2]
Solutions
naive solution

function moveElementToEnd(arr, target) {
  let result = []
  let numTargets = 0

  for (let i = 0; i < arr.length; i++){
    if (arr[i] !== target){
      result.push(arr[i])
    } else {
      numTargets++
    }
  }

  while(numTargets--){
    result.push(target)
  }
  return result
}
// O(n) time | O(n) space
optimal solution

function moveElementToEnd(arr, target) {
  let lastNonTargetIndex = 0;

  // If the current element is not our target, then we need to
  // append it in front of the last non-target element we found.

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== target) {
    arr[lastNonTargetIndex++] = arr[i];
      }
  }

  // After we have finished processing every element,
  // all the non-target numbers are at the beginning of the array.
  // We just need to replace the rest of the array with our target numbers.

  for (let i = lastNonTargetIndex; i < arr.length; i++) {
    arr[i] = target;
  }
  return arr
}

// O(n) Time | O(1) Space
Interviewer Prompts:
Most will go toward the naive solution quickly. If they do, that's awesome. Once they get a solution, talk about time and space complexity and make sure they realize why the naive solution is O(n) (linear) space complexity. Then ask if they can create a solution without using any extra space, or an O(1) (constant) space. Watch out for value swapping in the array because this may lead to scrambled non-target numbers in our result array.
