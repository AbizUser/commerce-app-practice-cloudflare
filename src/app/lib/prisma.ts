import { PrismaClient } from "@prisma/client";

//Singleton
let prisma: PrismaClient;

//globalを付けることで毎回インスタンス化されない
const globalForPrisma = global as unknown as{
  prisma: PrismaClient | undefined;
}

if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = new PrismaClient();
  console.log("プリズマの生成") //GetProviders検証用
}

prisma = globalForPrisma.prisma;

export default prisma;