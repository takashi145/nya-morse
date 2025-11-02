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
    <div class="py-8 space-y-12">
      <div
        class="max-w-4xl mx-auto bg-white shadow rounded-lg border border-orange-300"
      >
        <MorseForm {morseData} />
        <div class="flex justify-end px-8">
          <img src="/images/cat_nobi.png" alt="猫伸び" class="w-16 md:w-24" />
        </div>
      </div>

      <div
        class="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 md:p-8 border border-orange-300"
      >
        <div
          class="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12"
        >
          <div
            class="flex items-center gap-4 bg-orange-50 rounded-lg p-4 w-full md:w-auto"
          >
            <div class="text-center flex-1 md:flex-initial">
              <div class="text-xl md:text-2xl font-bold text-gray-700 mb-1">
                トン(·)
              </div>
              <div class="text-sm text-gray-500">短い音</div>
            </div>
            <div class="text-2xl md:text-3xl text-orange-400">=</div>
            <div class="text-center flex-1 md:flex-initial">
              <div class="text-xl md:text-2xl mb-1">🐾</div>
              <div class="text-xl md:text-2xl font-bold text-orange-400">
                にゃ
              </div>
            </div>
          </div>

          <div
            class="flex items-center gap-4 bg-orange-50 rounded-lg p-4 w-full md:w-auto"
          >
            <div class="text-center flex-1 md:flex-initial">
              <div class="text-xl md:text-2xl font-bold text-gray-700 mb-1">
                ツー(−)
              </div>
              <div class="text-sm text-gray-500">長い音</div>
            </div>
            <div class="text-2xl md:text-3xl text-orange-400">=</div>
            <div class="text-center flex-1 md:flex-initial">
              <div class="text-xl md:text-2xl mb-1">🐾</div>
              <div class="text-xl md:text-2xl font-bold text-orange-400">
                にゃー
              </div>
            </div>
          </div>
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
