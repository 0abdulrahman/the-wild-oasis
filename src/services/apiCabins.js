import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
}

export async function createUpdateCabin(newCabin, id) {
  const imageName = `${Math.random()}-${newCabin?.image?.name}`.replaceAll("/", "");
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");

  if (id) {
    query = query
      .update({ ...newCabin, image: newCabin.image?.startsWith?.(supabaseUrl) ? newCabin?.image : imagePath })
      .eq("id", id);
  } else {
    query = query.insert([
      { ...newCabin, image: newCabin.image?.startsWith?.(supabaseUrl) ? newCabin?.image : imagePath },
    ]);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    if (id) throw new Error("Cabin could not be updated");
    else throw new Error("Cabin could not be created");
  }

  if (newCabin.image?.startsWith?.(supabaseUrl)) return data;
  const { error: uploadError } = await supabase.storage.from("cabin-images").upload(imageName, newCabin?.image);
  if (uploadError) {
    await supabase.from("cabins").delete().eq("id", newCabin.id);
    console.error(uploadError);
    throw new Error("Cabin image could not be uploaded and the cabin was not created");
  } else {
    // Handle success
  }
}
