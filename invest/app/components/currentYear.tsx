import { connection } from "next/server";

export default async function CurrentYear() {
  await connection();

  return <>{new Date().getFullYear()}</>;
}