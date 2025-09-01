import { PipelineStats } from "@/domain/value-objects/PipelineStats";
import { ProcessorRegistry } from "../services/ProcessorRegistry";
import { IProcessorContext } from "@/domain/interfaces/analysisMetaData";
import { AnalysisResult } from "@/domain/value-objects/AnalysisResult";

export class Pipeline {
  private _registry: ProcessorRegistry;
  private _steps: string[];
  private _stats: PipelineStats;

  constructor(registry: ProcessorRegistry, steps: string[] = []) {
    this._registry = registry;
    this._steps = [];
    this._stats = new PipelineStats();
    this.configure(steps);
  }

  configure(steps: string[]): this {
    this._validateSteps(steps);
    this._steps = steps;
    return this;
  }

  process(input: string | string[]): unknown {
    const startTime = performance.now();
    this._stats.reset();

    let result: unknown = input;
    const context: IProcessorContext = { pipeline: this, stats: this._stats };

    try {
      for (const stepName of this._steps) {
        const processor = this._registry.get(stepName);
        result = processor.process(result as string | string[], context);

        if (stepName === "analyze") {
          this._collectStats(result);
        }
      }

      this._stats.processingTime = performance.now() - startTime;
      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Pipeline processing failed: ${error.message}`);
      }
      throw new Error("Pipeline processing failed with unknown error");
    }
  }

  getStatistics(): PipelineStats {
    return this._stats.toObject(); // Return a copy for immutability
  }

  getSteps(): string[] {
    return [...this._steps];
  }

  private _validateSteps(steps: string[]): void {
    if (!Array.isArray(steps)) {
      throw new Error("Steps must be an array");
    }

    const available = this._registry.getAvailable().map((p) => p.name);
    const invalid = steps.filter((step) => !available.includes(step));

    if (invalid.length > 0) {
      throw new Error(`Invalid steps: ${invalid.join(", ")}`);
    }
  }

  private _collectStats(result: unknown): void {
    if (Array.isArray(result)) {
      result.forEach((item) => {
        if (item instanceof AnalysisResult) {
          this._stats.addAnalysis(item);
        }
      });
    } else if (result instanceof AnalysisResult) {
      this._stats.addAnalysis(result);
    }
  }
}
