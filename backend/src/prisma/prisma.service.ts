import "dotenv/config";

import {
  Injectable,
  OnModuleInit,
} from "@nestjs/common";

import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client";

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit
{
  constructor() {
    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
      throw new Error("DATABASE_URL is not defined");
    }

    const url = new URL(databaseUrl);

    const adapter = new PrismaMariaDb({
      host: url.hostname,
      port: Number(url.port),
      user: decodeURIComponent(url.username),
      password: decodeURIComponent(url.password),
      database: url.pathname.replace("/", ""),
      connectionLimit: 5,
      connectTimeout: 10000,
      acquireTimeout: 10000,
      idleTimeout: 300000,
      ssl: true,
    });

    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
    console.log("✅ Database connected successfully");
  }
}