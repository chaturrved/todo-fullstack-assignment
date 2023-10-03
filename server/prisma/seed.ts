import { PrismaClient } from "@prisma/client";
import * as bcrypt from 'bcrypt';

//initialize the PrismaClient
const prisma = new PrismaClient();
const roundsOfHashing = 10;


//main function to seed the database
async function main() {


    const passAkash = await bcrypt.hash('pass-akash', roundsOfHashing);
    const passShubham = await bcrypt.hash('pass-shubham', roundsOfHashing);
    const passChatur = await bcrypt.hash('pass-chatur', roundsOfHashing);

    //seeding dummy users
    const user1 = await prisma.user.upsert({
        where: { email: 'akash@todo.com' },
        update: {
          role: 'USER'
        },
        create: {
            email: 'akash@todo.com',
            name: 'Akash',
            password: passAkash,
        },
    });

    const user2 = await prisma.user.upsert({
        where: { email: 'shubham@todo.com' },
        update: {
          role: 'USER'
        },
        create: {
            email: 'shubham@todo.com',
            name: 'Shubham',
            password: passShubham,
        },
    });

    const user3 = await prisma.user.upsert({
        where: { email: 'chatur@todo.com' },
        update: {
          role: 'ADMIN'
        },
        create: {
            email: 'chatur@todo.com',
            name: 'Chaturved',
            password: passChatur,
        },
    });

    // create three dummy tasks
    const task1 = await prisma.task.upsert({
      where: { id: 1 },
      update: {},
      create: {
        title: 'learn prisma',
        content: 'Prisma is a next-generation ORM...',
        completed: false,
        authorId: user1.id,
      },
    });

    const task2 = await prisma.task.upsert({
      where: { id: 2 },
      update: {},
      create: {
        title: "Look at what's new in Prisma2!",
        content: 'Prisma is a next-generation ORM...',
        completed: true,
        authorId: user2.id,
      },
    });

    const task3 = await prisma.task.upsert({
      where: { id: 3 },
      update: {},
      create: {
        title: 'System Design',
        content: 'Learn how to design large scale systems...',
        completed: false,
        authorId: user2.id,
      },
    });

    console.log({ user1, user2, task1, task2, task3 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close the Prisma Client at the end
    await prisma.$disconnect();
  });