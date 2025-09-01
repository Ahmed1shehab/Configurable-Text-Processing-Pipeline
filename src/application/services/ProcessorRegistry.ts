import { ProcessorConstructor, ProcessorInfo } from "@/domain/interfaces/analysisMetaData";
import { AnalyzeProcessor, CleanProcessor, TransformProcessor } from "@/infrastructure/processors/ConcreteProcessor";
import { IProcessor } from "@/infrastructure/processors/IProcessor";

export class ProcessorRegistry {
  private _processors: Map<string, ProcessorConstructor> = new Map();

  constructor() {
    this._initializeDefaultProcessors();
  }

  private _initializeDefaultProcessors(): void {
    this.register("clean", CleanProcessor);
    this.register("transform", TransformProcessor);
    this.register("analyze", AnalyzeProcessor);
  }

  register(name: string, ProcessorClass: ProcessorConstructor): void {
    if (!ProcessorClass) {
      throw new Error("Processor must be a class constructor");
    }
    this._processors.set(name, ProcessorClass);
  }

  get(name: string): IProcessor {
    const ProcessorClass = this._processors.get(name);
    if (!ProcessorClass) {
      throw new Error(`Processor '${name}' not found`);
    }
    return new ProcessorClass();
  }

  getAvailable(): ProcessorInfo[] {
    return Array.from(this._processors.entries()).map(([name, ProcessorClass]) => {
      const instance = new ProcessorClass();
      return {
        name,
        description: instance.description,
        version: instance.version,
      };
    });
  }
}
