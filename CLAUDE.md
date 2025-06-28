# Expense Tracker Web Application

## Tech Stack
- Next.js  (App Router) + TypeScript
- Tailwind CSS
- tRPC for API
- PostgreSQL + Prisma ORM
- Jest + Testing Library, Vitest + tRPC Testing
- Vercel deployment

## Project Purpose
Financial expense tracking app: upload credit card statements → AI categorization → interactive charts/dashboards

## Coding Standards
- Use kebab-case for files: `expense-chart.tsx`
- Use PascalCase for components: `ExpenseChart`
- Always use explicit TypeScript types
- Import external libraries first, then internal with `@/` alias

## tRPC Conventions
- Group procedures by feature: `expensesRouter`, `uploadsRouter`
- Use Zod schemas for input validation
- Implement proper error handling

## File Processing
- Support CSV, PDF, Excel formats
- Validate files before processing
- Provide clear error feedback
- Log parsing errors for debugging

## Testing Strategy
- Unit tests: parsers, AI logic, utilities (Jest)
- Integration tests: tRPC procedures, database ops (Vitest)
- Component tests: critical UI interactions

## Notes for Claude
- Run TypeScript compiler after code changes
- Use tRPC testing utilities for API testing
- Prioritize type safety over speed
- Follow established file structure
- Test file parsing with edge cases
- Use Recharts for charts with proper TypeScript
- Validate inputs with Zod schemas
- Use Prisma generated types