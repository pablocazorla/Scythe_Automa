export const actName = {
  GOTO: 'GOTO',
  CREATE_GAME: 'CREATE_GAME',
  ADVANCE_PLAYER: 'ADVANCE_PLAYER',
  UPDATE_MAP: 'UPDATE_MAP',
  SET_AI_ACTIONS: 'SET_AI_ACTIONS',
  UPDATE_PLAYER: 'UPDATE_PLAYER'
};

export default {
  goTo: dir => ({
    type: actName.GOTO,
    dir
  }),
  createGame: playerList => ({
    type: actName.CREATE_GAME,
    playerList
  }),
  advancePlayer: playerList => ({
    type: actName.ADVANCE_PLAYER
  }),
  updatePlayer: player => ({
    type: actName.UPDATE_PLAYER,
    player
  }),
  updateMap: newMap => ({
    type: actName.UPDATE_MAP,
    newMap
  }),
  setAIactions: newAIactions => ({
    type: actName.SET_AI_ACTIONS,
    newAIactions
  }),
};