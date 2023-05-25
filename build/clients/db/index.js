"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaClient = void 0;
const { PrismaClient } = require("@prisma/client");
exports.prismaClient = new PrismaClient({ log: ["query"] });
