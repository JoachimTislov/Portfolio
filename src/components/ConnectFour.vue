<script setup lang="ts">
import {
  previousMove,
  getSlotColor,
  nextMove
} from '@/logic/ConnectFour/GameLogic/functions'
import { resetGame } from '@/logic/ConnectFour/GameLogic/resetGame'
import { dropPiece, busy } from '@/logic/ConnectFour/GameLogic/dropPiece'
import { botCalculating } from '@/logic/ConnectFour/BotLogic/botMove'
import {
  starting_player,
  GameOver,
  winnerMsg,
  board,
  playerTurn,
  droppingPiece,
  name,
  log
} from '@/logic/ConnectFour/GameLogic/variables'
import { pieces } from '@/logic/ConnectFour/GameLogic/pieces'
</script>

<template>
  <section class="mt-5 flex h-auto w-full flex-col items-center justify-center">
    <div class="flex w-full max-w-2xl flex-col px-2">
      <!-- Menu Container -->
      <div class="m-1 flex flex-col gap-2 sm:flex-row sm:items-center">
        <div class="flex-1">
          <label class="text-xs" for="name"> Your name (optional): </label>
          <input
            type="text"
            name="name"
            v-model="name"
            class="w-full rounded border border-gray-300 px-3 py-1.5 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="name"
          />
        </div>
        <div class="flex-1">
          <label class="text-xs" for="starting_player">
            Starting Player:
          </label>
          <select
            :disabled="droppingPiece"
            id="starting_player"
            class="w-full rounded border border-gray-300 px-3 py-1.5 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            v-model="starting_player"
            @change="resetGame()"
          >
            <option value="player">You</option>
            <option value="bot">Bot</option>
          </select>
        </div>
      </div>

      <div class="mt-2 flex flex-col gap-2 sm:flex-row">
        <button
          :disabled="droppingPiece || log.past.length < 2 || GameOver"
          @click="previousMove()"
          type="button"
          class="flex-1 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600"
        >
          Previous Move
        </button>

        <button
          :disabled="droppingPiece || log.future.length < 2 || GameOver"
          @click="nextMove()"
          type="button"
          class="flex-1 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600"
        >
          Next Move
        </button>
      </div>

      <button
        :disabled="droppingPiece || (starting_player == 'player' && pieces < 2)"
        @click="resetGame()"
        type="button"
        class="mt-2 w-full rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50 disabled:hover:bg-green-600"
      >
        <h2>{{ GameOver ? 'Play Again' : 'Restart' }}</h2>
      </button>

      <div
        class="border-1 mt-2 rounded-md border-gray-600 bg-zinc-400 p-1 text-center shadow-sm dark:border-white dark:bg-zinc-800"
      >
        <strong v-if="!GameOver">
          <h5
            v-if="busy && !botCalculating"
            class="m-0 p-0 text-base font-bold"
          >
            Dropping piece..
          </h5>
          <template v-else>
            <h5 v-if="playerTurn" class="m-0 p-0 text-base font-bold">
              Your Turn
            </h5>
            <h5 v-if="botCalculating" class="m-0 p-0 text-base font-bold">
              Bot is calculating...
            </h5>
          </template>
        </strong>

        <h2 v-else class="m-0 p-0 text-xl font-bold">{{ winnerMsg }}</h2>
      </div>
    </div>

    <div
      class="border-3 mb-20 mt-5 flex flex-row rounded-md border-t-0 border-gray-600 bg-zinc-400 p-[1%] dark:border-black dark:bg-zinc-700"
    >
      <div
        v-for="(column, colIndex) in board"
        :key="colIndex"
        @click="dropPiece(colIndex)"
        class="flex flex-col-reverse rounded-[50px] border-t-0 transition-all duration-500 ease-in-out hover:scale-105 hover:bg-gray-500 hover:shadow-lg hover:shadow-black/20 dark:hover:bg-black"
      >
        <div
          v-for="(value, rowIndex) in column"
          :key="rowIndex"
          class="m-0.5 h-[clamp(2em,11.5vw,6em)] w-[clamp(2em,11.5vw,6em)] rounded-full bg-white p-0.5"
        >
          <div
            class="h-full w-full rounded-full"
            :style="{ backgroundColor: getSlotColor(value) }"
            :class="`slot${colIndex}-${rowIndex}`"
          ></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes dropIn {
  0% {
    transform: translateY(-300%);
  }

  70% {
    transform: translateY(0);
  }

  90% {
    transform: translateY(-3px);
  }
}

.drop-in {
  z-index: 1;
  animation: dropIn 1s cubic-bezier(0.9, 0.6, 0.4, 1);
}
</style>
