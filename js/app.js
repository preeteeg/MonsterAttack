new Vue({
    el:'#app',
    data: {
        gameIsRunning: false,
        playerHealth: 100,
        monsterHealth: 100,
        message: '',
        turnsLog:[]
    },
    computed: {

    },
    watch: {},
    methods: {
        startGame: function ()
        {
            this.gameIsRunning = true
            this.playerHealth = 100
            this.monsterHealth = 100
            this.turnsLog=[]
         },
        attack: function ()
        {
            let damage = this.calculateDamage(2, 10)
            this.monsterHealth -= damage
            this.turnsLog.unshift({
                isPlayer: true,
                text: `😜 Player hits  😈Monster for ${damage}`
            })
            this.monsteraAttack()
         },
        specialAttack: function ()
        { 
            let damage = this.calculateDamage(10, 20)
            this.monsterHealth -= damage
            this.turnsLog.unshift({
                isPlayer: true,
                text: `😜Player hits  😈Monster hard for ${damage}`
            })
            this.monsteraAttack()
        },
        monsteraAttack: function ()
        {

            if (this.checkWin())
            {
                return;
            }
            let damage = this.calculateDamage(2, 10)
            this.playerHealth -= damage
            this.turnsLog.unshift({
                isPlayer: false,
                text: ` 😈 Monster hits 😜Player for ${damage}`
            })
            this.checkWin();
        },
        healMe: function ()
        {
            if (this.playerHealth <= 90)
            {
                this.playerHealth +=10
            }
            else
            {
                this.playerHealth=100
            }
            this.turnsLog.unshift({
                isPlayer: true,
                text: `😜Player get heal by 10 🤕`
            })
            this.monsteraAttack()
         },
        giveUp: function ()
        {
            this.gameIsRunning = false
            this.message="Give up the game"
        },
        calculateDamage: function (min, max)
        {
            return Math.max(Math.floor(Math.random() * max) + 1, min)   
        },
        checkWin: function ()
        {
            if (this.monsterHealth <= 0)
            {
                this.message = 'You won 😎'
                this.gameIsRunning = false
                return true
            }
            else if (this.playerHealth <= 0)
            {
                this.message = 'You lost 😓'
                this.gameIsRunning = false
                return true
            }

            return false
            
        }

    }
})