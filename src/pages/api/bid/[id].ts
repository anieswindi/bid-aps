import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  let bidId = req.query.id;
  if (req.method === "DELETE") {
    const del = await prisma.bid.delete({
      where: { id: bidId },
    });

    res.json(del);
  } else if (req.method === "PUT") {
    const put = await prisma.bid.update({
      where: { id: bidId },
      data: { ...req.body },
    });

    res.status(200).json(put);
  } else {
    const detail = await prisma.bid.findUnique({
      where: {
        id: bidId,
      },
    });

    res.status(200).json(detail);
  }
}
