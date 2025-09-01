
import { AnalysisMetadata } from "@/domain/interfaces/analysisMetaData";

export abstract class ProcessingResult<T> {
  public readonly data: T;
  public readonly metadata: AnalysisMetadata;

  constructor(data: T, metadata: AnalysisMetadata) {
    this.data = data;
    this.metadata = metadata;
  }

  public getData(): T {
    return this.data;
  }

  public getMetadata(): AnalysisMetadata {
    return this.metadata;
  }
}