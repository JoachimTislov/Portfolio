<script setup lang="ts">
import {
  previousMove,
  getSlotColor,
  getNameOfSlot,
  nextMove
} from '@/logic/FourInARow/GameLogic/functions'
import { resetGame } from '@/logic/FourInARow/GameLogic/resetGame'
import { dropPiece, busy } from '@/logic/FourInARow/GameLogic/dropPiece'
import { botCalculating } from '@/logic/FourInARow/BotLogic/botMove'
import {
  starting_player,
  GameOver,
  winnerMsg,
  board,
  playerTurn,
  droppingPiece,
  name,
  log
} from '@/logic/FourInARow/GameLogic/variables'
import { pieces } from '@/logic/FourInARow/GameLogic/pieces'
</script>

<template>
  <section class="w-full h-auto flex flex-col justify-center items-center mt-5">
    <div class="flex flex-col w-full max-w-2xl px-2">
      <!-- Menu Container -->
      <div class="m-1 flex flex-col sm:flex-row sm:items-center gap-2">
        <div class="flex-1">
          <label class="text-xs" for="name"> Your name (optional): </label>
          <input
            type="text"
            name="name"
            v-model="name"
            class="px-3 py-1.5 border border-gray-300 rounded text-base w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="name"
          />
        </div>
        <div class="flex-1">
          <label class="text-xs" for="starting_player"> Starting Player: </label>
          <select
            :disabled="droppingPiece"
            id="starting_player"
            class="px-3 py-1.5 border border-gray-300 rounded text-base w-full focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            v-model="starting_player"
            @change="resetGame()"
          >
            <option value="player">You</option>
            <option value="bot">Bot</option>
          </select>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row gap-2 mt-2">
        <button
          :disabled="droppingPiece || log.past.length < 2 || GameOver"
          @click="previousMove()"
          type="button"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex-1"
        >
          Previous Move
        </button>

        <button
          :disabled="droppingPiece || log.future.length < 2 || GameOver"
          @click="nextMove()"
          type="button"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex-1"
        >
          Next Move
        </button>
      </div>

      <button
        :disabled="droppingPiece || (starting_player == 'player' && pieces < 2)"
        @click="resetGame()"
        type="button"
        class="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed w-full"
      >
        <template v-if="GameOver"> Play Again </template>
        <template v-if="!GameOver"> Restart </template>
      </button>

      <div
        v-if="!GameOver"
        class="my-3 p-2 bg-zinc-800 text-center shadow-sm border-2 border-white rounded-lg"
      >
        <strong>
          <h5 v-if="busy && !botCalculating" class="text-base font-bold p-0 m-0">
            Dropping piece..
          </h5>
          <template v-else>
            <h5 v-if="playerTurn" class="text-base font-bold p-0 m-0">Your Turn</h5>
            <h5 v-if="botCalculating" class="text-base font-bold p-0 m-0">Bot is calculating...</h5>
          </template>
        </strong>
      </div>

      <div
        v-if="GameOver"
        class="m-1 p-2 bg-zinc-800 text-center shadow-sm border-2 border-white rounded-lg"
      >
        <h4 class="text-xl font-bold p-0 m-0">{{ winnerMsg }}</h4>
      </div>
    </div>
    <div
      class="mt-1 flex flex-row bg-zinc-700 p-[1%] rounded-2xl border-black border-6 border-t-0 mb-20"
    >
      <div
        v-for="(column, colIndex) in board"
        :key="colIndex"
        @click="dropPiece(colIndex)"
        class="flex flex-col-reverse border-t-0 rounded-[50px] transition-all duration-500 ease-in-out hover:bg-black hover:scale-105 hover:shadow-lg hover:shadow-black/20"
      >
        <div
          v-for="(value, rowIndex) in column"
          :key="rowIndex"
          class="rounded-full bg-white w-[clamp(2em,11.5vw,6em)] h-[clamp(2em,11.5vw,6em)] p-0.5 m-0.5"
        >
          <div
            class="rounded-full w-full h-full"
            :class="getNameOfSlot(colIndex, rowIndex)"
            :style="{ backgroundColor: getSlotColor(value) }"
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
