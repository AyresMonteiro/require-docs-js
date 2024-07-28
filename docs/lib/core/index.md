# docs/lib/core/index.js

It defines the function that is responsible for verify if there is **staged documentation** for the git-staged code files.

The used command for list files is: `git diff --cached --name-only --diff-filter=AMR`. The `cached` option list only staged files, the `diff-filter` option removes deleted changes from listing (changes that could cause bugs) and the `name-only` option is self-explanatory.
