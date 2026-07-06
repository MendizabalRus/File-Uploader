const { prisma } = require("../lib/prisma.js")

async function main() {
    const deleted = await prisma.user.deleteMany({});
    console.log(`Deleted ${deleted.count} users`)
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });