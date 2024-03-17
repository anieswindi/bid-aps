import prisma from "../../../lib/prisma";

// DELETE /api/post/:id
export default async function handler(req, res) {
  let collectionId = req.query.id;
  if (req.method === "DELETE") {
    const del = await prisma.collection.delete({
      where: { id: collectionId },
    });

    res.json(del);
  } else if (req.method === "PUT") {
    const put = await prisma.collection.update({
      where: { id: collectionId },
      data: { ...req.body },
    });

    res.status(200).json(put);
  } else {
    const detail = await prisma.collection.findUnique({
      where: {
        id: collectionId,
      },
    });
    res.status(200).json(detail);
  }
}
