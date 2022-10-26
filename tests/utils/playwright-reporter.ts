import {Reporter} from "@playwright/test/reporter";

class TestsReporter implements Reporter {
  public onBegin(config, suite): void {
    console.log(`🎭 Starting the run with ${suite.allTests().length} tests`);
  }

  public onTestBegin(test): void {
    console.log(`🧪 Starting test ${test.title}`);
  }

  public onTestEnd(test, result): void {
    console.log(
      `${this.resultIcon(result.status)} Finished test ${test.title}: ${
        result.status
      }`
    );
  }

  public onEnd(result): void {
    console.log(`🎭 Finished the run: ${result.status}`);
  }

  public resultIcon(result: string) {
    switch (result) {
      case ResultStatus.Passed:
        return "✅";
      case ResultStatus.Failed:
        return "💥";
      case ResultStatus.Timedout:
        return "⏱";
      case ResultStatus.Interrupted:
        return "⛔";
      default:
        break;
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
