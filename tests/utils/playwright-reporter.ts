import {Reporter} from "@playwright/test/reporter";

class TestsReporter implements Reporter {
  public onBegin(config, suite): void {
    console.log(`๐ญ Starting the run with ${suite.allTests().length} tests`);
  }

  public onTestBegin(test): void {
    console.log(`๐งช Starting test ${test.title}`);
  }

  public onTestEnd(test, result): void {
    console.log(
      `${this.resultIcon(result.status)} Finished test ${test.title}: ${
        result.status
      }`
    );
  }

  public onEnd(result): void {
    console.log(`๐ญ Finished the run: ${result.status}`);
  }

  public resultIcon(result: string): string {
    switch (result) {
      case ResultStatus.Passed:
        return "โ";
      case ResultStatus.Failed:
        return "๐ฅ";
      case ResultStatus.Timedout:
        return "โฑ";
      case ResultStatus.Interrupted:
        return "โ";
      default:
        return "Unknown Status";
    }
  }
}

enum ResultStatus {
  Passed = "passed",
  Failed = "failed",
  Timedout = "timedout",
  Interrupted = "interrupted",
}

export default TestsReporter;
