import reducer from './reducer'
import {GENERATE_AURAL_UPDATE, generateAuralUpdate, RESTART_GAME, restartGame, MAKE_GUESS, makeGuess } from './actions';

describe('reducer', () => {
    const guesses= [1,2,6];
    const feedback= 'You are hot!';
    const auralStatus= '';
    const correctAnswer= 10;

    it('Should set initial state when starting the game', () => {
        const state= reducer(undefined,{type: '_UNKNOWN'});
        expect(state.guesses).toEqual([]);
        expect(state.feedback).toEqual('Make your guess!');
        expect(state.auralStatus).toEqual('');
        expect(state.correctAnswer).toBeGreaterThanOrEqual(0);
        expect(state.correctAnswer).toBeLessThanOrEqual(100)
    });

    it('Should return the current state on an unknown action', () => {
        let currentState= {};
        const state= reducer(currentState, {type: '_UNKNOWN'});
        expect(state).toBe(currentState)
    });

    describe('restartGame', () => {
        it('Should restart game', () => {
            let state;
            state= reducer(state, restartGame(correctAnswer));
            expect(state.guesses).toEqual([]);
            expect(state.feedback).toEqual('Make your guess!');
            expect(state.auralStatus).toEqual('');
            expect(state.correctAnswer).toBeGreaterThanOrEqual(0);
            expect(state.correctAnswer).toBeLessThanOrEqual(100)
        });
    });

    describe('makeGuess', () => {
        it('Should make a guess', () => {
            // Fix the correct answer so we know what we're aiming for
            let state = {
                guesses: [],
                feedback: '',
                correctAnswer: 100
            };

            state = reducer(state, makeGuess(25));
            expect(state.guesses).toEqual([25]);
            expect(state.feedback).toEqual("You're Ice Cold...");

            state = reducer(state, makeGuess(60));
            expect(state.guesses).toEqual([25, 60]);
            expect(state.feedback).toEqual("You're Cold...");

            state = reducer(state, makeGuess(80));
            expect(state.guesses).toEqual([25, 60, 80]);
            expect(state.feedback).toEqual("You're Warm.");

            state = reducer(state, makeGuess(95));
            expect(state.guesses).toEqual([25, 60, 80, 95]);
            expect(state.feedback).toEqual("You're Hot!");

            state = reducer(state, makeGuess(100));
            expect(state.guesses).toEqual([25, 60, 80, 95, 100]);
            expect(state.feedback).toEqual('You got it!');
        });
    });

    it('Should give aural update', () => {
        let state = {
            guesses: [7,8],
            feedback: "You're Cold.",
            correctAnswer: 100 ,
            auralStatus: ''
        };
        state = reducer(state, generateAuralUpdate());
        expect(state.auralStatus).toEqual("Here's the status of the game right now: You're Cold. You've made 2 guesses. In order of most- to least-recent, they are: 8, 7")
    })

});