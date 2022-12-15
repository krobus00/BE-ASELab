import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.role.createMany({
    data: [
      {
        name: 'Guest',
      },
      {
        name: 'Admin',
      },
      {
        name: 'SuperAdmin',
      },
    ],
  });

  await prisma.division.createMany({
    data: [
      {
        name: 'UI/UX',
        thumbnail_url: 'https://picsum.photos/200/300',
      },
      {
        name: 'Frontend Engineer',
        thumbnail_url: 'https://picsum.photos/200/300',
      },
      {
        name: 'Backend Engineer',
        thumbnail_url: 'https://picsum.photos/200/300',
      },
      {
        name: 'Mobile Engineer',
        thumbnail_url: 'https://picsum.photos/200/300',
      },
      {
        name: 'Game Programmer',
        thumbnail_url: 'https://picsum.photos/200/300',
      },
      {
        name: 'Game Designer',
        thumbnail_url: 'https://picsum.photos/200/300',
      },
      {
        name: 'Audio Composer',
        thumbnail_url: 'https://picsum.photos/200/300',
      },
      {
        name: 'Game Artist',
        thumbnail_url: 'https://picsum.photos/200/300',
      },
      {
        name: 'Intern',
        thumbnail_url: 'https://picsum.photos/200/300',
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
