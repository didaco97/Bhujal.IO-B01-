# Bhujal.io - Groundwater Information Portal

A comprehensive platform for groundwater information and management powered by AI technology.

## Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/yourusername/bhujal-io.git
cd bhujal-io
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Perplexity API key:
```bash
VITE_PERPLEXITY_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Features

- 🤖 AI-powered chatbot for groundwater queries
- 📊 Groundwater data visualization
- 📝 NOC application guidelines
- 🎓 Training resources
- 📑 AI-generated reports

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Vite
- React Router
- Perplexity API for AI chat
- Lucide React for icons

## Project Structure

```
src/
├── components/        # Reusable UI components
├── pages/            # Page components
├── services/         # API and service functions
└── assets/           # Static assets
```

## Environment Variables

- `VITE_PERPLEXITY_API_KEY` - Your Perplexity API key for the chatbot

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.