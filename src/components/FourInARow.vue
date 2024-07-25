<script setup lang="ts">
import {
  initTwoPlayer,
  initBotGame,
  previousMove,
  getSlotColor,
  getNameOfSlot,
  getNumber
  
} from '../Logic/FourInARow/GameLogic/functions'  

import { resetGame } from '@/Logic/FourInARow/GameLogic/resetGame';

import { dropPiece, busy } from '@/Logic/FourInARow/GameLogic/dropPiece';

import { pieces } from '@/Logic/FourInARow/GameLogic/pieces';

import { getColor } from '@/Logic/FourInARow/GameLogic/checkWinner'

import { botCalculating } from '@/Logic/FourInARow/BotLogic/botMove'

import {
  botGame,
  gameMode,

  GameOver,
  
  first_player,
  ShowWinner,
  winnerMsg,

  board,
  playerTurn,
  ShowBoard,

  droppingPiece,
  playerStatus

} from '../Logic/FourInARow/GameLogic/variables'  

</script>
 
<template>
  <section class="mainDiv">
    <div class="menu">
          <div class="mt-1 mb-1 btn-group">
            <button :disabled="droppingPiece" v-if="botGame" @click="initTwoPlayer(), resetGame()" type="button" class="border-light btn btn-secondary">
              Two Player Game
            </button>
            <button :disabled="droppingPiece" v-if="!botGame" @click="initBotGame(), resetGame()" type="button" class="border-light btn btn-secondary">Play against the Bot</button>
          </div>

          <div v-if="botGame" class="mb-1 d-flex flex-column">
            <label class="label" for="starting_player"> Starting Player: </label>
            <select 
              :disabled="droppingPiece"
              id="starting_player"
              class="form-control form-control-sm"
              v-model="first_player"
              @change="resetGame()"
            >
              <option value="Player 1">You</option>
              <option value="bot">Bot</option>
            </select>
          </div>

          <div v-if="!ShowWinner" class="mt-2 p-4 message">
            <h4> {{ gameMode }} </h4>
            <template v-if="botGame">
              <h5 v-if="busy && !botCalculating"> <strong>  Dropping piece.. </strong> </h5>
              <template v-else>
                <h5 v-if="playerTurn"> <strong>  Your Turn </strong> </h5>
                <h5 v-if="botCalculating"> <strong> Bot is calculating... </strong> </h5>
              </template>
            </template>
            <template v-if="!botGame">
              <h5 v-if="busy"> <strong>  Dropping piece.. </strong> </h5>

              <template v-else>
                <h5 v-if="playerStatus == 1"> <strong>  {{ getColor(1) }} to play </strong> </h5>
                <h5 v-if="playerStatus == 2"> <strong>  {{ getColor(2) }} to play </strong> </h5>
              </template>
            </template>
          </div>

          <div v-if="ShowWinner" class="p-4 message">
            <h4>{{ winnerMsg }}</h4>
          </div>

          <div class="d-flex btn-group btn-group-lg mt-2"> 
            <button ref="restartButton" :disabled="droppingPiece || !(pieces > getNumber() || ShowWinner)" @click="resetGame()" type="button" class="m-1 btn btn-md btn-success">
              <template v-if="ShowWinner"> Play Again </template>
              <template v-else> Restart </template>
            </button>

            <button ref="previousButton" :disabled="droppingPiece /*|| !(pieces > getNumber() && !GameOver)*/" @click="previousMove()" type="button" class="m-1 btn btn-md btn-primary"> Previous Move </button>
          </div>
    </div>
    
    <div class="board" v-show="ShowBoard">
      <div
        v-for="(column, colIndex) in board"
        :key="colIndex"
        @click="dropPiece(colIndex)"
        class="boardColumn column-reverse"
      >
        <div
          v-for="(value, rowIndex) in column"
          :key="rowIndex" 
          class="slotBackground"
        >
          <div
          class="slot"
          :class="getNameOfSlot(colIndex, rowIndex)" 
          :style="{ backgroundColor: getSlotColor(value) }"
          >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
#starting_player {
  font-size: clamp(1rem, 2vw, 1.6rem);
}

.label {
  font-size: 0.8em;
}
.participantTurnMessage {
  background-color: #2e2a2a;

  border-radius: 10px;
  border: 5px solid rgb(35, 37, 37);

  text-align: center;
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

  border: black solid 6px;
  border-top: 0;

  margin-top: 3%;
  margin-bottom: 100px;
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

  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, background-color 0.3s ease-in-out;
}

.column-reverse:hover {
  background-color: #000; /* Using hex for consistency */
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); /* Adding a subtle shadow effect */
}

.slotBackground {
  border-radius: 50%;
  background-color: white;  

  width: clamp(2em, 11.5vw, 8em);
  height: clamp(2em, 11.5vw, 8em);

  padding: 2px;
  margin: 2px;
}


.slot {
  border: solid 2px #333;
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
h3, h4, h5 {
  padding: 0;
  margin: 0;
}

h4 {
  font-size: clamp(1.4rem, 2vw, 2rem);
}

h5 {
  font-size: clamp(1rem, 2vw, 1.2rem);
}

.message {
  background-color: #2e2a2a; 
  text-align: center; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
  border: solid 2px white;
  border-radius: 8px; 

  margin-right: 20px;

  width: 100%;
}

.winner-message h4 {
  margin: 0; 
  font-size: 1rem; 
}

</style>
