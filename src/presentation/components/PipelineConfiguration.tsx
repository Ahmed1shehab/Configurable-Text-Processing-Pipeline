import { usePipelineProcessor } from "../hooks/usePipelineProcessor";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Checkbox } from "./ui/checkbox";

interface PipelineConfigurationProps {
  selectedSteps: string[];
  onStepsChange: (steps: string[]) => void;
  processingMode: 'single' | 'array';
  onModeChange: (mode: 'single' | 'array') => void;
}

export function PipelineConfiguration({ 
  selectedSteps, 
  onStepsChange, 
  processingMode, 
  onModeChange 
}: PipelineConfigurationProps) {
  const { getAvailableProcessors } = usePipelineProcessor();
  const availableSteps = getAvailableProcessors();

  const handleStepToggle = (stepName: string) => {
    const newSteps = selectedSteps.includes(stepName)
      ? selectedSteps.filter(s => s !== stepName)
      : [...selectedSteps, stepName];
    onStepsChange(newSteps);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pipeline Configuration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Processing Mode */}
        <div>
          <label className="text-sm font-medium mb-2 block">Processing Mode:</label>
          <div className="flex gap-4">
            {(['single', 'array'] as const).map(mode => (
              <label key={mode} className="flex items-center">
                <input
                  type="radio"
                  value={mode}
                  checked={processingMode === mode}
                  onChange={(e) => onModeChange(e.target.value as 'single' | 'array')}
                  className="mr-2"
                />
                {mode === 'single' ? 'Single Text' : 'Array of Texts'}
              </label>
            ))}
          </div>
        </div>

        {/* Processor Selection */}
        <div>
          <label className="text-sm font-medium mb-2 block">Available Processors:</label>
          <div className="space-y-2">
            {availableSteps.map((processor) => (
              <div key={processor.name} className="flex items-start space-x-2">
                <Checkbox
                  id={processor.name}
                  checked={selectedSteps.includes(processor.name)}
                  onCheckedChange={() => handleStepToggle(processor.name)}
                />
                <div className="flex-1">
                  <label htmlFor={processor.name} className="text-sm font-medium cursor-pointer">
                    {processor.name.charAt(0).toUpperCase() + processor.name.slice(1)} v{processor.version}
                  </label>
                  <p className="text-xs text-gray-500">{processor.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pipeline Preview */}
        <div>
          <label className="text-sm font-medium mb-2 block">Pipeline Flow:</label>
          <div className="flex flex-wrap gap-1">
            {selectedSteps.length === 0 ? (
              <Badge variant="outline">No processors selected</Badge>
            ) : (
              selectedSteps.map((step, index) => (
                <Badge key={step} variant="default">
                  {index + 1}. {step.charAt(0).toUpperCase() + step.slice(1)}
                </Badge>
              ))
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}