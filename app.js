function getRundomValue(min, max) {
    return Math.floor(Math.random() * (max-min)) + min;
}
 
const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            battleLog: []
        }
    },
    methods: {
        attackPlayer() {
            if(this.monsterHealth <= 0) {
                return;
            }
            const attackValue = getRundomValue(8, 15);
            this.playerHealth = this.playerHealth - attackValue;
            this.addLogMessage('monster', 'attack', attackValue);
        },
        attackMonster() {
            this.currentRound++
            const attackValue = getRundomValue(5, 12);
            this.monsterHealth = this.monsterHealth - attackValue;
            this.addLogMessage('player', 'attack', attackValue)
            this.attackPlayer();
        },
        specialAttackMonster() {
            this.currentRound++
            const attackValue = getRundomValue(20, 32);
            this.monsterHealth = this.monsterHealth - attackValue;
            this.addLogMessage('player', 'attack', attackValue)
            this.attackPlayer();
        },
        healPlayer() {
            this.currentRound++
            const healValue = getRundomValue(8, 20);
            if (this.playerHealth + healValue > 100) {
                this.addLogMessage('player', 'heal', 100 - this.playerHealth)
                this.playerHealth = 100;
            } else {
                this.playerHealth = this.playerHealth + healValue;
                this.addLogMessage('player', 'heal', healValue)
            }
            this.attackPlayer();
        },
        surrender() {
            this.winner = 'monster';
        },
        startNewGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.currentRound = 0;
            this.winner = null;
            this.battleLog = [];
        },
        addLogMessage(actionBy, actionType, actionValue) {
            this.battleLog.unshift({actionBy, actionType, actionValue});
        }
    },
    computed: {
        playerHealthBarWidth() {
            return this.playerHealth >= 0 ? `${this.playerHealth}%` :  0;
        },
        monsterHealthBarWidth() {
            return this.monsterHealth >= 0 ? `${this.monsterHealth}%` :  0;
        },
        meyUseSpecialAttack() {
            return this.currentRound % 3 !== 0;
        }
    },
    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                this.winner = 'draw';
            } else if (value <= 0) {
                this.winner = 'monster';
            }
        },
        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <= 0) {
                this.winner = 'draw';
            } else if (value <= 0) {
                this.winner = 'player';
            }
        }
    },
});
app.mount('#game')