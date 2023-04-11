<template>
  <div class="card flex justify-content-center">
    <h3>FOOSE</h3>
    <div v-if="!players.length">Please add new players to get started!</div>
    <br />
    <button @click="showAdd()">Add a new player</button>
    <br />
    <div v-if="showAddPlayer">
      <br />
      <form class="form">
        <input
          class="input"
          v-model.trim="name"
          type="text"
          name="name"
          placeholder="Player name"
        />
        <br />
        <input
          class="input"
          v-model.number="wins"
          type="number"
          placeholder="Player wins"
        />
        <br />
        <input
          class="input"
          v-model.number="losses"
          type="number"
          placeholder="Player losses"
        />
        <br />
        <input
          class="input"
          v-model.number="goalieShots"
          type="number"
          placeholder="Player goalie shots"
        />
        <br />
        <input
          class="input"
          v-model.number="shots"
          type="number"
          placeholder="Player shots scored"
        />
        <br />
        <input
          class="input"
          v-model.number="skunk"
          type="number"
          placeholder="Enter skunks"
        />
        <br />
        <select v-model="team" placeholder="Select team">
          <option disabled value>Select Team</option>
          <option>Red Team</option>
          <option>Blue Team</option>
        </select>
        <br />
        <br />
        <button class="submit-button" @click="addPlayer">Submit Player</button>
      </form>
    </div>
    <br />
    <div v-if="!!players.length" class="player-container">
      <table>
        <tr>
          <th>Player Name</th>
          <th>Wins</th>
          <th>Losses</th>
          <th>Goalie Shots Scored</th>
          <th>Shots Scored</th>
          <th>SKUNKS</th>
          <th>Percentage Won</th>
          <th>Remove</th>
        </tr>
        <tr v-for="(player, i) in players" :key="player._id">
          <td>{{ player.name }}</td>
          <td>
            {{ player.wins }}
            <PlusIcon title="Add wins" @click="player.wins++" />
            <MinusIcon title="Substract wins" @click="player.wins--" />
          </td>
          <td>
            {{ player.losses }}
            <PlusIcon title="Add losses" @click="player.losses++" />
            <MinusIcon title="Substract losses" @click="player.losses--" />
          </td>
          <td>
            {{ player.goalieShots }}
            <PlusIcon title="Add goalie shots" @click="player.goalieShots++" />
            <MinusIcon
              title="Substract goalie shots"
              @click="player.goalieShots--"
            />
          </td>
          <td>
            {{ player.shots }}
            <PlusIcon title="Add shots" @click="player.shots++" />
            <MinusIcon title="Substract shots" @click="player.shots--" />
          </td>
          <td>
            {{ player.skunk }}
            <PlusIcon title="Add skunks" @click="player.skunks++" />
            <MinusIcon title="Substract skunks" @click="player.skunks--" />
          </td>
          <td>{{ getPercentage(player.wins, player.losses) }}%</td>
          <td>
            <DeleteIcon
              title="Delete Player"
              @click="removePlayer(player, i)"
            />
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import DeleteIcon from "vue-material-design-icons/Delete.vue";
import PlusIcon from "vue-material-design-icons/Plus.vue";
import MinusIcon from "vue-material-design-icons/Minus.vue";

export default {
  name: "App",
  data() {
    return {
      players: [],
      currentPlayer: {},
      name: "",
      wins: null,
      losses: null,
      goalieShots: null,
      shots: null,
      skunk: null,
      team: "",
      showAddPlayer: false,
      totalGames: null,
    };
  },
  async mounted() {
    const response = await axios.get("api/playerList/");
    this.players = response.data;
  },
  methods: {
    async addPlayer(e) {
      e.preventDefault();
      const response = await axios.post("api/playerList/", {
        name: this.name,
        wins: this.wins,
        losses: this.losses,
        goalieShots: this.goalieShots,
        shots: this.shots,
        skunk: this.skunk,
        team: this.team,
      });
      this.showAddPlayer = false;
      this.totalGames = response.data.wins + response.data.losses;
      this.players.push(response.data);
      this.name = "";
      this.wins = 0;
      this.losses = 0;
      this.goalieShots = 0;
      this.shots = 0;
      this.skunk = 0;
      this.team = "";
      this.percentageWon = 0;
    },
    async removePlayer(player, i) {
      await axios.delete("api/playerList/" + player._id);
      this.players.splice(i, 1);
    },
    async editPlayer(player) {
      await axios.put("api/playerList/" + player._id, player);
    },
    async showAdd() {
      this.showAddPlayer = true;
    },
    getPercentage(wins, losses) {
      const total = wins + losses;
      return ((wins / total) * 100).toFixed(2);
    },
  },
  components: {
    DeleteIcon,
    PlusIcon,
    MinusIcon,
  },
};
</script>

<style>
table {
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: center;
  padding: 8px;
  width: 100%;
}

input,
select {
  border-bottom: 1px solid;
  padding: 1rem;
}
</style>
