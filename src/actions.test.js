import {GENERATE_AURAL_UPDATE, generateAuralUpdate, RESTART_GAME, restartGame, MAKE_GUESS, makeGuess } from './actions';

describe('generateAuralUpdate', () => {
    it('Should generate aural update', () => {
        const action= generateAuralUpdate();
        expect(action.type).toEqual(GENERATE_AURAL_UPDATE);
    });
});

describe('restartGame', () => {
    it('Should restart game', () => {
        const correctAnswer= '20';
        const action= restartGame(correctAnswer);
        expect(action.type).toEqual(RESTART_GAME);
        expect(action.correctAnswer).toEqual(correctAnswer);
    });
});

describe('makeGuess', () => {
  it('Should make guess', () => {
      const guess = '8';
      const action = makeGuess(guess);
      expect(action.guess).toEqual(guess);
      expect(action.type).toEqual(MAKE_GUESS);
  })
})
