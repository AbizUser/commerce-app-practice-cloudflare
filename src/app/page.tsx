import { getServerSession } from "next-auth";
import Book from "./components/Book";
import { getAllBooks } from "./lib/microcms/client";
import { BookType } from "./types/types";
import { nextAuthOptions } from "./lib/next-auth/options";
// import { User } from "@prisma/client";

//APIを叩く

export default async function Home() {
  const { contents } = await getAllBooks();
  const session = await getServerSession(nextAuthOptions);
  const user: any = session?.user; //値があるのか不明な時に記述
  // const user: User = session?.user as User; //値があるのか不明な時に記述
  
  let purchaseBookIds: string[];

  //購入済みの本を事前に取得
  if( user ){
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/purchases/${user.id}`,
      { cache: "no-store" }//SSR SSGを用いたい場合にはforce-cacheを用いる 
    );
    const purchasesData = await response.json();

    purchaseBookIds = purchasesData.map(
      ( purchaseBook :any ) => purchaseBook.bookId
    );
    // console.log(purchaseBookIds)
  }

  return (
    <>
      <main className="flex flex-wrap justify-center items-center md:mt-32 mt-20">
        <h2 className="text-center w-full font-bold text-3xl mb-2">
          Commerce
        </h2>
        {contents.map((book: BookType) => (
          <Book
            key={book.id}
            book={book}
            isPurchased={purchaseBookIds?.includes(book.id) ?? false}
            //ここで型の定義が異なっている場合にはtype.tsを参照
          />
        ))}
      </main>
    </>
  );
}