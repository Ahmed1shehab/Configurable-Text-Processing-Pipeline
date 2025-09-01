# Clean Architecture Text Processing Pipeline

A TypeScript implementation of a text processing pipeline built with clean architecture principles. This Next.js application demonstrates how to structure a complex text processing system with proper separation of concerns and maintainable code architecture.

## 🏗️ Architecture Overview

This project follows clean architecture principles with clear separation between layers:

```
src/
├── domain/                    # Core business entities
│   ├── entities/             # Business entities and models
│   ├── value-objects/        # Immutable objects (AnalysisResult, PipelineStats)
│   └── interfaces/           # Contracts and abstractions
├── infrastructure/           # External concerns
│   ├── processors/          # Text processing implementations
│   └── adapters/           # External service adapters
├── application/             # Use cases and orchestration
│   ├── usecases/           # Business use cases
│   ├── services/           # Application services
│   └── pipeline/           # Pipeline orchestration logic
├── presentation/            # UI layer
│   ├── components/         # React components
│   ├── hooks/             # Custom React hooks (usePipelineProcessor)
│   ├── pages/             # Next.js pages
│   └── utils/             # UI utilities
└── shared/                  # Cross-cutting concerns
    ├── errors/             # Error handling
    ├── types/              # Shared type definitions
    └── constants/          # Application constants
```

## ✨ Features

- **Clean Architecture**: Proper separation of concerns with dependency inversion
- **Text Processing Pipeline**: Configurable multi-step text processing
- **Flexible Processing Modes**: Support for single text and array processing
- **Real-time Analysis**: Live text statistics and processing results
- **Modular Processors**: Extensible processor system with version management
- **TypeScript**: Full type safety throughout the application
- **React Hooks**: Custom hooks for state management and business logic
- **Modern UI**: Clean, responsive interface with shadcn/ui components

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd clean-architecture-text-pipeline
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Usage

### Basic Text Processing

1. **Select Processing Mode**: Choose between "Single Text" or "Array of Texts"
2. **Configure Pipeline**: Select the processors you want to use:
   - **Clean**: Remove extra whitespace and normalize text
   - **Transform**: Apply text transformations
   - **Analyze**: Generate detailed text statistics
3. **Input Text**: Enter your text in the input area
4. **Process**: Click "Process Text" to run the pipeline
5. **View Results**: See processed output and statistics

### Processing Modes

#### Single Text Mode

Process a single piece of text through the selected processors.

```typescript
Input: "  Hello, World!  \n  This is a TEST.  ";
Output: "Hello, World! This is a TEST.";
```

#### Array Mode

Process multiple text items simultaneously (one per line).

```typescript
Input:
Hello, World!
This is a test.
How are you today?

Output: Array of processed results
```

## 🏛️ Architecture Details

### Domain Layer

Contains the core business logic and entities:

- **Value Objects**: `AnalysisResult`, `PipelineStats` - immutable data structures
- **Entities**: Core business models
- **Interfaces**: Contracts that define behavior

### Infrastructure Layer

Handles external concerns and implementations:

- **Processors**: Concrete implementations of text processing logic
- **Adapters**: External service integrations

### Application Layer

Orchestrates business logic:

- **Use Cases**: Specific business operations
- **Services**: Application services that coordinate domain objects
- **Pipeline**: Processing pipeline orchestration

### Presentation Layer

UI components and user interaction:

- **Components**: React components for UI
- **Hooks**: Custom hooks like `usePipelineProcessor` for state management
- **Pages**: Next.js page components

## 🔌 Extending the System

### Adding New Processors

1. Create a new processor in `src/infrastructure/processors/`:

```typescript
export class CustomProcessor implements IProcessor {
  name = "custom";
  version = "1.0.0";
  description = "Custom text processing";

  process(input: string): string {
    // Implementation
    return processedText;
  }
}
```

2. Register the processor in your pipeline configuration.

### Adding New Processing Modes

Extend the processing modes by modifying the pipeline orchestration logic in the application layer.

## 📊 Processing Statistics

The system provides comprehensive statistics when using the analyze processor:

- **Items Processed**: Number of text items processed
- **Total Words**: Word count across all processed items
- **Total Characters**: Character count including spaces
- **Total Sentences**: Sentence count using intelligent detection
- **Processing Time**: Execution time in milliseconds

## 🛠️ Technical Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **UI Library**: React with shadcn/ui components
- **Styling**: Tailwind CSS
- **State Management**: React hooks and context
- **Architecture**: Clean Architecture principles

## 🧪 Testing

The clean architecture makes testing straightforward with clear boundaries:

- **Domain Layer**: Unit tests for business logic
- **Application Layer**: Integration tests for use cases
- **Infrastructure Layer**: Tests for external integrations
- **Presentation Layer**: Component and hook tests

## 🚀 Deployment

### Vercel

### Netlify

## 🔗 Resources

- [Clean Architecture by Robert Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev/)

---

Built with ❤️ using Clean Architecture principles
