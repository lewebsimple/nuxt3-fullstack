import { defineHandle } from "h3";
import { setAuthState } from "~/utils/jwt";

export default defineHandle((_req, res) => {
  return setAuthState(null, res);
});
