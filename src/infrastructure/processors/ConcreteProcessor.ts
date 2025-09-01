import {
  AnalysisMetadata,
  IProcessorContext,
} from "@/domain/interfaces/analysisMetaData";
import { IProcessor } from "./IProcessor";
import { AnalysisResult } from "@/domain/value-objects/AnalysisResult";

export class CleanProcessor extends IProcessor {
  constructor() {
    super("clean", "Remove extra whitespace and normalize text formatting");
  }

  process(
    input: string | string[],
    context: IProcessorContext = {}
  ): string | string[] {
    this.validate(input);

    if (Array.isArray(input)) {
      return input.map((text) => this._cleanText(text));
    }
    return this._cleanText(input);
  }

  private _cleanText(text: string): string {
    return text.replace(/\s+/g, " ").replace(/\n+/g, " ").trim();
  }
}

export class TransformProcessor extends IProcessor {
  constructor() {
    super("transform", "Convert to lowercase and remove punctuation");
  }

  process(
    input: string | string[],
    context: IProcessorContext = {}
  ): string | string[] {
    this.validate(input);

    if (Array.isArray(input)) {
      return input.map((text) => this._transformText(text));
    }
    return this._transformText(input);
  }

  private _transformText(text: string): string {
    return text.toLowerCase().replace(/[^\w\s]/gi, "");
  }
}

export class AnalyzeProcessor extends IProcessor {
  constructor() {
    super("analyze", "Analyze text metrics: words, characters, sentences");
  }

  process(
    input: string | string[],
    context: IProcessorContext = {}
  ): AnalysisResult | AnalysisResult[] {
    this.validate(input);

    if (Array.isArray(input)) {
      return input.map((text) => this._analyzeText(text));
    }
    return this._analyzeText(input);
  }

  private _analyzeText(text: string): AnalysisResult {
    const words = text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);
    const characters = text.length;
    const sentences = text
      .split(/[.!?]+/)
      .filter((sentence) => sentence.trim().length > 0).length;

    const analysis: AnalysisMetadata = {
      wordCount: words.length,
      characterCount: characters,
      sentenceCount: sentences,
    };

    return new AnalysisResult(text, analysis);
  }
}
