---
id: presentation
title: Presentation
sidebar_label: Presentation
---

# Generate a GraphQL API from your prisma schema

Traxion offers a suite of prisma generators for creating a GraphQL API that utilizes a stack of technologies including Prisma, NestJS, Apollo Server, and CASL. This comprehensive combination of technologies enables the development of a robust and efficient GraphQL API with clearly defined responsibilities across different layers.

- **Prisma:** As the underlying data layer technology, Prisma provides a seamless database interface and data modeling capabilities. It handles tasks such as database schema generation, query building, and database migrations, ensuring efficient and reliable data management.

- **NestJS:** NestJS serves as the framework for building the GraphQL API, providing a solid foundation for structuring the codebase and managing the application's business logic. It follows a modular and scalable architectural pattern, incorporating dependency injection, decorators, and middleware for creating efficient and maintainable code.

- **Apollo Server:** Apollo Server acts as the GraphQL server implementation, seamlessly integrating with NestJS. It handles request parsing, validation, and execution, allowing efficient communication between clients and the GraphQL API. Apollo Server also provides powerful tools for error handling, data caching, and performance optimization.

- **CASL:** CASL, a flexible authorization library, helps enforce fine-grained access control in the GraphQL API. It enables developers to define authorization rules based on user roles, permissions, and resource ownership. CASL integrates seamlessly with NestJS and Apollo Server, ensuring that access to specific data and operations is restricted based on the defined authorization policies.

By combining the capabilities of Prisma, NestJS, Apollo Server, and CASL, Traxion's generated GraphQL API delivers a robust network layer, a modular and scalable business layer, a well-structured data layer, and a fine-grained authorization layer. This technology stack empowers developers to build efficient and secure GraphQL APIs that meet the needs of modern web applications.
