import { CreatePost } from "../components/CreatePost";

export const CreatePostPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
      <h2 className="text-4xl sm:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
        Create New Post
      </h2>
      <div className="w-full max-w-xl">
        <CreatePost />
      </div>
    </div>
  );
};
