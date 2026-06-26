# Code Review Issues

This folder contains a comprehensive code review of the `premier-meats-next` repository. Each issue is documented as a separate markdown file with detailed context, solutions, and acceptance criteria.

## 📋 How to Use This Folder

1. **Start Here:** Read [00-REVIEW_SUMMARY.md](00-REVIEW_SUMMARY.md) for an overview and implementation roadmap
2. **Pick an Issue:** Choose from the priority list (Phase 1, 2, 3, or 4)
3. **Read Carefully:** Each issue file contains:
    - Problem description
    - Goal and background
    - Complete solution code
    - Acceptance criteria
    - Notes for junior devs
4. **Implement:** Follow the solution step-by-step
5. **Test:** Verify your change meets all acceptance criteria
6. **Request Review:** Submit PR for senior dev review

### For SReviewers

1. **Overview:** Check [00-REVIEW_SUMMARY.md](00-REVIEW_SUMMARY.md) for executive summary
2. **Assign Issues:** Pick appropriate issues based on developer skill level
3. **Monitor Progress:** Reference specific issues during code review
4. **Guide Learning:** Use "Notes for Junior Dev" sections as teaching opportunities

---

## 📊 Issues Overview

| Issue                                         | Title                             | Severity  | Effort  | Status         |
| --------------------------------------------- | --------------------------------- | --------- | ------- | -------------- |
| [01](01-harden-products-collection-access.md) | Harden Products Collection Access | 🔴 High   | 30 min  | ⏳ Not Started |
| [02](02-add-access-control-productpage.md)    | Add Access Control to ProductPage | 🟡 Medium | 15 min  | ⏳ Not Started |
| [03](03-harden-media-collection.md)           | Harden Media Collection & Fix Bug | 🔴 High   | 45 min  | ⏳ Not Started |
| [04](04-fix-env-var-validation.md)            | Fix Env Var Validation Bug        | 🟡 Medium | 30 min  | ⏳ Not Started |
| [05](05-enable-typescript-strict-mode.md)     | Enable TypeScript Strict Mode     | 🔴 High   | 2-4 hrs | ⏳ Not Started |
| [06](06-remove-debug-console-log.md)          | Remove Debug Console Log          | 🟢 Low    | 5 min   | ⏳ Not Started |
| [07](07-refactor-product-models-dry.md)       | Refactor Product Models (DRY)     | 🟡 Medium | 1 hr    | ⏳ Not Started |
| [08](08-extract-hardcoded-colors.md)          | Extract Hardcoded Colors          | 🟡 Medium | 1-2 hrs | ⏳ Not Started |
| [09](09-fix-navstore-formatting.md)           | Fix navStore Formatting           | 🟢 Low    | 10 min  | ⏳ Not Started |
| [10](10-improve-navbar-soc.md)                | Improve Navbar Component (SoC)    | 🟡 Medium | 1.5 hrs | ⏳ Not Started |
| [11](11-add-error-boundaries.md)              | Add Error Boundaries              | 🟡 Medium | 1 hr    | ⏳ Not Started |
| [12](12-centralize-env-config.md)             | Centralize Environment Config     | 🟡 Medium | 1 hr    | ⏳ Not Started |

---

## 🎯 Quick Links by Category

### Security Issues

- [Issue #1: Harden Products Access](01-harden-products-collection-access.md)
- [Issue #2: ProductPage Access Control](02-add-access-control-productpage.md)
- [Issue #3: Harden Media Collection](03-harden-media-collection.md)

### Code Quality Issues

- [Issue #4: Fix Env Var Validation](04-fix-env-var-validation.md)
- [Issue #5: Enable TypeScript Strict](05-enable-typescript-strict-mode.md)
- [Issue #6: Remove Console Log](06-remove-debug-console-log.md)
- [Issue #9: Fix Formatting](09-fix-navstore-formatting.md)

### Architecture Issues

- [Issue #7: Refactor Product Models](07-refactor-product-models-dry.md)
- [Issue #8: Extract Colors](08-extract-hardcoded-colors.md)
- [Issue #10: Improve Navbar (SoC)](10-improve-navbar-soc.md)

### Reliability Issues

- [Issue #11: Add Error Boundaries](11-add-error-boundaries.md)
- [Issue #12: Env Configuration](12-centralize-env-config.md)

---

## 🚀 Implementation Phases

### Phase 1: Critical Security (1-2 hours)

Start here—these are mandatory security fixes:

1. Issue #1: Harden Products Collection
2. Issue #3: Harden Media Collection
3. Issue #2: ProductPage Access Control

### Phase 2: Code Quality (1-2 hours)

Improve reliability and type safety:

4. Issue #5: Enable TypeScript Strict Mode
5. Issue #4: Fix Env Validation
6. Issue #12: Centralize Env Config

### Phase 3: Architecture (2-3 hours)

Refactor for maintainability and scalability:

7. Issue #7: Refactor Product Models
8. Issue #8: Extract Colors
9. Issue #10: Improve Navbar

### Phase 4: Polish (30 minutes)

Quick fixes and clean code:

10. Issue #11: Add Error Boundaries
11. Issue #9: Fix Formatting
12. Issue #6: Remove Console Log

---

## ✅ Progress Tracking

Use this checklist to track your progress:

- [ ] Phase 1: All security issues completed
- [ ] Phase 2: All quality issues completed
- [ ] Phase 3: All architecture issues completed
- [ ] Phase 4: All polish issues completed
- [ ] All changes reviewed and merged to main
- [ ] Zero linting errors: `npm run lint`
- [ ] Zero type errors: `npm run build`
- [ ] All tests passing: `npm test`

---

## 💡 Tips for Implementation

### Before You Start

1. ✅ Create a feature branch for each issue (or group related ones)
2. ✅ Read the entire issue file before coding
3. ✅ Understand the "why" behind the recommendation
4. ✅ Check for related issues that might affect your work

### While Implementing

1. ✅ Follow the solution code provided (it's tested)
2. ✅ Add comments for non-obvious changes
3. ✅ Test your changes manually before requesting review
4. ✅ Verify all acceptance criteria are met

### Before Requesting Review

1. ✅ Run linter: `npm run lint`
2. ✅ Run type check: `npm run build`
3. ✅ Run tests: `npm test`
4. ✅ Manually test in browser/API client
5. ✅ Self-review: Would you understand this code tomorrow?
6. ✅ Reference the issue in your PR: "Fixes #[issue-number]"

### During Code Review

1. ✅ Listen to feedback without getting defensive
2. ✅ Ask questions to understand reviewer's suggestions
3. ✅ Explain your approach if it differs from the suggested solution
4. ✅ Make requested changes promptly
5. ✅ Learn from each suggestion (that's the goal!)

---

## 📚 Learning Resources

### Principles Referenced

- **SOLID:** [Wikipedia](https://en.wikipedia.org/wiki/SOLID)
- **Clean Code:** Robert C. Martin's "Clean Code" book
- **DRY:** [Don't Repeat Yourself](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)
- **KISS:** [Keep It Simple, Stupid](https://en.wikipedia.org/wiki/KISS_principle)
- **SoC:** [Separation of Concerns](https://en.wikipedia.org/wiki/Separation_of_concerns)

### Technologies

- **TypeScript:** https://www.typescriptlang.org/docs/
- **Next.js:** https://nextjs.org/docs
- **Payload CMS:** https://payloadcms.com/docs
- **React:** https://react.dev/
- **Tailwind CSS:** https://tailwindcss.com/docs

---

## ❓ FAQ

### Q: What if I don't understand an issue?

**A:**

1. Read the "Background" section—it explains the "why"
2. Check the "Notes for Dev" section
3. Search for the issue number in the codebase
4. Ask senior dev for clarification

### Q: What if the suggested solution doesn't work?

**A:**

1. Check that you followed all steps
2. Look for error messages or console output
3. Compare your code to the provided solution
4. Ask for help (that's okay!)

### Q: Can I skip an issue?

**A:**
No—they're all important. But you can adjust the order:

- Security issues (#1, #2, #3) must come first
- Other issues can be reordered based on priorities

### Q: How do I know when I'm done?

**A:**
Each issue has "Acceptance Criteria" checklist. When all items are checked, you're done.

### Q: What if I find other bugs?

**A:**
Great! Document them:

1. Create a new issue file (Issue #13, #14, etc.)
2. Follow the same format as other issues
3. Show it to senior dev before implementing

---

## 🏁 Success Criteria

You've successfully completed this code review when:

✅ All issues are implemented  
✅ Code passes linting: `npm run lint`  
✅ Code passes type checking: `npm run build`  
✅ Code passes tests: `npm test`  
✅ All PRs are reviewed and merged  
✅ Senior dev is happy with code quality  
✅ You learned something new!

---

**Happy coding! 🚀**

Remember: The goal isn't just to fix code—it's to learn solid engineering practices that you'll use for the rest of your career.
