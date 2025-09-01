import { PipelineStats } from "@/domain/value-objects/PipelineStats";
import { PipelineService } from "../services/PipelineService";
import { ProcessorConstructor, ProcessorInfo } from "@/domain/interfaces/analysisMetaData";

interface ProcessingOptions {
  mode: 'single' | 'array';
}

interface ProcessingResponse {
  result: unknown;
  statistics: PipelineStats;
  pipeline: {
    steps: string[];
    processingTime: number;
  };
}

export class TextProcessingUseCase {
  private _pipelineService: PipelineService;

  constructor() {
    this._pipelineService = new PipelineService();
  }

  processText(input: string, steps: string[], options: ProcessingOptions = { mode: 'single' }): ProcessingResponse {
    const pipeline = this._pipelineService.createPipeline(steps);
    
    const processInput = options.mode === 'array' 
      ? this._prepareArrayInput(input)
      : input;

    const result = pipeline.process(processInput);
    const statistics = pipeline.getStatistics();

    return {
      result,
      statistics,
      pipeline: {
        steps: pipeline.getSteps(),
        processingTime: statistics.processingTime
      }
    };
  }

  getAvailableProcessors(): ProcessorInfo[] {
    return this._pipelineService.getAvailableProcessors();
  }

  registerCustomProcessor(name: string, ProcessorClass: ProcessorConstructor): void {
    this._pipelineService.registerProcessor(name, ProcessorClass);
  }

  private _prepareArrayInput(input: string): string[] {
    return input.split('\n').filter(line => line.trim().length > 0);
  }
}