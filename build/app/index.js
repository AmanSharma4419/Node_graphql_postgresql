"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initServer = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const user_1 = require("./user");
const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
function initServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = express();
        app.use(body_parser_1.default.json());
        const graphqlServer = new ApolloServer({
            typeDefs: `
    ${user_1.User.types}
    type Query {
      ${user_1.User.queries}
    }
    `,
            resolvers: {
                Query: Object.assign({}, user_1.User.resolvers.queries),
            },
        });
        yield graphqlServer.start();
        app.use("/graphql", expressMiddleware(graphqlServer));
        return app;
    });
}
exports.initServer = initServer;
