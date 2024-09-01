<script setup lang="ts">
import {
  previousMove,
  getSlotColor,
  getNameOfSlot,
  nextMove
} from '../../../Logic/FourInARow/GameLogic/functions'

import { resetGame } from '@/Logic/FourInARow/GameLogic/resetGame'

import { dropPiece, busy } from '@/Logic/FourInARow/GameLogic/dropPiece'

import { botCalculating } from '@/Logic/FourInARow/BotLogic/botMove'

import {
  starting_player,
  GameOver,
  winnerMsg,
  board,
  playerTurn,
  droppingPiece,
  name,
  log
} from '../../../Logic/FourInARow/GameLogic/variables'
import { pieces } from '@/Logic/FourInARow/GameLogic/pieces'
</script>

<template>
  <section class="mainDiv">
    <div class="menu">
      <div class="m-1 d-flex align-items-center">
        <div class="me-1">
          <label class="label" for="name"> Your name (optional): </label>
          <input type="text" name="name" v-model="name" class="form-control">
        </div>
        <div>
          <label class="label" for="starting_player"> Starting Player: </label>
          <select :disabled="droppingPiece" id="starting_player" class="form-control form-control-sm"
            v-model="starting_player" @change="resetGame()">
            <option value="player">You</option>
            <option value="bot">Bot</option>
          </select>
        </div>
      </div>

      <div class="d-flex btn-group btn-group-md">
        <button :disabled="droppingPiece || log.past.length < 2 || GameOver" @click="previousMove()" type="button"
          class="m-1 btn btn-primary">
          Previous Move
        </button>

        <button :disabled="droppingPiece || log.future.length < 2 || GameOver" @click="nextMove()" type="button"
          class="m-1 btn btn-primary">
          Next Move
        </button>
      </div>

      <button :disabled="droppingPiece || (starting_player == 'player' && pieces < 2)" @click="resetGame()"
        type="button" class="m-1 btn btn-success">
        <template v-if="GameOver"> Play Again </template>
        <template v-if="!GameOver"> Restart </template>
      </button>

      <div v-if="!GameOver" class="m-1 p-2 message">
        <h5 v-if="busy && !botCalculating"><strong> Dropping piece.. </strong></h5>
        <template v-else>
          <h5 v-if="playerTurn"><strong> Your Turn </strong></h5>
          <h5 v-if="botCalculating"><strong> Bot is calculating... </strong></h5>
        </template>
      </div>

      <div v-if="GameOver" class="m-1 p-2 message">
        <h4>{{ winnerMsg }}</h4>
      </div>
    </div>

    <div class="mt-1 board">
      <div v-for="(column, colIndex) in board" :key="colIndex" @click="dropPiece(colIndex)"
        class="boardColumn column-reverse">
        <div v-for="(value, rowIndex) in column" :key="rowIndex" class="slotBackground">
          <div class="slot" :class="getNameOfSlot(colIndex, rowIndex)"
            :style="{ backgroundColor: getSlotColor(value) }">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
#starting_player {
  font-size: clamp(1rem, 1vw, 1.2rem);
}

.label {
  font-size: 0.8em;
}

.menu {
  display: flex;
  flex-direction: column;
}

.buttons {
  margin-top: 1rem;
}

.mainDiv {
  width: 100%;
  height: auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 20px;
}

.board {
  display: flex;
  flex-direction: row;

  background-color: #2a2424;

  padding: 1%;
  border-radius: 20px;

  border: rgb(0, 0, 0) solid 6px;
  border-top: 0;

  margin-bottom: 5rem;
}

.column {
  display: flex;
  flex-direction: column;
}

.column-reverse {
  display: flex;
  flex-direction: column-reverse;
  border-top: 0;

  border-radius: 40px;

  transition:
    transform 0.3s ease-in-out,
    box-shadow 0.3s ease-in-out,
    background-color 0.3s ease-in-out;
}

.column-reverse:hover {
  background-color: #000;
  /* Using hex for consistency */
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  /* Adding a subtle shadow effect */
}

.slotBackground {
  border-radius: 50%;
  background-color: white;

  width: clamp(2em, 11.5vw, 6em);
  height: clamp(2em, 11.5vw, 6em);

  padding: 2px;
  margin: 2px;
}

.slot {
  border-radius: 50%;
  width: 100%;
  height: 100%;
}

@keyframes dropIn {
  0% {
    transform: translateY(-300%);
  }

  70% {
    transform: translateY(0);
  }

  90% {
    transform: translateY(-5px);
  }

  100% {
    transform: translateY(0);
  }
}

.drop-in {
  z-index: 1;
  animation: dropIn 1s cubic-bezier(0.9, 0.6, 0.4, 1);
}

h1,
h2,
h3,
h4,
h5 {
  padding: 0;
  margin: 0;
}

h4 {
  font-size: clamp(1.2rem, 1.2vw, 1.5rem);
}

h5 {
  font-size: 1rem;
}

.message {
  background-color: #2e2a2a;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: solid 2px white;
  border-radius: 8px;
}

.winner-message h4 {
  margin: 0;
  font-size: 1rem;
}
</style>
