import { log } from "./utils/utils";

export const dva = {
  config: {
    onError(err) {
      err.preventDefault();
      log('error', err.message);
    },
  },
};
