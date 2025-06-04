import { useState, ChangeEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "../supabase-client";

interface PostInput {
    title: string;
    content: string;
}

const createPost = async(post: PostInput, imageFile: File)=>{
    
    const filePath = `${post.title}-${Date.now()}-${imageFile.name}`;
    
    const {error: uploadError} = await supabase.storage.from("post-images").upload(filePath, imageFile)
    if(uploadError){
        throw new Error(uploadError.message);
    }
    
    const{data: publicUrlData}=supabase.storage.from("post-images").getPublicUrl(filePath);

    const {data, error}=await supabase.from("posts").insert({...post, image_url: publicUrlData.publicUrl});
    if(error){
        throw new Error(error.message);
    }
    return data;
}

export const CreatePost = () => {
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    
    const {mutate, isPending, isError}= useMutation({mutationFn: (data: {post: PostInput; imageFile: File}) => {
        return createPost(data.post, data.imageFile);
        }
    });


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!selectedFile) return;
        mutate({post: {title,content}, imageFile: selectedFile});
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>)=>{
        if(e.target.files && e.target.files[0]){
            setSelectedFile(e.target.files[0]);
        }
        
    }
    return (
        <form onSubmit={handleSubmit} className="space-y-6 p-6 rounded-xl shadow-lg backdrop-blur-md">
          <div>
            <label htmlFor="title" className="block mb-2 font-medium text-white">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-white/12 bg-transparent p-2 rounded text-white placeholder:text-white/50"
              required
              placeholder="Enter post title"
            />
          </div>
    
          <div>
            <label htmlFor="content" className="block mb-2 font-medium text-white">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border border-white/12 bg-transparent p-2 rounded text-white placeholder:text-white/50"
              rows={5}
              required
              placeholder="Write something..."
            />
          </div>
    
          <div>
            <label htmlFor="image" className="block mb-2 font-medium text-white">
              Upload Image
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-purple-600 file:text-white hover:file:bg-purple-700"
            />
          </div>
    
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded transition"
          >
            {isPending? "Creating Post..." : "Create Post"}
          </button>
          {isError && <p className="text-red-500">Error creating post. Please try again.</p>}
        </form>
      );
} 