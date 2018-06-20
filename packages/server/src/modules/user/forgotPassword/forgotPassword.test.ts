import { Connection } from "typeorm";
import * as Redis from "ioredis";
import * as faker from "faker";
import { passwordNotLongEnough } from "@abb/common";

import { User } from "../../../entity/User";
import { TestClient } from "../../../utils/TestClient";
import { createForgotPasswordLink } from "../../../utils/createForgotPasswordLink";
import { forgotPasswordLockAccount } from "../../../utils/forgotPasswordLockAccount";
import { expiredKeyError } from "./errorMessages";
import { forgotPasswordLockedError } from "../login/errorMessages";
import { createTestConn } from "../../../testUtils/createTestConn";

let conn: Connection;
export const redis = new Redis();
faker.seed(Date.now() + 0);
const email = faker.internet.email();
const password = faker.internet.password();
const newPassword = faker.internet.password();

let userId: string;
beforeAll(async () => {
  conn = await createTestConn();
  const user = await User.create({
    email,
    password,
    confirmed: true
  }).save();
  userId = user.id;
});

afterAll(async () => {
  conn.close();
});

describe("forgot password", () => {
  test("make sure it works", async () => {
    const client = new TestClient(process.env.TEST_HOST as string);

    // lock account
    await forgotPasswordLockAccount(userId, redis);
    const url = await createForgotPasswordLink("", userId, redis);

    const parts = url.split("/");
    const key = parts[parts.length - 1];

    // make sure you can't login to locked account
    expect(await client.login(email, password)).toEqual({
      data: {
        login: [
          {
            path: "email",
            message: forgotPasswordLockedError
          }
        ]
      }
    });

    // try changing to a password that's too short
    expect(await client.forgotPasswordChange("a", key)).toEqual({
      data: {
        forgotPasswordChange: [
          {
            path: "newPassword",
            message: passwordNotLongEnough
          }
        ]
      }
    });

    const response = await client.forgotPasswordChange(newPassword, key);

    expect(response.data).toEqual({
      forgotPasswordChange: null
    });

    // make sure redis key expires after password change
    expect(
      await client.forgotPasswordChange(faker.internet.password(), key)
    ).toEqual({
      data: {
        forgotPasswordChange: [
          {
            path: "key",
            message: expiredKeyError
          }
        ]
      }
    });

    expect(await client.login(email, newPassword)).toEqual({
      data: {
        login: null
      }
    });
  });
});
