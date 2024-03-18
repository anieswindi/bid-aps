const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");
const prisma = new PrismaClient();

// post dummy user where bids => 10 data
// const dataUser = Array.from({ length: 10 }).map(() => ({
//   id: faker.string.uuid(),
//   name: faker.person.firstName(),
//   email: faker.internet.email(),
// }));

async function main() {
  console.log("🚀 seeding...");

  // for (let i = 0; i <= 100; i++) {
  //   await prisma.collection.create({
  //     data: {
  //       id: faker.string.uuid(),
  //       name: "Collection " + faker.commerce.productName(),
  //       description: faker.commerce.productDescription(),
  //       stocks: faker.number.int({ max: 50 }),
  //       price: faker.number.int({ min: 10, max: 100 }),
  //       bids: {
  //         create: Array.from({ length: 10 }).map(() => ({
  //           id: faker.string.uuid(),
  //           name: "Bid " + faker.commerce.productAdjective(),
  //           stocks: faker.number.int({ max: 30 }),
  //           price: faker.number.int({ min: 1, max: 50 }),
  //           status: "pending",
  //         })),
  //       },
  //     },
  //   });
  // }

  // delete collection where bids === 0
  // await prisma.bid.deleteMany({
  //   where: {
  //     NOT: {
  //       name: {
  //         contains: "Bid",
  //       },
  //     },
  //   },
  // });

  // post dummy user where bids => 10 data
  // await prisma.user.createMany({ dataUser });

  // delete all user
  // await prisma.user.deleteMany();

  // delete collection where bids === 0
  // await prisma.collection.deleteMany({
  //   where: {
  //     bids: {
  //       none: {}
  //     }
  //   },
  // });
}

main()
  .catch((e) => {
    console.log("🚀 err :", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
