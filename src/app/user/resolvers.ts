import axios from "axios";
import { prismaClient } from "../../clients/db/index";
import JWTService from "../../services/jwt";

interface googleTokenResult {
  iss?: string;
  nbf?: string;
  aud?: string;
  sub?: string;
  email?: string;
  email_verified?: string;
  azp?: string;
  name?: string;
  picture?: string;
  given_name?: string;
  family_name?: string;
  iat?: string;
  exp?: string;
  jti?: string;
  alg?: string;
  kid?: string;
  typ?: string;
}
const queries = {
  verifyGoogleToken: async (parent: any, { token }: { token: string }) => {
    const googleToken = token;
    const googleAuthUrl = new URL("https://oauth2.googleapis.com/tokeninfo");
    googleAuthUrl.searchParams.set("id_token", googleToken);
    const { data } = await axios.get<googleTokenResult>(
      googleAuthUrl.toString(),
      {
        responseType: "json",
      }
    );
    const user = await prismaClient.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      const user = await prismaClient.user.create({
        data: {
          email: data.email,
          firstName: data.given_name,
          lastName: data.family_name,
          profileImage: data.picture,
        },
      });
      const token = await JWTService.generateTokenForUser(user.id);
      return token;
    }
  },
};

export const resolvers = { queries };
