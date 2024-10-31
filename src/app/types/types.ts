type BookType = {
  id: string;
  title: string;
  content: string;
  price: number;
  thumbnail: { url: string };
  createdAt: string;
  updatedAt: string; 
};

type Purchase = {
  id: string;
  userId: string;
  bookId: string;
  sessionId: string;
  createAt: User;
};

type User = {
  id: string;
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
};

//prisma.shchemaでの定義をここで型定義している。
// type Purchase = {
//   id: string;
//   name?: string;
//   email?: string;
//   image?: string;
//   user: User;
// }

export type {BookType, User, Purchase };