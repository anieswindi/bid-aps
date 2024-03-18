import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  let collectionId = req.query.collectionId;

  if (req.method === "POST") {
    const result = await prisma.bid.create({
      data: {
        ...req.body,
        collection: {
          connect: {
            id: collectionId,
          },
        },
      },
    });

    res.json(result);
  } else {
    const bid = await prisma.bid.findMany({});
    res.json(bid);
  }
}
