import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

// Initialize the Sanity client
export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || "",
  dataset: process.env.SANITY_DATASET || "production",
  apiVersion: "2023-06-19", // Use the current date in YYYY-MM-DD format
  useCdn: false, // Set to false to ensure fresh data
});

// Initialize the image URL builder
const builder = imageUrlBuilder(client);

// Helper function to generate image URLs
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Helper function to fetch site settings
export async function getSiteSettings() {
  return client.fetch(`*[_type == "siteSettings"][0]{
    ...,
    heroVideo{
      asset->{
        url
      }
    },
    aboutImage{
      asset->{
        url
      }
    }
  }`);
}

// Helper function to fetch all showreel videos
export async function getAllShowreelVideos() {
  return client.fetch(`*[_type == "showreel"] | order(order asc)`);
}

// Helper function to fetch showreel videos by tag
export async function getShowreelVideosByTag(tag: string) {
  return client.fetch(`*[_type == "showreel" && tag == $tag] | order(order asc)`, { tag });
}

// Helper function to fetch all classes
export async function getAllClasses() {
  return client.fetch(`*[_type == "class" && active == true] | order(_createdAt desc)`);
}

// Helper function to fetch a class by slug
export async function getClassBySlug(slug: string) {
  return client.fetch(
    `*[_type == "class" && slug.current == $slug][0]`,
    { slug }
  );
}
