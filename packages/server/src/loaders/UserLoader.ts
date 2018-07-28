import * as DataLoader from "dataloader";
import { User } from "../entity/User";

type BatchUser = (ids: string[]) => Promise<User[]>;

// [1, 2, ....]
// users = [{id: 2, name: 'bob'}, {id: 1, name: "tom"}]
/*
{
  1: {...},
  2: {...}
}

*/

const batchUsers: BatchUser = async ids => {
  // 1 sql call
  // to get all users
  const users = await User.findByIds(ids);

  const userMap: { [key: string]: User } = {};
  users.forEach(u => {
    userMap[u.id] = u;
  });

  return ids.map(id => userMap[id]);
};

export const userLoader = () => new DataLoader<string, User>(batchUsers);
