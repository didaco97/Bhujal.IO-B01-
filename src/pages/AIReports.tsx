import React, { useState } from 'react';
import { FileOutput, Loader, AlertCircle } from 'lucide-react';
import ReportQuestion from '../components/ReportQuestion';
import ParameterSelection from '../components/ParameterSelection';
import { generateReport } from '../services/reportGenerator';

interface Question {
  id: string;
  text: string;
  options: string[];
}

interface FormData {
  reportType: string;
  location: string;
  period: string;
  parameters: string[];
}

const questions: Question[] = [
  {
    id: 'reportType',
    text: 'What type of report do you need?',
    options: [
      'Groundwater Level Analysis',
      'Water Quality Assessment',
      'Aquifer Characterization',
      'Sustainability Analysis'
    ]
  },
  {
    id: 'location',
    text: 'Select the region for analysis',
    options: [
      'North India',
      'South India',
      'East India',
      'West India',
      'Central India'
    ]
  },
  {
    id: 'period',
    text: 'Select the time period for analysis',
    options: [
      'Last 6 months',
      'Last 1 year',
      'Last 5 years',
      'Last 10 years'
    ]
  }
];

const parameters = [
  'pH Level',
  'Total Dissolved Solids (TDS)',
  'Chloride Content',
  'Fluoride Level',
  'Nitrate Concentration',
  'Groundwater Level',
  'Recharge Rate',
  'Extraction Rate'
];

export default function AIReports() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    reportType: '',
    location: '',
    period: '',
    parameters: [],
  });

  const handleOptionSelect = (questionId: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [questionId]: value
    }));
    setError(null);
  };

  const handleParameterToggle = (parameter: string) => {
    setFormData(prev => ({
      ...prev,
      parameters: prev.parameters.includes(parameter)
        ? prev.parameters.filter(p => p !== parameter)
        : [...prev.parameters, parameter]
    }));
    setError(null);
  };

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      const apiKey = import.meta.env.VITE_PERPLEXITY_API_KEY;
      await generateReport(formData, apiKey || '');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate report');
    } finally {
      setIsGenerating(false);
    }
  };

  const renderCurrentStep = () => {
    if (currentStep < questions.length) {
      const question = questions[currentStep];
      return (
        <ReportQuestion
          text={question.text}
          options={question.options}
          selectedValue={formData[question.id as keyof FormData] as string}
          onSelect={(value) => handleOptionSelect(question.id, value)}
        />
      );
    }
    return (
      <ParameterSelection
        parameters={parameters}
        selectedParameters={formData.parameters}
        onToggle={handleParameterToggle}
      />
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="card">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-primary/10 p-3 rounded-lg">
            <FileOutput className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">AI Report Generation</h1>
            <p className="text-gray-600">Generate customized groundwater analysis reports</p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2 text-red-600">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / (questions.length + 1)) * 100}%` }}
            />
          </div>

          {/* Question Form */}
          {renderCurrentStep()}

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              className="btn btn-primary"
              onClick={() => setCurrentStep(prev => prev - 1)}
              disabled={currentStep === 0}
            >
              Previous
            </button>
            
            {currentStep < questions.length ? (
              <button
                className="btn btn-primary"
                onClick={() => setCurrentStep(prev => prev + 1)}
                disabled={!formData[questions[currentStep].id as keyof FormData]}
              >
                Next
              </button>
            ) : (
              <button
                className="btn btn-primary flex items-center space-x-2"
                onClick={handleGenerateReport}
                disabled={isGenerating || formData.parameters.length === 0}
              >
                {isGenerating ? (
                  <>
                    <Loader className="h-5 w-5 animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <span>Generate Report</span>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}