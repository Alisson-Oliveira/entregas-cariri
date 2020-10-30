import User from "../models/User";

export default {
  render(user: User) {
    return {
      id: user.id,
      name: user.name,
      address: user.address,
      email: user.email,
    };
  },
}