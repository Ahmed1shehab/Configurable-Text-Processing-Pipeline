import { AnalysisMetadata } from "@/domain/interfaces/analysisMetaData";
import { ProcessingResult } from "./ProcessingResult";

export class AnalysisResult extends ProcessingResult<string> {
  public wordCount: number;
  public characterCount: number;
  public sentenceCount: number;

  constructor(text: string, analysis: AnalysisMetadata) {
    super(text, analysis);
    this.wordCount = analysis.wordCount;
    this.characterCount = analysis.characterCount;
    this.sentenceCount = analysis.sentenceCount;
  }

  // Additional methods for analysis-specific functionality
  public getWordDensity(): number {
    return this.wordCount > 0 ? this.characterCount / this.wordCount : 0;
  }

  public getAverageSentenceLength(): number {
    return this.sentenceCount > 0 ? this.wordCount / this.sentenceCount : 0;
  }

  public getSummary(): string {
    return `Text analysis: ${this.wordCount} words, ${this.characterCount} characters, ${this.sentenceCount} sentences`;
  }
}