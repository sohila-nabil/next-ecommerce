import dbConnection from "@/config/dbConnection";
import { inngest } from "@/config/inngest";
import User from "../models/userModel";

export const createUser = inngest.createFunction(
  {
    id: "user/create",
  },
  { event: "user.created" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const user = {
      _id:id,
      name: `${first_name} ${last_name}`,
      email: email_addresses[0].email_address,
      imageUrl: image_url,
    };
    await dbConnection();
    await User.create(user);
  }
);

export const updateUser = inngest.createFunction(
  {
    id: "user/update",
  },
  { event: "user.updated" },
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
    await User.findByIdAndUpdate(id, user, {
      new: true,
      runValidators: true,
    });
  }
);

export const deleteUser = inngest.createFunction(
  {
    id: "user/delete",
  },
  { event: "user.deleted" },
  async ({ event }) => {
    const { id } = event.data;
    await dbConnection();
    await User.findByIdAndDelete(id);
  }
);


// vo