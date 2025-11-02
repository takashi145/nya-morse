<script lang="ts">
  import morseJson from "$lib/assets/data/data.json";

  interface MorseTable {
    [key: string]: string;
  }

  interface MorseData {
    en: MorseTable;
    ja: MorseTable;
    number: MorseTable;
  }

  type Mode = "en" | "ja";

  export let mode: Mode = "en";

  const morseData: MorseData = morseJson;
  const morseDataJa: MorseTable = { ...morseData.ja, ...morseData.number };
  const morseDataEn: MorseTable = { ...morseData.en, ...morseData.number };
</script>

<div class="mx-auto flex flex-col items-center overflow-y-auto max-h-[80vh]">
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
