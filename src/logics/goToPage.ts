"use server"

import { redirect } from "next/navigation"

export async function goToPage(path: string) {
  redirect(path);
}
