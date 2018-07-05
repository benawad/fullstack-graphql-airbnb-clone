import { validUserSchema } from "@abb/common";

import { ResolverMap } from "../../../types/graphql-utils";
import { User } from "../../../entity/User";
import { formatYupError } from "../../../utils/formatYupError";
import { duplicateEmail } from "./errorMessages";
import { createConfirmEmailLink } from "./createConfirmEmailLink";
import { sendEmail } from "../../../utils/sendEmail";

export const resolvers: ResolverMap = {
  Mutation: {
    register: async (
      _,
      args: GQL.IRegisterOnMutationArguments,
      { redis, url }
    ) => {
      try {
        await validUserSchema.validate(args, { abortEarly: false });
      } catch (err) {
        return formatYupError(err);
      }

      const { email, password } = args;

      const userAlreadyExists = await User.findOne({
        where: { email },
        select: ["id"]
      });

      if (userAlreadyExists) {
        return [
          {
            path: "email",
            message: duplicateEmail
          }
        ];
      }

      const user = User.create({
        email,
        password
      });

      await user.save();

      if (process.env.NODE_ENV !== "test") {
        await sendEmail(
          email,
          await createConfirmEmailLink(url, user.id, redis)
        );
      }

      return null;
    }
  }
};
