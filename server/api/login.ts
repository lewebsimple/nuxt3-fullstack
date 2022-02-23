import { defineHandle, useBody } from "h3";
import { prisma } from "~/prisma/client";
import { setAuthState } from "~/utils/jwt";
import { verifyPassword } from "~/utils/password";

export default defineHandle(async (req, res) => {
  try {
    const { email, password } = await useBody(req);
    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) throw new Error("User does not exist.");
    if (!verifyPassword(password, user.password)) throw new Error("Invalid password");
    return setAuthState(user, res);
  } catch (error) {
    res.statusCode = 401;
    res.statusMessage = (error as Error).message;
    return setAuthState(null, res);
  }
});
