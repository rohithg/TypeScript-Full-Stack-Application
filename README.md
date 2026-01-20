# TypeScript Full-Stack Application

Modern full-stack TypeScript application with Next.js, tRPC, and advanced type safety.

## Features

- **End-to-End Type Safety**: Types flow from database to frontend
- **tRPC**: Type-safe API without code generation
- **Zod Validation**: Runtime type validation
- **Advanced TypeScript**: Generics, utility types, discriminated unions
- **Modern Stack**: Next.js 14, React Server Components
- **Type Inference**: Automatic type inference across the stack

## TypeScript Features Demonstrated

### Advanced Types
- Generics and constraints
- Utility types (Partial, Omit, Pick, etc.)
- Mapped types
- Conditional types
- Template literal types
- Branded types for nominal typing

### Type Safety
- Strict null checks
- Type guards and narrowing
- Discriminated unions
- Never type for exhaustiveness
- Type assertions and predicates

### Modern Patterns
- tRPC for API type safety
- Zod for runtime validation
- Prisma for database types
- React with TypeScript

## Architecture

```
┌──────────────────────────────────┐
│         Frontend (Next.js)        │
│  ┌────────────────────────────┐  │
│  │  Type-safe tRPC Client     │  │
│  └────────────────────────────┘  │
└──────────────┬───────────────────┘
               │ (Types inferred)
               ▼
┌──────────────────────────────────┐
│      Backend (tRPC Router)        │
│  ┌────────────────────────────┐  │
│  │  Zod Schema Validation     │  │
│  │  Business Logic            │  │
│  └────────────────────────────┘  │
└──────────────┬───────────────────┘
               │
               ▼
┌──────────────────────────────────┐
│        Database (Prisma)          │
└──────────────────────────────────┘
```

## Type Safety Benefits

1. **Compile-Time Errors**: Catch bugs before runtime
2. **IntelliSense**: Better IDE support and autocomplete
3. **Refactoring**: Safe code changes across the codebase
4. **Documentation**: Types serve as inline documentation
5. **API Contracts**: Enforced contracts between frontend and backend

## Running

```bash
npm install
npm run dev
```

## Real-World Applications

- SaaS platforms
- Content management systems
- E-commerce applications
- Admin dashboards
- Social networks

## Interview Topics

- TypeScript type system
- Generic programming
- API design patterns
- Type inference
- Runtime vs compile-time types
- Performance with TypeScript
