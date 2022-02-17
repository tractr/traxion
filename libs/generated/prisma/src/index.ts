import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export async function seed() {
  const db = new PrismaClient();

  const now = new Date(Date.now());

  // Create users
  const user1 = await db.user.create({
    data: {
      name: 'user1',
      email: 'user1@traxion.com',
      createdAt: now,
      password: await bcrypt.hash('password', 10),
      roles: ['user'],
    },
  });
  const user2 = await db.user.create({
    data: {
      name: 'user2',
      email: 'user2@traxion.com',
      createdAt: now,
      password: await bcrypt.hash('password', 10),
      roles: ['user'],
    },
  });
  const admin = await db.user.create({
    data: {
      name: 'admin',
      email: 'admin@traxion.com',
      createdAt: now,
      password: await bcrypt.hash('password', 10),
      roles: ['admin'],
    },
  });

  // Create user profiles
  const user1Profil = await db.profil.create({
    data: {
      createdAt: now,
      address: 'User1 address',
      phone: 'User1 phone number',
      userId: user1.id,
    },
  });
  const user2Profil = await db.profil.create({
    data: {
      createdAt: now,
      address: 'User2 address',
      phone: 'User2 phone number',
      userId: user2.id,
    },
  });
  const adminProfil = await db.profil.create({
    data: {
      createdAt: now,
      address: 'Admin address',
      phone: 'Admin phone number',
      userId: admin.id,
    },
  });

  // Create tags
  const tag1 = await db.tag.create({
    data: {
      createdAt: now,
      label: 'tag 1',
    },
  });
  const tag2 = await db.tag.create({
    data: {
      createdAt: now,
      label: 'tag 2',
    },
  });
  const tag3 = await db.tag.create({
    data: {
      createdAt: now,
      label: 'tag 3',
    },
  });

  // Create blog posts
  const blogPost1 = await db.blogPost.create({
    data: {
      title: 'Blog post 1 owned by user1 and draft',
      content: 'content...',
      createdAt: now,
      status: 'draft',
      author: { connect: { id: user1.id } },
      tags: { connect: [{ id: tag1.id }] },
    },
  });
  const blogPost2 = await db.blogPost.create({
    data: {
      title: 'Blog post 2 owned by user2 and draft',
      content: 'content...',
      createdAt: now,
      status: 'draft',
      author: { connect: { id: user2.id } },
      tags: { connect: [{ id: tag1.id }] },
    },
  });
  const blogPost3 = await db.blogPost.create({
    data: {
      title: 'Blog post 3 owned by user2 and published',
      content: 'content...',
      createdAt: now,
      status: 'published',
      author: { connect: { id: user2.id } },
      tags: { connect: [{ id: tag1.id }] },
    },
  });
  const blogPost4 = await db.blogPost.create({
    data: {
      title: 'Blog post 4 owned by admin and draft',
      content: 'content...',
      createdAt: now,
      status: 'draft',
      author: { connect: { id: admin.id } },
      tags: { connect: [{ id: tag3.id }] },
    },
  });
  const blogPost5 = await db.blogPost.create({
    data: {
      title: 'Blog post 5 owned by admin and published',
      content: 'content...',
      createdAt: now,
      status: 'published',
      author: { connect: { id: admin.id } },
      tags: { connect: [{ id: tag2.id }, { id: tag3.id }] },
    },
  });

  console.info(`Database as been seeded`);
}
