"use client";
import { useState } from "react";
import { usePipelineProcessor } from "../hooks/usePipelineProcessor";
import { PipelineConfiguration } from "./PipelineConfiguration";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { ResultDisplay } from "./ResultDisplay";
import ContactCard from "./ui/ContactCard";

export default function TextProcessingPipeline() {
  const [inputText, setInputText] = useState("  Hello, World!  \n  This is a TEST.  How are you doing today? Great! ");
  const [selectedSteps, setSelectedSteps] = useState(['clean', 'transform', 'analyze']);
  const [processingMode, setProcessingMode] = useState<'single' | 'array'>('single');
  
  // Use the properly typed hook
  const { result, statistics, isProcessing, error, processText } = usePipelineProcessor();

  const handleProcess = () => {
    processText(inputText, selectedSteps, processingMode);
  };

  const isProcessDisabled = selectedSteps.length === 0 || !inputText.trim() || isProcessing;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Clean Architecture Text Processing Pipeline</h1>
        <p className="text-gray-600">TypeScript implementation with clean architecture principles</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PipelineConfiguration
          selectedSteps={selectedSteps}
          onStepsChange={setSelectedSteps}
          processingMode={processingMode}
          onModeChange={setProcessingMode}
        />

        <Card>
          <CardHeader>
            <CardTitle>Input Text</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                {processingMode === 'array' ? 'Enter text (one item per line):' : 'Enter text to process:'}
              </label>
              <Textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={6}
                placeholder={processingMode === 'array' 
                  ? "Hello, World!\nThis is a test.\nHow are you today?" 
                  : "Enter your text here..."}
                className="w-full"
              />
            </div>
            
            <Button 
              onClick={handleProcess} 
              disabled={isProcessDisabled}
              className="w-full"
            >
              {isProcessing ? 'Processing...' : 'Process Text'}
            </Button>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                Error: {error}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Results - Add proper type checking */}
      {result && (
        <ResultDisplay
          result={result}
          statistics={statistics}
          selectedSteps={selectedSteps}
          processingMode={processingMode}
        />
      )}
      <ContactCard />
    </div>
  );
};