import rusvietImg from '../images/factions/rusviet.png';
import togawaImg from '../images/factions/togawa.png';
import crimeanImg from '../images/factions/crimean.png';
import saxonyImg from '../images/factions/saxony.png';
import polaniaImg from '../images/factions/polania.png';
import albionImg from '../images/factions/albion.png';
import nordicImg from '../images/factions/nordic.png';

export const factionImages = {
  'rusviet': rusvietImg,
  'togawa': togawaImg,
  'crimean': crimeanImg,
  'saxony': saxonyImg,
  'polania': polaniaImg,
  'albion': albionImg,
  'nordic': nordicImg
};

export default [{
  name: 'rusviet',
  power: 3,
  cards: 2,
  icon: rusvietImg
}, {
  name: 'togawa',
  power: 0,
  cards: 2,
  icon: togawaImg
}, {
  name: 'crimean',
  power: 5,
  cards: 0,
  icon: crimeanImg
}, {
  name: 'saxony',
  power: 1,
  cards: 4,
  icon: saxonyImg

}, {
  name: 'polania',
  power: 2,
  cards: 3,
  icon: polaniaImg
}, {
  name: 'albion',
  power: 3,
  cards: 0,
  icon: albionImg
}, {
  name: 'nordic',
  power: 4,
  cards: 1,
  icon: nordicImg
}];