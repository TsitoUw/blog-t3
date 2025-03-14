import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function print(...args: any[]) {
  process.stdout.write(`${args.join(" ")} \r`); // \r moves the cursor to the beginning of the line
}

const prisma = new PrismaClient();
async function main() {
  const USER_LENGTH = 50;

  const arr = Array.from({ length: USER_LENGTH }).map((_, i) => i);
  console.log("⚒️ Seeding the db");

  for (const i of arr) {
    print(`${i + 1}/${USER_LENGTH}`);
    const user = await prisma.user.create({
      data: {
        id: faker.string.uuid(),
        name: faker.person.fullName(),
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
    print("\n");
    print(`Creating ${articleArr.length} articles`);
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
