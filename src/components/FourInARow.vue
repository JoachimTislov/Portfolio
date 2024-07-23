<script setup lang="ts">
import {
  initTwoPlayer,
  initBotGame,
  previousMove,
  resetGame,
  getSlotColor,
  dropPiece,
  getNameOfSlot
  
} from '../Logic/FourInARow/GameLogic/functions'  


import {
  botGame,
  gameMode,
  
  first_player,
  ShowWinner,
  winnerMsg,

  board,
  playerTurn,
  ShowMenu,
  ShowBoard

} from '../Logic/FourInARow/GameLogic/variables'  
 
</script>
 
<template>
  <section id="mainDiv">
    <button @click="ShowMenu = !ShowMenu" class="mb-1 btn btn-secondary">
      <template v-if="ShowMenu">
        Hide Game Menu
      </template>
      <template v-else>
        Show Game Menu
      </template>
    </button>
    <div v-show="ShowMenu">
      <div class="d-flex btn-group-sm btn-group" role="group">
        <button v-if="botGame" @click="initTwoPlayer(), resetGame()" type="button" class="border-light m-1 btn btn-secondary">
          Two Player Game
        </button>
        <button v-if="!botGame" @click="initBotGame()" type="button" class="border-light m-1 m-1 btn btn-secondary">Play against the Bot</button>
      </div>
      <template v-if="!ShowWinner">
        <div class="p-3 participantTurnMessage">
          <h4> {{ gameMode }} </h4>
          <template v-if="botGame">
            <h5 v-if="playerTurn"> <strong>  Your Turn </strong> </h5>
            <h5 v-else> <strong> Bot is calculating... </strong> </h5>
          </template>
        </div>
      </template>

      <div class="winner-message" v-show="ShowWinner">
        <h4>{{ winnerMsg }}</h4>
      </div>

      <div class="d-flex justify-content-center form-group" role="group">

        <div class="info">
          <template v-if="botGame">
            <div class="m-1 mt-1">
              <label for="starting_player"> Starting Player: </label> <br>
              <select 
                id="starting_player"
                class="form-control form-control-sm"
                v-model="first_player"
                @change="resetGame()"
              >
                <option value="Player 1">Player 1</option>
                <option value="bot">Bot</option>
              </select>
            </div>
          </template>

          <div class="btn-group btn-group-sm" role="group">      
            <button id="previousButton" @click="previousMove()" type="button" class="m-1 mt-3 btn btn-primary" disabled> Previous Move </button>

            <button id="restartButton" @click="resetGame()" type="button" class="m-1 mt-3 btn btn-success" disabled>
              <template v-if="ShowWinner"> Play Again </template>
              <template v-else> Restart </template>
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <div id="board" v-show="ShowBoard">
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
.participantTurnMessage {
  color: black;

  background-color: grey;
  height: auto;

  border-radius: 10px;
  border: 5px solid darkslategrey;

  text-align: center;
}

.info {
  display: flex;
  flex-direction: row;
}

@media (max-width: 1000px) {
  .info {
    flex-direction: column;
  }
}

#mainDiv {
  width: 100%;
  height: auto;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 20px;
  padding: 20px;
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

  transition: transform 0.5s ease, box-shadow 0.5s ease;
}

.column-reverse:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  transform: scale(1.1);
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

.winner-message {

  background-color: #2e2a2a; /* Light background color */
  border: 2px solid #ccc; /* Border for contrast */
  padding: 20px; /* Padding around the content */
  text-align: center; /* Center-align text */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Soft shadow for depth */
  border-radius: 8px; /* Rounded corners */
  max-width: 400px; /* Example maximum width */
}

.winner-message h4 {
  margin: 0; 
  font-size: 1rem; 
}

</style>
