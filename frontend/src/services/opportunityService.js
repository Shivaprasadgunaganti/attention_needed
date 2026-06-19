import { supabase } from "./supabase";

export async function getOpportunities() {
  const { data, error } = await supabase
    .from("opportunities")
    .select("*")
    .eq("status", "NEW")
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}

// import { supabase } from "./supabase";

export async function getAllOpportunities() {
  const { data, error } = await supabase
    .from("opportunities")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}