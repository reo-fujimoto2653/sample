import { PrismaClient } from "@prisma/client";
import { accessSync } from "fs";

const prisma = new PrismaClient();

export type InquiryInput = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export async function createInquiry(params: InquiryInput) {
  return await prisma.inquiry.create({ data: params });
}

export async function fetchInquiry() {
  return await prisma.inquiry.findMany();
}
