import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type NewsPost = {
  id: string;
  title: string;
  title_ur: string | null;
  title_ar: string | null;
  body: string;
  body_ur: string | null;
  body_ar: string | null;
  category: string;
  image_url: string | null;
  author: string;
  is_published: boolean;
  featured: boolean;
  tags: string[];
  views: number;
  created_at: string;
  updated_at: string;
};

export type Subscriber = {
  id: string;
  email: string;
  name: string | null;
  lang: string;
  status: string;
  subscribed_at: string;
};

export type PageAnalytic = {
  id: string;
  page: string;
  visited_at: string;
  lang: string;
  referrer: string | null;
};
