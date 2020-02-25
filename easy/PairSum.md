PAIRSUM
PROMPT
Given an array of numbers sorted in ascending order (least to greatest), and a separate number (a "sum"), determine if any 2 numbers in the array add up to the sum. Return true if any 2 different numbers within the array add up to sum. Return false if no 2 numbers in the array add up to sum.

Return true or false based on whether any 2 different numbers in the array add up to sum.

normal test cases

console.log(pairSum([1, 1, 2, 3, 4, 5], 7) ) //true
console.log(pairSum([1, 2, 3, 4, 5], 10) ) //false
console.log(pairSum([1, 2, 3, 7, 8], 7) ) //false
console.log(pairSum([1, 2, 3, 4, 5], 2) ) //false
edge test cases

console.log(pairSum([1], 2) ) //false
console.log(pairSum([], 2) ) //false
Solutions
naive solution

function pairSum(arr, target) {
    for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[i] + arr[j] === target) return true;
        }
    }
    return false;
}
More Optimal solution (but not optimal space complexity)

function pairSum (array, target) {
    let hash = {}

    for (let i = 0; i < array.length; i++) {
        let num = array[i]
        if (hash[num]) return true
        else {
            hash[target - num] = true
        }
    }
    return false
}
optimized solution

function pairSum(arr, target) {
    var leftIdx = 0, rightIdx = arr.length - 1;

    if (arr.length < 2) return false; // edge case

    while (leftIdx !== rightIdx) {
        var currSum = arr[leftIdx] + arr[rightIdx];

        if (currSum === target) return true;
        else if (currSum < target) leftIdx++;
        else rightIdx--;
    }

    return false;
}
Interviewer Prompts:
Most candidates don’t have much trouble implementing a naive solution to pairSum if they've gotten this far. Common issues candidates have are trying to use forEach and not realizing the return gets swallowed inside the callback and struggling to make sure they aren't adding a number with itself to get the target (people tend to overthink that).

People will often miss small optimizations in the naive approach, like returning early instead of using a boolean flag that gets returned at the end, or starting the inner loop at i + 1 (which also simplifies the problem of not adding a number to itself). It’s important to bring these up if they haven't used them in their naive solution

When transitioning to make the bigger optimizations, ask if they're familiar with time complexity or Big O notation. If they are, see if they can identify the Big O for their algorithm. If not, you get to try to explain the basics to them in ~2 minutes (hooray!). If they're struggling, focus on the number of comparisons actually being made for small, specific example arrays. You should be able to demonstrate that for an array with 3 elements, a completely unoptimized solution would make ~9 comparisons, and an array with 5 elements will make ~25, etc. See if they can identify the pattern before asking if they can think of a better way.

Some people spot it quickly, but many struggle to make the jump from 'I understand why my algorithm is inefficient' to 'I see the O(n) solution.' I typically start by asking if they see something in the prompt (the fact that the array is sorted) that they aren't currently taking advantage of. If they're still not seeing it, maybe ask something like, 'what if instead of always starting from the beginning, we worked from the outside in?' Remember that it isn't ultimately about whether or not they come up with the solution we're looking for, but how they reason through the problem and use the info they're given.

Some interviewees may come up with an O(nlogn) solution using binary search. Especially if they have a CS background of any kind, so it's good to at least be familiar with that approach, even if you're just going to tell them that it's a step in the right direction but still not the best we can do.
