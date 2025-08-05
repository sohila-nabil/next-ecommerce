import dbConnection from "@/config/dbConnection";
import { inngest } from "@/config/inngest";
import User from "../models/userModel";

export const createUser = inngest.createFunction(
  {
    id: "user/create",
  },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const user = {
      _id: id,
      name: `${first_name} ${last_name}`,
      email: email_addresses[0].email_address,
      imageUrl: image_url,
    };
    await dbConnection();
    const newUser = await User.create(user);
    return newUser;
  }
);

export const updateUser = inngest.createFunction(
  {
    id: "user/update",
  },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const user = {
      _id: id,
      name: `${first_name} ${last_name}`,
      email: email_addresses[0].email_address,
      imageUrl: image_url,
    };
    await dbConnection();
    const updatedUser = await User.findByIdAndUpdate(id, user, {
      new: true,
      runValidators: true,
    });
    return updatedUser;
  }
);

export const deleteUser = inngest.createFunction(
  {
    id: "user/delete",
  },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;
    await dbConnection();
    const deletedUser = await User.findByIdAndDelete(id);
    return deletedUser;
  }
);

// vote for the user
