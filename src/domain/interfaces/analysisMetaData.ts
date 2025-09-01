import { Pipeline } from "@/application/pipeline/Pipeline";
import { PipelineStats } from "../value-objects/PipelineStats";
import { IProcessor } from "@/infrastructure/processors/IProcessor";

export interface AnalysisMetadata {
  wordCount: number;
  characterCount: number;
  sentenceCount: number;
  [key: string]: any;
}

export interface IProcessorContext {
  pipeline?: Pipeline;
  stats?: PipelineStats;
  [key: string]: any;
}

export interface ProcessorInfo {
  name: string;
  description: string;
  version: string;
}

export type ProcessorConstructor = new (...args: any[]) => IProcessor;
