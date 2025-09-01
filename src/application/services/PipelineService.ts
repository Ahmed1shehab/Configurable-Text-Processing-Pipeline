import { ProcessorConstructor, ProcessorInfo } from "@/domain/interfaces/analysisMetaData";
import { Pipeline } from "../pipeline/Pipeline";
import { ProcessorRegistry } from "./ProcessorRegistry";

export class PipelineService {
  private _registry: ProcessorRegistry;

  constructor() {
    this._registry = new ProcessorRegistry();
  }

  createPipeline(steps: string[] = []): Pipeline {
    return new Pipeline(this._registry, steps);
  }

  getAvailableProcessors(): ProcessorInfo[] {
    return this._registry.getAvailable();
  }

  registerProcessor(name: string, ProcessorClass: ProcessorConstructor): void {
    this._registry.register(name, ProcessorClass);
  }
}