import React from "react";
import { Avatar } from "@mui/material";
type Props = {
  name: string;
  image?: string | null;
  size?: number;
};

const stringAvatar = (str: string) => {
  if (!str) return "";

  if (str.length < 2) return str[1];
  const [first, second] = str.split(" ");

  return first ?? "" + second ?? "";
};

function UserAvatar({ name, image, size }: Props) {
  return image ? (
    <Avatar
      alt={name}
      src={image}
      sx={{ borderRadius: "8px", width: size, height: size }}
    />
  ) : (
    <Avatar sx={{ borderRadius: "8px", width: size, height: size }}>
      {stringAvatar(name)}
    </Avatar>
  );
}

export default UserAvatar;
