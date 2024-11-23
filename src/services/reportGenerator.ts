import { generateResponse } from './perplexityApi';
import html2pdf from 'html2pdf.js';

interface ReportData {
  reportType: string;
  location: string;
  period: string;
  parameters: string[];
}

export const generateReport = async (data: ReportData, apiKey: string): Promise<void> => {
  if (!apiKey) {
    throw new Error('API key is required. Please check your environment variables.');
  }

  if (!data.reportType || !data.location || !data.period || data.parameters.length === 0) {
    throw new Error('All report parameters are required.');
  }

  const prompt = `Generate a detailed technical report for ${data.reportType} in ${data.location} for ${data.period}. 
    Focus on the following parameters: ${data.parameters.join(', ')}. 
    Include sections for: Executive Summary, Methodology, Data Analysis, Findings, and Recommendations.
    Format the response with proper headings and sections.`;

  try {
    const response = await generateResponse([
      { role: 'user', content: prompt }
    ], apiKey);

    const formattedResponse = response.replace(/\n/g, '<br>');
    
    const element = document.createElement('div');
    element.innerHTML = `
      <div style="padding: 20px; font-family: Arial, sans-serif;">
        <h1 style="color: #00548F; margin-bottom: 20px; font-size: 24px;">Groundwater Analysis Report</h1>
        <div style="color: #333; line-height: 1.6;">
          <p><strong>Report Type:</strong> ${data.reportType}</p>
          <p><strong>Location:</strong> ${data.location}</p>
          <p><strong>Period:</strong> ${data.period}</p>
          <p><strong>Parameters:</strong> ${data.parameters.join(', ')}</p>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #ccc;">
          <div style="white-space: pre-wrap;">${formattedResponse}</div>
        </div>
      </div>
    `;
    
    const opt = {
      margin: 1,
      filename: `groundwater-report-${Date.now()}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    await html2pdf().set(opt).from(element).save();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to generate report: ${error.message}`);
    }
    throw new Error('An unexpected error occurred while generating the report.');
  }
};