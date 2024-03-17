import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const result = await prisma.collection.create({
    data: {
      ...req.body,
    },
  });

  res.json(result);
}
