import { createInquiry, fetchInquiry } from "@/libs/database";
import { NextApiRequest, NextApiResponse } from "next";

const postInquiry = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body;

  const inquiry = await createInquiry({
    name: body.name,
    email: body.email,
    subject: body.subject,
    message: body.message,
  });

  return res.status(200).json(inquiry);
};

const getInquiries = async (req: NextApiRequest, res: NextApiResponse) => {
  const inquiry = await fetchInquiry();
  return res.status(200).json(inquiry);
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      return await postInquiry(req, res);
    case "GET":
      return await getInquiries(req, res);
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
};
