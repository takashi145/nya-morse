<script lang="ts">
  import type { MorseData, MorseTable, Mode } from "../types";

  export let morseData: MorseData;

  let mode: Mode = "en";

  const morseDataJa: MorseTable = { ...morseData.ja, ...morseData.number };
  const morseDataEn: MorseTable = { ...morseData.en, ...morseData.number };
</script>

<div class="mx-auto flex flex-col items-center w-full">
  <!-- モード選択 -->
  <div class="mb-4 flex justify-center">
    <div class="inline-flex rounded-lg bg-gray-200 p-1">
      <button
        on:click={() => (mode = "en")}
        class="px-3 md:px-4 py-1 md:py-1.5 rounded-md text-xs md:text-sm font-medium cursor-pointer transition-all {mode ===
        'en'
          ? 'bg-orange-400 text-white shadow-md'
          : 'text-gray-600 hover:text-gray-800'}"
        aria-pressed={mode === "en"}
      >
        欧文
      </button>
      <button
        on:click={() => (mode = "ja")}
        class="px-3 md:px-4 py-1 md:py-1.5 rounded-md text-xs md:text-sm font-medium cursor-pointer transition-all {mode ===
        'ja'
          ? 'bg-orange-400 text-white shadow-md'
          : 'text-gray-600 hover:text-gray-800'}"
        aria-pressed={mode === "ja"}
      >
        和文
      </button>
    </div>
  </div>

  <!-- テーブル -->
  <div class="overflow-y-auto max-h-[70vh] w-full">
    <table class="w-full text-center font-bold text-gray-800">
      <thead class="bg-orange-400 uppercase text-white sticky top-0">
        <tr>
          <th scope="col" class="px-3 py-2 md:px-6 md:py-3 text-sm md:text-base"
            >文字</th
          >
          <th scope="col" class="px-3 py-2 md:px-6 md:py-3 text-sm md:text-base"
            >符号</th
          >
        </tr>
      </thead>
      <tbody>
        {#each Object.entries(mode === "ja" ? morseDataJa : morseDataEn) as [key, data]}
          <tr class="group border-b bg-white hover:bg-orange-100 no-select">
            <td class="px-3 py-3 md:px-6 md:py-4 text-sm md:text-base">
              {data}
            </td>
            <td class="px-3 py-3 md:px-6 md:py-4 text-sm md:text-base">
              {key}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
