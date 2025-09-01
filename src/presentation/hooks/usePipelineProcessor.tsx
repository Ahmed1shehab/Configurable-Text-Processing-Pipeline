import { TextProcessingUseCase } from "@/application/usecases/TextProcessingUseCase";
import { ProcessorInfo } from "@/domain/interfaces/analysisMetaData";
import { PipelineStats } from "@/domain/value-objects/PipelineStats";
import { AnalysisResult } from "@/domain/value-objects/AnalysisResult";
import { useMemo, useState } from "react";

// Define proper result types
type ProcessingResult = AnalysisResult | AnalysisResult[] | string | string[] | {
  originalInput: string;
  processedOutput: string | string[];
  steps: string[];
  processingMode: 'single' | 'array';
};

interface PipelineState {
  result: ProcessingResult | null;
  statistics: PipelineStats | null;
  isProcessing: boolean;
  error: string | null;
}

export function usePipelineProcessor() {
  const useCase = useMemo(() => new TextProcessingUseCase(), []);
  const [state, setState] = useState<PipelineState>({
    result: null,
    statistics: null,
    isProcessing: false,
    error: null
  });

  const processText = async (input: string, steps: string[], mode: 'single' | 'array') => {
    setState(prev => ({ ...prev, isProcessing: true, error: null }));
    
    try {
      const response = useCase.processText(input, steps, { mode });
      
      // Ensure the result is properly typed
      const typedResult: ProcessingResult = response.result as ProcessingResult;
      
      setState({
        result: typedResult,
        statistics: response.statistics,
        isProcessing: false,
        error: null
      });
    } catch (error) {
      setState({
        result: null,
        statistics: null,
        isProcessing: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  };

  const getAvailableProcessors = (): ProcessorInfo[] => useCase.getAvailableProcessors();

  return {
    ...state,
    processText,
    getAvailableProcessors
  };
}