import { clientEnv, serverEnv } from "@/config/env";

export default function Home() {
  return (
    <main>
      <ul>
        <li>{clientEnv.NEXT_PUBLIC_API_BASE_URL}</li>
        <li>{clientEnv.NEXT_PUBLIC_APP_ENV}</li>
        <li>{serverEnv.DATABASE_URL}</li>
        <li>{serverEnv.INTERNAL_AUTH_SECRET}</li>
      </ul>
    </main>
  );
}
