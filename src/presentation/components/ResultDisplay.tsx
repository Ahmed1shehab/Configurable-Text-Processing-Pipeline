import { AnalysisResult } from "@/domain/value-objects/AnalysisResult";
import { PipelineStats } from "@/domain/value-objects/PipelineStats";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

// Define proper types for the result
interface ProcessingResult {
  originalInput: string;
  processedOutput: string | string[];
  steps: string[];
  processingMode: 'single' | 'array';
}

interface ResultDisplayProps {
  result: ProcessingResult | AnalysisResult | AnalysisResult[] | string | string[];
  statistics: PipelineStats | null;
  selectedSteps: string[];
  processingMode: 'single' | 'array';
}

export function ResultDisplay({ result, statistics, selectedSteps, processingMode }: ResultDisplayProps) {
  const renderResult = () => {
    if (!result) return null;

    // Handle ProcessingResult type
    if (typeof result === 'object' && 'processedOutput' in result) {
      const processedResult = result as ProcessingResult;
      if (processingMode === 'array' && Array.isArray(processedResult.processedOutput)) {
        return processedResult.processedOutput.map((item, index) => (
          <div key={index} className="mb-4 p-3 border rounded">
            <div className="font-medium mb-2">Item {index + 1}:</div>
            <div>{String(item)}</div>
          </div>
        ));
      }
      return (
        <div className="p-3 bg-gray-50 rounded">
          {String(processedResult.processedOutput)}
        </div>
      );
    }

    // Handle array of AnalysisResult or strings
    if (Array.isArray(result)) {
      return result.map((item, index) => (
        <div key={index} className="mb-4 p-3 border rounded">
          <div className="font-medium mb-2">Item {index + 1}:</div>
          {item instanceof AnalysisResult ? (
            <div>
              <div className="mb-2">{item.data}</div>
              <div className="text-sm text-gray-600">
                Words: {item.wordCount} | Characters: {item.characterCount} | Sentences: {item.sentenceCount}
              </div>
            </div>
          ) : (
            <div>{String(item)}</div>
          )}
        </div>
      ));
    }

    // Handle single AnalysisResult
    if (result instanceof AnalysisResult) {
      return (
        <div>
          <div className="mb-4 p-3 bg-gray-50 rounded">
            <div className="font-medium mb-2">Processed Text:</div>
            <div>{result.data}</div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{result.wordCount}</div>
              <div className="text-sm text-gray-600">Words</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{result.characterCount}</div>
              <div className="text-sm text-gray-600">Characters</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{result.sentenceCount}</div>
              <div className="text-sm text-gray-600">Sentences</div>
            </div>
          </div>
        </div>
      );
    }

    // Handle simple string result
    return <div className="p-3 bg-gray-50 rounded">{String(result)}</div>;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Processing Result</CardTitle>
        </CardHeader>
        <CardContent>
          {renderResult()}
        </CardContent>
      </Card>

      {statistics && selectedSteps.includes('analyze') && (
        <Card>
          <CardHeader>
            <CardTitle>Pipeline Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{statistics.processedItems}</div>
                <div className="text-sm text-gray-600">Items Processed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{statistics.totalWords}</div>
                <div className="text-sm text-gray-600">Total Words</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{statistics.totalCharacters}</div>
                <div className="text-sm text-gray-600">Total Characters</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{statistics.totalSentences}</div>
                <div className="text-sm text-gray-600">Total Sentences</div>
              </div>
            </div>
            <div className="text-center text-sm text-gray-500">
              Processing Time: {statistics.processingTime.toFixed(2)}ms
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}