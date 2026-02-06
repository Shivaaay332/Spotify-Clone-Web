"use client";

import uniqid from "uniqid";
import { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import useUploadModal from "@/hooks/useUploadModal";
import Modal from "./Modal";
import { supabase } from "@/libs/supabaseClient";

// Server Action se data save karne ke liye (hum direct API call karenge yahan easy hone ke liye)
import { useRouter as useNavigation } from "next/navigation";

const UploadModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const uploadModal = useUploadModal();
  const router = useRouter();

  // Form setup
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: '',
      title: '',
      song: null,
      image: null,
    }
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      uploadModal.onClose();
    }
  }

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      if (!imageFile || !songFile || !values.title || !values.author) {
        toast.error("Missing fields");
        return;
      }

      // 1. Unique ID banana taaki naam same na ho
      const uniqueID = uniqid();

      // 2. Song Upload karna
      const { data: songData, error: songError } = await supabase
        .storage
        .from('songs')
        .upload(`song-${values.title}-${uniqueID}`, songFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (songError) {
        setIsLoading(false);
        return toast.error("Failed song upload");
      }

      // 3. Image Upload karna
      const { data: imageData, error: imageError } = await supabase
        .storage
        .from('images')
        .upload(`image-${values.title}-${uniqueID}`, imageFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (imageError) {
        setIsLoading(false);
        return toast.error("Failed image upload");
      }

      // 4. URL nikalna
      const songUrl = supabase.storage.from('songs').getPublicUrl(songData.path).data.publicUrl;
      const imageUrl = supabase.storage.from('images').getPublicUrl(imageData.path).data.publicUrl;

      // 5. Database me Entry karna (Direct Supabase se insert - Prisma ki jagah taaki jaldi ho)
      const { error: supabaseError } = await supabase
        .from('Song') // Dhyan rahe: Prisma 'Song' table banata hai (Case Sensitive)
        .insert({
          title: values.title,
          author: values.author,
          image_path: imageUrl,
          song_path: songUrl,
        });

      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }

      router.refresh();
      setIsLoading(false);
      toast.success("Song created!");
      reset();
      uploadModal.onClose();

    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal
      title="Add a song"
      description="Upload an mp3 file"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        
        {/* Title Input */}
        <input 
          id="title"
          disabled={isLoading}
          {...register('title', { required: true })}
          placeholder="Song title"
          className="bg-neutral-700 border border-transparent p-3 rounded-md text-sm text-white focus:outline-none focus:border-neutral-500 w-full"
        />

        {/* Author Input */}
        <input 
          id="author"
          disabled={isLoading}
          {...register('author', { required: true })}
          placeholder="Song author"
          className="bg-neutral-700 border border-transparent p-3 rounded-md text-sm text-white focus:outline-none focus:border-neutral-500 w-full"
        />

        {/* Song File Input */}
        <div className="text-white text-sm pb-1">Select Song File (mp3)</div>
        <input 
          id="song"
          type="file"
          disabled={isLoading}
          accept=".mp3"
          {...register('song', { required: true })}
          className="bg-neutral-700 w-full p-2 rounded-md text-white cursor-pointer"
        />

        {/* Image File Input */}
        <div className="text-white text-sm pb-1">Select Cover Image</div>
        <input 
          id="image"
          type="file"
          disabled={isLoading}
          accept="image/*"
          {...register('image', { required: true })}
          className="bg-neutral-700 w-full p-2 rounded-md text-white cursor-pointer"
        />

        {/* Submit Button */}
        <button 
          disabled={isLoading}
          type="submit"
          className="w-full rounded-full bg-green-500 border border-transparent px-3 py-3 disabled:cursor-not-allowed disabled:opacity-50 text-black font-bold hover:opacity-75 transition mt-4"
        >
          Create
        </button>
      </form>
    </Modal>
  );
}

export default UploadModal;