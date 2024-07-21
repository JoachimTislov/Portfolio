<script setup lang="ts">
import {
  botGame,
  gameMode,
  pieces,
  initTwoPlayer,
  initBotGame,
  first_player,
  ShowWinner,
  winnerMsg,
  previousMove,
  resetGame,
  board,
  getSlotColor,
  dropPiece,
  playerTurn
} from './Logic/FourInARow/gameLogic'  


const getNameOfSlot = (colIndex: number, rowIndex: number) => {
  return 'slot' + colIndex + '-' + rowIndex
} 
</script>

<template>
  <div class="mt-5 d-flex btn-group-lg btn-group" role="group">
    <button v-if="botGame" @click="initTwoPlayer(), resetGame()" type="button" class="border-light m-1 btn btn-secondary">
      Two Player Game
    </button>
    <button v-if="!botGame" @click="initBotGame()" type="button" class="border-light m-1 m-1 btn btn-secondary">Play against the Bot</button>
  </div>

  <section id="mainDiv">
    <div class="menu m-1">
        <template v-if="!ShowWinner">
          <div class="p-3 mb-3 participantTurnMessage">
            <h4>{{ gameMode }} </h4>
            <template v-if="botGame">
              <h3 v-if="playerTurn"> <strong>  Your Turn </strong> </h3>
              <h3 v-else> <strong> Bot is calculating... </strong> </h3>
            </template>
          </div>
        </template>

        <div class="winner-message" v-show="ShowWinner">
          <h4>{{ winnerMsg }}</h4>
        </div>

        <div class="d-flex justify-content-center form-group" role="group">

          <div class="info">
            <template v-if="botGame" >
              <div class="m-1 mt-0">
                <label for="starting_player"> Starting Player: </label> <br>
                <select 
                  id="starting_player"
                  class="form-control form-control-md"
                  v-model="first_player"
                  @change="resetGame()"
                >
                  <option value="Player 1">Player 1</option>
                  <option value="bot">Bot</option>
                </select>
              </div>
            </template>

            <div class="btn-group btn-group-sm" role="group">
              <button @click="resetGame()" type="button" class="m-1 mt-3 btn btn-success">Play Again / Restart </button>

              <template v-if="!ShowWinner">
                <button v-if="!botGame && pieces > 0 || botGame && pieces > 1" @click="previousMove()" type="button" class="m-1 mt-3 btn btn-primary"> Previous Move </button>
              </template>
            </div>
          </div>

        </div>
        
    </div>
    
    <div id="board">
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

.menu {
  width: 80%;
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

  gap: 0.15em;

  border: solid 10px black;

  margin-top: 20px;
  margin-bottom: 3%;
  padding: 20px;

  background-color: rgb(49, 49, 49);
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
  transition:
    background-color 0.3s ease,
    box-shadow 0.3s ease,
    transform 0.3s ease;
  border-top: 0;
}

.column-reverse:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  transform: scale(1.1);
}

.slotBackground {
  border-radius: 50%;
  background-color: white;  

  width: 8em;
  height: 8em;

  padding: 2px;
  margin: 2px;
}

@media (min-width: 1000px) and (max-width: 1200px) {
  .slotBackground {

    width: 6em;
    height: 6em;

  }
}
@media (min-width: 770px) and (max-width: 1000px) {
  .slotBackground {

    width: 4em;
    height: 4em;

  }
}

@media (min-width: 500px) and (max-width: 770px) {
  .slotBackground {

    width: 3.5em;
    height: 3.5em;

  }

  h3 {
    font-size: 1em;
  }
}

@media (max-width: 500px) {
  .slotBackground {

    width: 2.5em;
    height: 2.5em;

  }

  h3 {
    font-size: 1em;
  }
}

.slot {
  border: solid 2px #333;
  border-radius: 50%;
  width: 100%;
  height: 100%;
}

@keyframes dropIn {
  0% {
    transform: translateY(-28vw); /* Start position relative to board height */
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
  animation: dropIn 2s ease-out;
}

h1,
h2,
h3 {
  padding: 0;
  margin: 0;
}
.winner-message {
  background-color: #f9f9f9; /* Light background color */
  border: 2px solid #ccc; /* Border for contrast */
  padding: 20px; /* Padding around the content */
  text-align: center; /* Center-align text */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Soft shadow for depth */
  border-radius: 8px; /* Rounded corners */
  margin: 20px auto; /* Center horizontally with some vertical margin */
  max-width: 400px; /* Example maximum width */
}

.winner-message h4 {
  margin: 0; /* Remove default margin for cleaner look */
  color: #333; /* Text color */
  font-size: 1.5rem; /* Example font size */
  letter-spacing: 2px; /* Spacing between letters */
}


</style>
