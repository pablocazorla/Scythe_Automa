import factions_config, {factionImages} from './factions';
import players_config from './players';
import images_config from './images';
import map_config,{initialMap} from './map';
import svg_config,{svgStyle_config} from './svg';


export const factionImg =  factionImages;
export const factionTypes =  factions_config;
export const playerTypes =  players_config;
export const Images =  images_config;
export const MapEmpty =  map_config;
export const initialMapPositions =  initialMap;
export const svgStyle =  svgStyle_config;
export const svgPoints =  svg_config;

export const defaultGame = [5,0,1,0,0,0,0];


export default {
  factionImg,
  factionTypes,
  playerTypes,
  Images,
  defaultGame,
  MapEmpty,
  initialMapPositions
};