import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const result = await prisma.collection.create({
      data: {
        ...req.body,
      },
    });

    res.json(result);
  } else {
    const collection = await prisma.collection.findMany({
      where: {
        NOT: {
          bids: {
            none: {},
          },
        },
      },
      include: {
        bids: true,
      },
    });

    res.json(collection);
  }
}
