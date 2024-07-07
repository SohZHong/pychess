<template>
    <div class="rules-section">
      <h1>Rules for PyChess</h1>
      <h2>Introduction</h2>
      <p>Welcome to PyChess! This game combines traditional chess with a unique twist: a programming knowledge challenge. Follow these rules to ensure a smooth and enjoyable experience.</p>
      <h2>Game Setup</h2>
      <ol>
        <li class="rule">
          <strong>Start a Match</strong>:
          <ul>
            <li>Enter the opponent's name in the system.</li>
            <li>The system will generate a QR code page for you to print out.</li>
          </ul>
        </li>
        <li class="rule">
          <strong>QR Codes</strong>:
          <ul>
            <li>Print the QR code page.</li>
            <li>Cut out the individual QR codes.</li>
            <li>Assign each QR code to its respective chess piece.</li>
          </ul>
        </li>
      </ol>
      <h2>Gameplay</h2>
      <ol>
        <li class="rule">
          <strong>Standard Chess Rules</strong>:
          <ul>
            <li>Play chess following the standard rules.</li>
            <li>When a piece is captured, do not remove it from the board yet.</li>
          </ul>
        </li>
        <li class="rule">
          <strong>Scanning QR Codes</strong>:
          <ul>
            <li>Once a piece is taken, scan the QR code associated with the captured piece using the system.</li>
            <li>A programming question will be displayed on the screen, but do not answer it immediately.</li>
          </ul>
        </li>
        <li class="rule">
          <strong>End of Match</strong>:
          <ul>
            <li>Continue playing until the chess game concludes with a checkmate, stalemate, or resignation.</li>
            <li>Ensure all captured pieces' QR codes have been scanned.</li>
          </ul>
        </li>
      </ol>
      <h2>Post-Match</h2>
      <ol>
        <li class="rule">
          <strong>Select the Winner</strong>:
          <ul>
            <li>After the match ends, select the winner of the chess game in the system.</li>
          </ul>
        </li>
        <li class="rule">
          <strong>Answering Questions</strong>:
          <ul>
            <li>Click the "Start Answering" button to begin answering the displayed programming questions.</li>
            <li>Submit your answers upon completion.</li>
          </ul>
        </li>
      </ol>
      <h2 class="scoring">Scoring</h2>
      <p>Points will be calculated based on the correctness of your answers to the programming questions. These points will be added to your user profile.</p>
      <h2 class="disclaimer">Disclaimer</h2>
      <p><strong>Chess and Score Systems</strong>: The chess and score systems are entirely separate. Winning the chess game determines the match's winner. The score system is a separate competition where players compete to test their knowledge of the Python programming language.</p>
      <p>By participating in this hybrid game, you agree to the rules and understand the distinction between the chess match results and the programming knowledge competition. Enjoy the challenge and may the best player win both on the board and in the coding arena!</p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'RulesView'
})
</script>
<style scoped>
.rules-section {
    padding: 3rem;
    text-align: justify;
    line-height: 2rem;
}

.rules-section > h1 {
    padding: 1rem;
    text-align: center;
}

.rules-section > h2 {
    margin: 1.5rem 0;
    text-decoration: underline;
}

.rule {
    margin: 1rem 0;
}

.rule li {
    list-style-type: decimal;
}
</style>
