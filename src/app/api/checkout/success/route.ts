import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request, response: Response) {
  const { sessionId } = await request.json();
  console.log(sessionId)
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    console.log(session.metadata?.bookId);
    console.log(session.client_reference_id!);

    const existingPurchase = await prisma.purchase.findFirst({
      where: {
        userId: session.client_reference_id!,
        bookId: session.metadata?.bookId!
      },
    });

      //既に購入履歴が存在する場合には新たに作成しない。
    if (!existingPurchase){
      const purchese = await prisma.purchase.create({
        data: {
          userId: session.client_reference_id!,
          bookId: session.metadata?.bookId!,
        },
      });

      return NextResponse.json({ purchese });
    } else {
      return NextResponse.json({ message: "既に購入済みです。"})
    }
  } catch (err: any) {
    return NextResponse.json({ message: err.message});
  }
}