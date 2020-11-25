# ORMS comparison

## Type orm

### Features

  - Run in node, browser, cordova, phonegap, ionic, react native, nativescript, expo, electron
  - Support Typescript and Javascript
  - Good integration with nestjs (Nest provide a wrapper, and validation use class validator)
  - Supports MySQL / MariaDB / Postgres / CockroachDB / SQLite / Microsoft SQL Server / Oracle / SAP Hana / sql.js
  - Supports MongoDB NoSQL database (experimental)
  - Supports Datamapper and active record patterns
  - Supports transactions
  - Supports migrations
  - SQL schema is generated from models definition
  
### Code example

#### DataMapper

Model: 
``` 
import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

}
```

Logic: 
``` 
const repository = connection.getRepository(User);

const user = new User();
user.firstName = "Timber";
user.lastName = "Saw";
user.age = 25;
await repository.save(user);

const allUsers = await repository.find();
const firstUser = await repository.findOne(1); // find by id
const timber = await repository.findOne({ firstName: "Timber", lastName: "Saw" });

await repository.remove(timber);
```
#### Active records

Model: 
``` 
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

}
```

Logic: 
``` 
const user = new User();
user.firstName = "Timber";
user.lastName = "Saw";
user.age = 25;
await user.save();

const allUsers = await User.find();
const firstUser = await User.findOne(1);
const timber = await User.findOne({ firstName: "Timber", lastName: "Saw" });

await timber.remove();
```

##  Prisma orm

### Features

  - Supports MySQL, PostgresSQL, SQLite
  - Supports Typescript and Javascript
  - Sql schema and models are generated from a Prisma schema file
  - Supports migration (experimental)

### Prisma workflow
The typical workflow when using SQL migrations and introspection looks as follows:
  - Manually adjust your database schema using SQL
  - (Re-)introspect your database
  - Optionally (re-)configure your Prisma Client API (learn more)
  - (Re-)generate Prisma Client
  - Use Prisma Client in your application code to access your database

### Code example

Schema: 
```
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
generator client {
  provider = "prisma-client-js"
}
model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String?
  published Boolean @default(false)
  author    User?   @relation(fields:  [authorId], references: [id])
  authorId  Int?
}
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}
```

Create: 
```
const user = await prisma.user.create({
  data: {
    name: "Alice",
    email: "alice@prisma.io",
    posts: {
      create: { title: "Join us for Prisma Day 2020" },
    },
  },
})
```

Update: 
```
const post = await prisma.post.update({
  where: { id: 42 },
  data: { published: true },
})
```
