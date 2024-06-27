"use server"

import { redirect } from "next/navigation"

/** 指定されたパスにredirect関数で遷移します。server component内で使うようにしてください。 */
export async function goToPage(path: string) {
  redirect(path);
}
