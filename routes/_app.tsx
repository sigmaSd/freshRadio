import { Head, Partial } from "$fresh/runtime.ts";
import { AppProps } from "$fresh/server.ts";
import NavigationBar from "@/components/NavigationBar.tsx";
import AudioPlay from "@/components/AudioPlay.tsx";

export default function App({ Component }: AppProps) {
  return (
    <>
      <Head>
        <title>Rodio</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <NavigationBar />
      <body f-client-nav>
        <div class="text-center p-4 mx-auto">
          <AudioPlay />
          <Partial name="body">
            <Component />
          </Partial>
        </div>
      </body>
    </>
  );
}
