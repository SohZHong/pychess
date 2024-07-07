<template>
    <section class="leaderboard-section">
        <div class="profile-container">
            <h1 class="highlighted">{{ user?.name }}</h1>
            <div class="match-statistics">
                <div id="match" class="statistics">
                    <h4>Matches</h4>
                    <h2 class="highlighted">{{ user?.matches }}</h2>
                </div>
                <div id="wins" class="statistics">
                    <h4>Wins</h4>
                    <h2 class="highlighted">{{ user?.wins }}</h2>
                </div>
                <div id="score" class="statistics">
                    <h4>Score</h4>
                    <h2 class="highlighted">{{ user?.score }}</h2>
                </div>
                <div id="rank" class="statistics">
                    <h4>Rank</h4>
                    <h2 class="highlighted">{{ user?.rank }}</h2>
                </div>
            </div>
        </div>
        <div class="leaderboard-container">
            <h1>Top Scorers</h1>
            <hr class="leaderboard-separator" />
            <ul class="leaderboard">
                <li v-for="user in matchStatistics?.top10" :key="user.id">
                    <span class="name">{{ user.name }}</span>
                    <span class="score">{{ user.score }}</span>
                </li>
            </ul>
        </div>
    </section>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { getLeaderboardStatistics, LeaderboardProps } from '@/api/leaderboard'
const matchStatistics = ref<LeaderboardProps>()
const user = computed(() => matchStatistics.value?.user)

onMounted(async () => {
  // Fetch leaderboard statistics
  try {
    const res = await getLeaderboardStatistics()
    const { data } = res.data
    matchStatistics.value = data
  } catch (err) {
    console.error(err)
  }
})
</script>

<style scoped>
.leaderboard-section {
    display: grid;
    grid-template-columns: 3fr 8fr;
    padding: 3rem;
    column-gap: 2rem;
}
.profile-container {
    border-radius: 10px;
    box-shadow: var(--border-light-drop-shadow);
    height: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    row-gap: 6rem;
    padding: 1rem;
}

.profile-container > h1 {
    padding: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 450px;
    font-size: calc(var(--font-size) * 2.5);
}

#match {
    grid-area: matches;
}
#wins {
    grid-area: wins
}
#score {
    grid-area: score
}
#rank {
    grid-area: rank
}
.profile-container .match-statistics {
    display: grid;
    grid-template-areas:
    'matches wins'
    'score rank';
    gap: 5rem;
}

.profile-container .match-statistics .statistics {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.25rem;
}

.profile-container .match-statistics .statistics > h4{
    font-size: var(--font-size);
}

.profile-container .match-statistics .statistics > h2 {
    font-size: calc(var(--font-size) * 2);
}

.leaderboard-container {
    padding: 0 1rem;
}

.leaderboard-container > h1 {
    font-size: calc(var(--font-size) * 2);
    text-transform: uppercase;
}

.leaderboard-container .leaderboard-separator {
    margin: 1rem 0;
}

.leaderboard > li{
    list-style-type: decimal;
    vertical-align: center;
    font-size: calc(var(--font-size) + 4px);
    margin: 1rem 0;
}
.leaderboard > li::marker {
    font-size: calc(var(--font-size) * 1.5);
    font-weight: bold;
}

.leaderboard .name {
    float: left;
    margin-left: 1rem;
}

.leaderboard .score {
    float: right;
}

@media only screen and (max-width: 1200px) {
    .leaderboard-section {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .profile-container {
        height: auto;
        flex-direction: row;
        justify-content: space-between;
        flex-wrap: wrap;
        row-gap: 2rem;
    }
    .profile-container > h1 {
        font-size: calc(var(--font-size) * 2);
    }

    .profile-container .match-statistics {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
    }

    .profile-container .match-statistics .statistics {
        gap: 1rem;
    }
}

@media only screen and (max-width: 576px) {
    .profile-container {
        justify-content: center;
        row-gap: 1rem;
    }

    .profile-container .match-statistics {
        gap: 2rem;
    }

    .profile-container .match-statistics .statistics > h4{
        font-size: calc(var(--font-size) - 2px);
    }

    .profile-container .match-statistics .statistics > h2 {
        font-size: calc(var(--font-size) * 1.5);
    }

    .leaderboard-container > h1 {
        font-size: calc(var(--font-size) * 1.5);
    }

    .leaderboard > li{
        font-size: var(--font-size);
    }
    .leaderboard > li::marker {
        font-size: calc(var(--font-size) + 2px);
        font-weight: bold;
    }
}
</style>
