import { BookType } from "@/app/types/types";
import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: process.env.NEXT_PUBLIC_SERVICE_DOMAIN!,
  apiKey: process.env.NEXT_PUBLIC_API_KEY!,
});

export const getAllBooks = async () => {
  const getAllBooks = await client.getList<BookType>({
    endpoint: "eshop",
      customRequestInit: {
        // cache: "no-store",
        next: {
          revalidate: 3600 //ISR
        }
      }
  });
  return getAllBooks;
}

export const getDetailBook = async (contentId: string) => {
  const detailBook = await client.getListDetail<BookType>({
    endpoint: "eshop",
    contentId,
    customRequestInit: {
      cache: "no-store", //SSR
    }
  });
  return detailBook;
}