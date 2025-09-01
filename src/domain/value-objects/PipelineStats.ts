import { AnalysisResult } from "./AnalysisResult";
export class PipelineStats {
  public totalWords: number = 0;
  public totalCharacters: number = 0;
  public totalSentences: number = 0;
  public processedItems: number = 0;
  public processingTime: number = 0;

  constructor() {
    this.reset();
  }

  reset(): void {
    this.totalWords = 0;
    this.totalCharacters = 0;
    this.totalSentences = 0;
    this.processedItems = 0;
    this.processingTime = 0;
  }

  addAnalysis(analysis: AnalysisResult): void {
    this.totalWords += analysis.wordCount;
    this.totalCharacters += analysis.characterCount;
    this.totalSentences += analysis.sentenceCount;
    this.processedItems += 1;
  }

  // Create a copy for immutability
  toObject(): PipelineStats {
    const copy = new PipelineStats();
    copy.totalWords = this.totalWords;
    copy.totalCharacters = this.totalCharacters;
    copy.totalSentences = this.totalSentences;
    copy.processedItems = this.processedItems;
    copy.processingTime = this.processingTime;
    return copy;
  }
}
