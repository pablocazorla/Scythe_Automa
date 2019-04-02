import {combineReducers} from 'redux';
import {actName} from './actions';
import {factionTypes,playerTypes,MapEmpty,/*initialMapPositions*/} from '../config';
import {cloneObject} from '../utils';
import createDeck from '../automa/deck';

const defaultView = 'NewGame'; //'Presentation';

const currentView = (state = defaultView, action) => {
  switch (action.type) {
    case actName.GOTO:
      return action.dir;
    default:
      return state;
  }
};



const players = (state = [], action) => {
  var list = [],
    currentIndex = 0;
  switch (action.type) {
    case actName.CREATE_GAME:
      list = [];
      currentIndex = 0;
      action.playerList.forEach(function (facInd, i) {
        if (facInd > 0) {
          let player = cloneObject(playerTypes[facInd]),
            faction = factionTypes[i];

          player.factionName = faction.name;
          player.power = faction.power;
          player.cards = faction.cards;
          player.money = 0;
          player.board = {
            'worker': 6,
            'mech': 4,
            'stars': 6,
            'starsByWar': 2,
            'starsByPower': 1,
            'factoryCard': true//false
          };

          list.push(player);

          // Choose a Human player to start
          if(!player.ai){
          // if (player.ai) {
            currentIndex = list.length - 1;
          }
        }
      });
      return {list,currentIndex};
    case actName.ADVANCE_PLAYER:
      let advNum = state.currentIndex + 1;
      state.currentIndex = advNum >= state.list.length ? 0 : advNum;
      return state;
    case actName.UPDATE_PLAYER:
      const {player} = action;
      var indx = -1;
      state.list.forEach((p,i) => {
        if(p.factionName === player.factionName){
          indx = i;
        }
      });
      state.list[indx] = player;
      return state;
    default:
      return state;
  }
};

const map = (state = 0, action) => {
  switch (action.type) {
    case actName.CREATE_GAME:
      let mapCreated = cloneObject(MapEmpty);

      // action.playerList.forEach(function (facInd, i) {
      //   if (facInd > 0) {
      //     const faction = factionTypes[i];
      //     const listNumArray = initialMapPositions[faction.name];

      //     mapCreated[listNumArray[0]].people.character = 1;

      //     mapCreated[listNumArray[1]].faction = faction.name;
      //     mapCreated[listNumArray[1]].people.worker = 1;

      //     mapCreated[listNumArray[2]].faction = faction.name;
      //     mapCreated[listNumArray[2]].people.worker = 1;
      //   }
      // });
      return mapCreated;
    case actName.UPDATE_MAP:
      return action.newMap;
    default:
      return state;
  }
};

const AIactions = (state = null, action) => {
  switch (action.type) {
    case actName.SET_AI_ACTIONS:
      return action.newAIactions;
    default:
      return state;
  }
};
const aiResources = (state = 0, action) => {
  switch (action.type) {
    case actName.SET_AI_ACTIONS:
      if(action.newAIactions){
        return action.newAIactions.resources;
      }else{
        return 0;
      }
    default:
      return state;
  }
};

const deck = (state = createDeck()) => {
  return state;
};

// GAME

export default combineReducers({
  currentView,
  aiResources,
  players,
  map,
  AIactions,
  deck
})