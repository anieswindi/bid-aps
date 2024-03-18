import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  let bidId = req.query.bidId;
  let collectionId = req.query.collectionId;
  let status = req.query.status;

  if (status == "reject") {
    const detail = await prisma.bid.update({
      where: {
        id: bidId,
        collection_id: collectionId,
      },
      data: { status: status },
    });

    res.status(200).json(detail);
  } else {
    await prisma.bid.update({
      where: {
        id: bidId,
        collection_id: collectionId,
      },
      data: { status: status },
    });

    const resp = await prisma.collection.update({
      where: {
        id: collectionId,
      },
      data: {
        bids: {
          updateMany: {
            where: {
              id: {
                not: bidId,
              },
            },
            data: {
              status: "reject",
            },
          },
        },
      },
    });

    res.status(200).json(resp);
  }
}
