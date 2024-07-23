<script setup lang="ts">
import { usePiecesStore } from '@/Logic/FourInARow/stores/counter';

import {
  initTwoPlayer,
  initBotGame,
  previousMove,
  getSlotColor,
  getNameOfSlot,
  alterPreviousButton,
  alterRestartButton
  
} from '../Logic/FourInARow/GameLogic/functions'  

import { resetGame } from '@/Logic/FourInARow/GameLogic/resetGame';

import { dropPiece } from '@/Logic/FourInARow/GameLogic/dropPiece';

import {
  botGame,
  gameMode,
  
  first_player,
  ShowWinner,
  winnerMsg,

  board,
  playerTurn,
  ShowMenu,
  ShowBoard,

  isPreviousDisabled,
  isRestartDisabled

} from '../Logic/FourInARow/GameLogic/variables'  
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';

const store = usePiecesStore()

const { decrementPieces, incrementPieces, assignInt} = store

const { pieces } = storeToRefs(store)

onMounted(async () => {
  // Perform initialization or setup tasks here
  console.log('At mounted: ', pieces.value)

  alterPreviousButton(pieces.value)
  alterRestartButton(pieces.value)
});
 
</script>
 
<template>
  <section class="mainDiv">
    <div class="menu">
          <button @click="ShowMenu = !ShowMenu" class="mt-1 btn btn-secondary align-self-center">
            <template v-if="ShowMenu">
              Hide Game Menu
            </template>
            <template v-else>
              Show Game Menu
            </template>
          </button>

          <div v-if="ShowMenu && botGame" class="mt-4 d-flex flex-column">
            <label class="label" for="starting_player"> Starting Player: </label>
            <select 
              id="starting_player"
              class="form-control form-control-sm"
              v-model="first_player"
              @change="resetGame(pieces, assignInt)"
            >
              <option value="Player 1">You</option>
              <option value="bot">Bot</option>
            </select>
          </div>
          
          <div v-if="ShowMenu" class="mt-2 mb-2 btn-group">
            <button v-if="botGame" @click="initTwoPlayer(), resetGame(pieces, assignInt)" type="button" class="border-light btn btn-secondary">
              Two Player Game
            </button>
            <button v-if="!botGame" @click="initBotGame(assignInt), resetGame(pieces, assignInt)" type="button" class="border-light btn btn-secondary">Play against the Bot</button>
          </div>

          <template v-if="!ShowWinner && ShowMenu">
            <div class="p-4 message">
              <h4> {{ gameMode }} </h4>
              <template v-if="botGame">
                <h5 v-if="playerTurn"> <strong>  Your Turn </strong> </h5>
                <h5 v-else> <strong> Bot is calculating... </strong> </h5>
              </template>
            </div>
          </template>

          <template v-if="ShowWinner && ShowMenu"> 
            <div class="p-4 message">
              <h4>{{ winnerMsg }}</h4>
            </div>
          </template>

          <div v-if="ShowMenu" class="d-flex btn-group btn-group-md mt-1"> 
            <button ref="restartButton" :disabled="isRestartDisabled" @click="resetGame(pieces, assignInt)" type="button" class="m-1 btn btn-md btn-success">
              <template v-if="ShowWinner"> Play Again </template>
              <template v-else> Restart </template>
            </button>

            <button ref="previousButton" :disabled="isPreviousDisabled" @click="previousMove(pieces, decrementPieces)" type="button" class="m-1 btn btn-md btn-primary"> Previous Move </button>
          </div>
    </div>
    
    <div id="board" v-show="ShowBoard">
      <div
        v-for="(column, colIndex) in board"
        :key="colIndex"
        @click="dropPiece(colIndex, pieces, incrementPieces)"
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

@media (max-width: 700px) {
  .menu {
    display: flex;
    flex-direction: column;
  }

  .buttons {
    margin-top: 3.5rem;
    margin-left: 0.5rem;
  }
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

#board {
  display: flex;
  flex-direction: row;

  background-color: #2a2424;

  padding: 1%;
  border-radius: 20px;

  border: black solid 6px;
  border-top: 0;

  margin-top: 3%;
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

  transition: transform 0.5s ease, box-shadow 0.5s ease;
}

.column-reverse:hover {
  background-color: rgb(0, 0, 0);
  transform: scale(1.05);
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
    transform: translateY(-300%); /* Start position relative to board height */
  }
  40% {
    transform: translateY(5px); /* Slight movement up */
  }
  70% {
    transform: translateY(-10px); /* Additional bounce effect */
  }
  100% {
    transform: translateY(0); /* Return to normal */
  }
}

.drop-in {
  z-index: 1;
  animation: dropIn 2s ease-in-out forwards;
}

h1,
h2,
h3, h4, h5 {
  padding: 0;
  margin: 0;
}

h4 {
  font-size: clamp(0.8rem, 5vw, 1.2rem);
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

  margin-right: 20px;

  width: 100%;
}

.winner-message h4 {
  margin: 0; 
  font-size: 1rem; 
}

</style>
