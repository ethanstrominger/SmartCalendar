import { isBrowser, isTestingWithJest, isCommandLine } from "./smartCalendarUtils"
console.log("Expected: isBrowser=false Actual ",isBrowser());
console.log("Expected: isTestingWithJest=false Actual ",isTestingWithJest());
console.log("Expected: isCommandLine=true Actual ",isCommandLine());
