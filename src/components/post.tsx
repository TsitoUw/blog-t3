// "use client";

// import { useState } from "react";

// import { api } from "@/trpc/react";

// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";

// export function LatestPost() {
//   const [latestPost] = api.post.getLatest.useSuspenseQuery();

//   const utils = api.useUtils();
//   const [name, setName] = useState("");
//   const createPost = api.post.create.useMutation({
//     onSuccess: async () => {
//       await utils.post.invalidate();
//       setName("");
//     },
//   });

//   return (
//     <div className="w-full max-w-xs">
//       {latestPost ? (
//         <p className="truncate">Your most recent post: {latestPost.name}</p>
//       ) : (
//         <p>You have no posts yet.</p>
//       )}
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           createPost.mutate({ name });
//         }}
//         className="flex flex-col gap-2"
//       >
//         <TextField
//           placeholder="Title"
//           label="Title"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           variant="outlined"
//         />
//         <Button
//           type="submit"
//           variant="contained"
//           disabled={createPost.isPending}
//         >
//           {createPost.isPending ? "Submitting..." : "Submit"}
//         </Button>
//       </form>
//     </div>
//   );
// }

