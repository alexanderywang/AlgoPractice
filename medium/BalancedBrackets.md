Balanced Brackets
--

Prompt
Write a function that determines whether an input string has balanced brackets.

You are given an input string consisting of brackets—square [ ], round ( ), and curly { }. The input string can include other text. Write a function that returns either true if the brackets in the input string are balanced or false if they are not. Balanced means that any opening bracket of a particular type must also have a closing bracket of the same type.

An empty input string or a string without brackets can also be considered "balanced".

Examples
// ("") => return false
// ("[") => return false
// ("()") => return true
// ("a") => return false
// ("{a}") => return true
// ("[(])") => return false
// ("[]()") => return true
// ("[({})]") => return true
// ("[({})") => return false
Approach
Store a dictionary of matching brackets. (constant time)

I want to use a data structure that stores the most recent opening bracket. - A STACK

Loop through our string, if our current element is an opening bracket push into our stack.

Else check if it is a closing bracket, if it is make a comparison with most recent popped bracket in stack, if it is NOT a match - return FALSE because we know they are not matching.

In the end if our stack is empty, we matched all the brackets in the correct order! - return true, if stack.length === 0

Code
// Time Complexity
// O(n)

// Space Complexity
// O(n)

function balancedBrackets(str) {
  if (str.length < 2) return false;
  const matchingBrackets = {
    "(": ")",
    "{": "}",
    "[": "]"
  };

  const stack = [];

  for (let i = 0; i < str.length; i++) {
    if (str[i] in matchingBrackets) {
      stack.push(str[i]);
    } else if (str[i] === ")" || str[i] === "}" || str[i] === "]") {
      // if our stack is empty, then we have closing bracket first, just return false
      if (stack.length === 0) return false;
      let lastElem = stack.pop();
      if (str[i] !== matchingBrackets[lastElem]) return false;
    }
  }
  return stack.length === 0;
}
