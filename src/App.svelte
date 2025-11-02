<script lang="ts">
  import MorseForm from "./lib/components/MorseForm.svelte";
  import morseJson from "./lib/assets/data/data.json";
  import type { MorseData } from "./lib/types";

  const morseData: MorseData = morseJson;
</script>

<div>
  <header class="p-2 bg-white shadow-md flex justify-center">
    <img
      src="/images/logo.png"
      alt="にゃーるす信号"
      class="w-28"
      fetchpriority="high"
    />
  </header>

  <main class="min-h-screen">
    <div class="pt-16">
      <div class="max-w-5xl mx-auto bg-white shadow rounded-lg">
        <MorseForm {morseData} />
        <div class="flex justify-end px-8">
          <img src="/images/cat_nobi.png" alt="猫伸び" class="w-16 md:w-24" />
        </div>
      </div>
    </div>
  </main>

  <footer class="bg-white p-3">
    &copy; 2025
    <a href="https://github.com/takashi145" class="underline">takashi145</a>
  </footer>
</div>

<style>
  :global(body) {
    background-image: url("/images/background.png");
    background-size: cover;
    background-position: center;
  }
</style>
