import { IProcessorContext } from "@/domain/interfaces/analysisMetaData";

export abstract class IProcessor {
  public name: string;
  public description: string;
  public version: string;

  constructor(name: string, description: string, version: string = "1.0.0") {
    this.name = name;
    this.description = description;
    this.version = version;
  }

  abstract process(input: string | string[], context?: IProcessorContext): any;

  protected validate(input: string | string[]): boolean {
    if (input === null || input === undefined) {
      throw new Error(`Invalid input for ${this.name} processor`);
    }
    return true;
  }
}