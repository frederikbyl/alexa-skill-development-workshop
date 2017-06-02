const WELCOME_MESSAGE = 'Welcome to the High Low guessing game. You have played 0 times. Would you like to play?';
const HELP_MESSAGE = 'Would you like me to say Hello World to you?';
const EXIT_SKILL_MESSAGE = 'Thank you for trying out this skill! Goodbye!';
const START_GAME = 'Great! Try saying a number to start the game.';


const states = {
    START: '_START',
    GAME: '_GAME',
};


module.exports.handlers = {
    LaunchRequest() {
        this.handler.state = states.START;
         this.emitWithState('Start');
    },
    Unhandled() {
        this.handler.state = states.START;
        this.emitWithState('Start');
    }

};


module.exports.startHandlers = Alexa.CreateStateHandler(states.START, {
    Start() {
        this.emit(':ask', WELCOME_MESSAGE, WELCOME_MESSAGE);
    },
    'AMAZON.YesIntent': function () {
        this.handler.state = states.GAME;
        this.emitWithState('StartSafeSpele');
      
    },
    'AMAZON.NoIntent': function () {
        this.emit(':tell', 'Ok, see you next time!');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', EXIT_SKILL_MESSAGE);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', EXIT_SKILL_MESSAGE);
    },
    'AMAZON.HelpIntent': function () {
        this.emit(':ask', HELP_MESSAGE, HELP_MESSAGE);
    },
    Unhandled() {
        this.emitWithState('Start');
    },

});


module.exports.startHandlers = Alexa.CreateStateHandler(states.GAME, {
    StartSafeSpele() {
        this.emit(':ask', START_GAME, START_GAME);
    },
    
    GameIntent() {

        
        this.emit('GameIntent', () => {
            speech = `Higher ${this.attributes.helloWorldCount} times. Would you like me to say Hello World again?`;
            this.emit(':ask', speech, speech);
        });
    },
   
    Unhandled() {
        this.emitWithState('Start');
    },

});

module.exports.generalHandlers = {
    CheckSecret(callback) {
        if (typeof this.attributes.secretNumber === 'undefined') {
            this.attributes.secretNumber = 20;
        }

        this.event.request.intent.slots.number.value;
        callback();
    }};