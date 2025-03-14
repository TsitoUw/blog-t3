import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();
async function main() {
  const arr = Array.from({ length: 50 }).map((_, i) => i);
  console.log("⚒️ Seeding the db");

  for (const _ of arr) {
    const user = await prisma.user.create({
      data: {
        id: faker.string.uuid(),
        name: faker.name.fullName(),
        email: faker.internet.email(),
        emailVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        image: faker.image.avatar(),
      },
    });

    const articleArr = Array.from({
      length: faker.number.int({ min: 5, max: 20 }),
    });

    for (const _ of articleArr) {
      await prisma.article.create({
        data: {
          title: faker.word.words(10),
          description: faker.lorem.lines(4),
          text: faker.lorem.paragraphs(5),
          html: faker.lorem.paragraphs(5),
          slug: faker.lorem.slug(),
          author: {
            connect: {
              id: user.id,
            },
          },
          featuredImage: faker.image.urlPicsumPhotos(),
        },
      });
    }
  }

  console.log("✅ Seed completed!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
