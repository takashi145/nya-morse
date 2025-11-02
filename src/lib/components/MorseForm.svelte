<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { fade } from "svelte/transition";
  import morseJson from "$lib/assets/data/data.json";

  interface MorseTable {
    [key: string]: string;
  }

  interface MorseData {
    en: MorseTable;
    ja: MorseTable;
    number: MorseTable;
  }

  const morseData: MorseData = morseJson;
  const dotThreshold = 200; // 短い音と判定する時間（ミリ秒）
  const characterTimeout = 700; // 文字の区切りと判定する時間（ミリ秒）

  let audio: HTMLAudioElement;
  let code: string = "";
  let translatedText: string = "";
  let errorMessage: string = "";
  let pressStartTime = 0;
  let isPressed = false;
  let currentLetter = ""; // 現在入力中の文字
  let letterTimeout: ReturnType<typeof setTimeout> | null = null;

  // 入力された符号をスペースで分割して配列に変換
  $: codeArray = code.trim() ? code.trim().split(" ") : [];

  // 符号を翻訳
  $: translatedText = (() => {
    return codeArray.map((code) => morseData.en[code] || "").join(" ");
  })();

  // キーが押されたときの処理
  const startPress = async (event: Event) => {
    event.preventDefault();

    pressStartTime = Date.now();
    isPressed = true;

    try {
      audio.currentTime = 0;
      await audio.play();
    } catch (error) {
      console.error("Audio play failed:", error);
    }
  };

  // キーが離されたときの処理
  const endPress = (event: Event) => {
    event.preventDefault();

    if (!isPressed) return;

    const duration = Date.now() - pressStartTime;
    isPressed = false;

    audio.pause();

    // 符号判定
    if (duration <= dotThreshold) {
      currentLetter += "にゃ";
    } else {
      currentLetter += "にゃー";
    }

    // 文字の区切り判定タイマーをリセット
    if (letterTimeout) clearTimeout(letterTimeout);

    // 文字の区切り判定タイマーをセット
    // characterTimeoutミリ秒間入力がなければ文字を確定
    letterTimeout = setTimeout(() => {
      if (morseData.en[currentLetter] === void 0) {
        // 対応する文字が存在しない場合はエラーメッセージを表示
        errorMessage = "対応する文字が存在しませんでした";
        setTimeout(() => {
          errorMessage = "";
        }, 1000);
      } else {
        // 対応する文字が存在する場合は符号列に追加
        code += currentLetter + " ";
      }
      currentLetter = "";
    }, characterTimeout);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === "Space" && !event.repeat) {
      event.preventDefault();
      startPress(event);
    }
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.code === "Space") {
      event.preventDefault();
      endPress(event);
    }
  };

  onMount(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    audio = new Audio("/audio/nya.mp3");
    audio.load();
  });

  onDestroy(() => {
    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("keyup", handleKeyUp);
    audio.pause();
    audio.currentTime = 0;
    letterTimeout && clearTimeout(letterTimeout);
  });
</script>

<div>
  <div class="mx-auto mb-8 p-8 max-w-4xl">
    <div
      class="relative mx-auto mb-8 w-full max-w-4xl rounded bg-white p-4 text-center"
    >
      <!-- 変換結果の表示欄 -->
      <div class="md:text-xl mb-4">
        {#if translatedText === ""}
          <p class="text-gray-400 italic">ここに変換結果が表示されます</p>
        {:else}
          <p class="font-bold">{translatedText}</p>
        {/if}
      </div>

      <!-- 表示欄の区切り -->
      <div class="border-t border-gray-500 mb-4"></div>

      <!-- 入力値の表示欄-->
      <div class="md:text-xl">
        <!-- エラーメッセージの表示 -->
        {#if errorMessage !== ""}
          <div
            class="absolute top-0 right-0 mt-2 mr-2 p-2 bg-red-100 rounded shadow"
            transition:fade
          >
            <p class="text-sm text-red-500">{errorMessage}</p>
          </div>
        {/if}

        <div
          class="mb-3 mx-16 md:mx-20 flex flex-wrap items-center justify-center"
        >
          {#if codeArray.length > 0}
            {#each codeArray as code}
              <div class="mx-3 my-1 font-bold underline">
                {code}
              </div>
            {/each}
          {:else}
            <div class="text-gray-400 italic">入力された符号</div>
          {/if}
        </div>
      </div>
    </div>

    <!-- 符号入力ボタン -->
    <div class="mx-auto mb-8 flex items-center justify-center space-x-6">
      <button
        on:mousedown={startPress}
        on:mouseup={endPress}
        on:mouseleave={endPress}
        on:touchstart={startPress}
        on:touchend={endPress}
        on:touchmove|preventDefault
        class="rounded-full bg-orange-400 p-4 text-white hover:bg-orange-500 no-select active:bg-orange-500 shadow-xl active:shadow-none transform transition-transform duration-100 cursor-pointer"
        aria-label="肉球ボタン"
      >
        <svg
          version="1.1"
          id="_x32_"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 512 512"
          class="size-14 md:size-16"
          xml:space="preserve"
        >
          <g>
            <path
              class="st0"
              d="M205.116,153.078c31.534,11.546,69.397-12.726,84.58-54.209c15.174-41.484,1.915-84.462-29.614-96.001
		c-31.541-11.53-69.4,12.735-84.582,54.218C160.325,98.57,173.584,141.548,205.116,153.078z"
              style="fill: rgb(255, 255, 255)"
            ></path>
            <path
              class="st0"
              d="M85.296,219.239c32.987-2.86,56.678-40.344,52.929-83.75c-3.757-43.391-33.545-76.253-66.532-73.409
		c-32.984,2.869-56.674,40.36-52.921,83.759C22.53,189.23,52.313,222.091,85.296,219.239z"
              style="fill: rgb(255, 255, 255)"
            ></path>
            <path
              class="st0"
              d="M342.196,217.768c28.952,17.017,70.552-0.073,92.926-38.154c22.374-38.106,17.041-82.758-11.915-99.774
		c-28.951-17.001-70.56,0.097-92.93,38.178C307.905,156.117,313.245,200.768,342.196,217.768z"
              style="fill: rgb(255, 255, 255)"
            ></path>
            <path
              class="st0"
              d="M497.259,262.912c-18.771-27.271-63.07-29.379-98.954-4.694c-35.892,24.701-49.762,66.822-30.996,94.101
		c18.766,27.27,63.069,29.38,98.954,4.686C502.143,332.312,516.021,290.191,497.259,262.912z"
              style="fill: rgb(255, 255, 255)"
            ></path>
            <path
              class="st0"
              d="M304.511,268.059c-3.58-24.773-18.766-47.366-43.039-58.824c-24.268-11.45-51.365-8.807-72.758,4.169
		c-23.646,14.35-38.772,33.096-59.138,41.29c-20.363,8.193-77.4-16.209-112.912,48.278c-25.081,45.548-2.057,103.128,44.962,125.315
		c35.738,16.864,64.023,14.981,84.788,24.774c20.762,9.793,37.29,32.83,73.025,49.692c47.018,22.188,106.1,3.362,125.315-44.957
		c27.206-68.407-27.897-96.922-34.522-117.85C303.613,319.021,308.47,295.426,304.511,268.059z"
              style="fill: rgb(255, 255, 255)"
            ></path>
          </g>
        </svg>
      </button>
    </div>

    <p class="text-center text-gray-500">
      <b class="text-orange-400">肉球ボタン</b> または
      <b class="text-orange-400">Spaceキー</b> で入力できます
    </p>
  </div>
</div>
