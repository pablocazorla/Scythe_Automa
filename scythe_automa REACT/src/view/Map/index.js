import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import {I18N,Button} from '../../components';
import {Images,svgStyle,svgPoints} from '../../config';
import {cloneObject,isOdd} from '../../utils';
import Hexagon from './hexagon';

const getArrowPos = num => {
  const numStr = '' + num,  
    row = parseInt(numStr.charAt(0), 10),
		col = parseInt(numStr.charAt(1), 10),
		x = 65 + (isOdd(row) ? 60 : 0) + (120 * (col - 1)) + 60,
    y = 30 + (99 * (row - 1)) + 65;    
  return {x,y};
}

class ViewVisual extends Component {
  constructor(props) {
    super(props);

    const {players,map,AIactions} = this.props,
      currentPlayer = players.list[players.currentIndex],
      currentFaction = currentPlayer.factionName,
      isAI = currentPlayer.ai ? true:false;

     

    const visibleArrow = AIactions && AIactions.move ? true : false;
    let arrowTransform = '';

    if(visibleArrow){
      const oPos = getArrowPos(AIactions.move.origin),
        dPos = getArrowPos(AIactions.move.destiny),
        xd = oPos.x - dPos.x,
        yd = oPos.y - dPos.y,
        long = Math.sqrt((xd * xd) + (yd * yd)) / 100,
        dAng = xd < 0 ? 180 : 0,
        ang = (Math.atan(yd / xd) * 180 / Math.PI) + dAng;

      arrowTransform = 'translate(' + dPos.x + ',' + dPos.y + ') rotate(' + ang + ') scale(' + long + ',.7)';
    }

    this.state = {
      map,
      isAddAction:false,
      undoChangesEnabled:false,
      visibleArrow,
      arrowTransform,
      selectedUnit: 'worker',
      disabledCharacter: false,
      movingUnit: null,
      currentFaction,
      isAI,
      AIactions,
      mapCursorPosition:{x:0,y:0}
    };

    this.origMovementNum = null;
    this.originalMap = cloneObject(map);

    this.mapContainer = null;

    this.toggleAction = this.toggleAction.bind(this);
    this.selectUnitToAction = this.selectUnitToAction.bind(this);
    this.clickHexagon = this.clickHexagon.bind(this);
    this.resetMap = this.resetMap.bind(this);
    this.continueAction = this.continueAction.bind(this);
    this.mouseDown = this.mouseDown.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
    this.makeAImovement = this.makeAImovement.bind(this);
  }
  componentDidMount(){
    window.addEventListener('mousedown', this.mouseDown,false);
    window.addEventListener('mousemove', this.mouseMove,false);
  }
  componentWillUnmount() {
    window.removeEventListener('mousedown', this.mouseDown);
    window.removeEventListener('mousemove', this.mouseMove);
  }
  mouseDown(e){
    const x = e.pageX - this.mapContainer.getBoundingClientRect().left - 16,
      y = e.pageY - this.mapContainer.getBoundingClientRect().top  - 16;
    this.setState({
      mapCursorPosition:{x,y}
    });		
  }
  mouseMove(e){
    if (this.state.movingUnit) {
			const x = e.pageX - this.mapContainer.getBoundingClientRect().left - 16,
				y = e.pageY - this.mapContainer.getBoundingClientRect().top  - 16;
      this.setState({
        mapCursorPosition:{x,y}
      });
		}
  }  
  resetMap(){
    if(!this.state.movingUnit){
      this.setState({
        map: cloneObject(this.originalMap),
        undoChangesEnabled: false
      });
    }    
  }
  toggleAction(){
    if(!this.state.movingUnit){
      const newAction = !this.state.isAddAction;
      this.setState({
        isAddAction: newAction,
        disabledCharacter: newAction
      });
      if(newAction && this.state.selectedUnit === 'character'){
        this.selectUnitToAction('worker');
      }
    }
  }
  selectUnitToAction(unit){
    if(!this.state.movingUnit){
      if(unit === 'character' && this.state.disabledCharacter){
        //
      }else{
        this.setState({
          selectedUnit: unit
        });
      }
    }  
  }
  clickHexagon(num){
    const {isAI,isAddAction,map,currentFaction,selectedUnit,movingUnit} = this.state;

    // Only for Human player
    if(!isAI){
      if(isAddAction){
        //Add
        if(map[num].faction === null || map[num].faction === currentFaction ){
          map[num].people[selectedUnit]++;
          map[num].faction = currentFaction;
          this.setState({
            map,
            undoChangesEnabled:true
          });
        }
      }else{
        //Move
        if(movingUnit){
          // place a unit
          if(map[num].faction === null || map[num].faction === currentFaction ){
            map[num].people[movingUnit]++;
            map[num].faction = currentFaction;
            this.setState({
              movingUnit: null,
              map,
              undoChangesEnabled:true
            });
          }else{
            // Is an attack ?
            if(movingUnit === 'worker' || map[num].type === 'head'){
              // Undone movement
              if(this.origMovementNum){
                //re-place unit
                //console.log(this.origMovementNum);

                map[this.origMovementNum].people[movingUnit]++;
                map[this.origMovementNum].faction = currentFaction;
                this.origMovementNum = null;

                this.setState({
                  movingUnit: null,
                  map,
                  undoChangesEnabled:true
                });
              }
            }else{
              // ATTACK
              if(!map[num].attack){
                map[num].attack = {faction: currentFaction};
              }
              if(!map[num].attack[movingUnit]){
                map[num].attack[movingUnit] = 1;
              }else{
                map[num].attack[movingUnit] += 1;
              }
              this.setState({
                movingUnit: null,
                map,
                undoChangesEnabled:true
              });         
            }
          }
        }else{
          // Take a unit
          if(map[num].faction === currentFaction && map[num].people[selectedUnit] > 0){
            map[num].people[selectedUnit]--;

            this.origMovementNum = num;

            // if empty map
            if(map[num].people.worker === 0 && map[num].people.mech === 0 && map[num].people.character === 0 && map[num].type !== 'head' ){
              map[num].faction = null;
            }
            this.setState({
              movingUnit: selectedUnit,
              map
            });
          }
        }
      }
    }    
  }
  makeAImovement(){
    const {map,AIactions,currentFaction} = this.state;
    if(AIactions && AIactions.move){
      const {origin,destiny,type} = AIactions.move;

      // take the unit
      map[origin].people[type]--;

      // if empty map
      if(map[origin].people.worker === 0 && map[origin].people.mech === 0 && map[origin].people.character === 0 && map[origin].type !== 'head' ){
        map[origin].faction = null;
      }

      // place the unit
      if(map[destiny].faction === null || map[destiny].faction === currentFaction ){
        // Movement
        map[destiny].people[type]++;
        map[destiny].faction = currentFaction;
      }else{
        // ATTACK
        if(!map[destiny].attack){
          map[destiny].attack = {faction: currentFaction};
        }
        if(!map[destiny].attack[type]){
          map[destiny].attack[type] = 1;
        }else{
          map[destiny].attack[type] += 1;
        }
      }
      this.setState({
        map
      });
    }
  }
  continueAction(){
    if(!this.state.movingUnit){
      if(this.state.isAI){
        this.makeAImovement();
      }
      const {map} = this.state;
      let attack_workers = false,
        attack_war = false;

      let characterHexEncounter = false;
      let characterHexFactory = false;

      for(var num in map){
        if(map[num].attack){
          if(map[num].people.mech === 0 && map[num].people.character === 0){
            // Attack workers
            attack_workers = true;
          }else{
            // Attack war
            attack_war = true;
          }
        }
        // Character
        if(map[num].people.character > 0){
          if(map[num].encounter){
            characterHexEncounter = true;
            map[num].encounter = false;
          }
          if(map[num].type === 'factory'){
            characterHexFactory = true;
          }
        }
      }

      this.props.updateMap(cloneObject(map));

      if(attack_workers){
        this.props.goTo('AttackWorker');
      }else{
        if(attack_war){
          console.log('attack_war');
          //this.props.goTo('AttackWar');
        }else{          
          // comprobar character
          if(characterHexEncounter){
            this.props.goTo('Encounter');            
          }else if(characterHexFactory){
            console.log('Factory');
          }else{
            if(this.state.isAI){
              if(this.state.AIactions.gain){
                this.props.goTo('AIresources');
              }else if(this.state.AIactions.recruit){
                this.props.goTo('AIrecruit');
              }else{
                // advance?
              }          
            } else{          
              this.props.goTo('StartHuman');
            }
          }
        }
      }
    }
  }
  render() {

    const {
      map,
      isAddAction,
      undoChangesEnabled,
      visibleArrow,
      arrowTransform,
      selectedUnit,
      disabledCharacter,
      movingUnit,
      currentFaction,
      isAI,
      AIactions,
      mapCursorPosition
    } = this.state;

    let mapArray = [];

    for(var a in map){
      mapArray.push(map[a]);
    }

    const txt_lead_1 = isAI ? 'Move the %faction %unit from/to the selected territory.':'Move your pieces by selecting in map,',
      txt_lead_2 = isAI ? '':'or add new pieces';

      const textleadStyle = isAI ? {'margin':'0 auto 8px','maxWidth':'240px'} : {'margin':'0 auto 8px'};


    return <div style={{'height':'100%','position':'relative'}} ref={el => {this.mapContainer = el;}}>    
      <div className="container">
        {isAI? <div className="ai-selected-unit-map" >
          <svg className={currentFaction} width="100%" height="100%" viewBox="0 0 45 52" style={svgStyle}>
            <path transform="translate(4,5)"  d={AIactions && AIactions.move ? svgPoints[AIactions.move.type].points : ''} />
          </svg>
        </div>:null}
        <p className="lead align-center" style={textleadStyle}>
          <I18N id={txt_lead_1} replaceText={{
            '%faction':currentFaction,
            '%unit': AIactions && AIactions.move ? AIactions.move.type : ''
          }}/>
          <br/>
          <I18N id={txt_lead_2}/>
        </p>
        <div className="map-container">
          <div className="map-container-cont">
          <img src={Images['mapbackrivers']} className="map-back-rivers" alt=""/>
            <svg viewBox="0 0 1080 990" style={svgStyle}>
              <defs>
                <filter id="grayscale_svg">
                  <feColorMatrix in="SourceGraphic" type="matrix" values="0.39 0.769 0.189 0  0 0.349 0.686 0.168 0  0 0.272 0.534 0.131 0  0 0  0 0 1  0"
                  />
                </filter>
                <linearGradient id="arrowGradient" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse" gradientTransform="matrix(100,0,0,60,0,-1.13687e-13)">
                  <stop offset="0" style={{'stopColor':'#51f70f','stopOpacity':'1'}} />
                  <stop offset="1" style={{'stopColor':'#39c900','stopOpacity':'1'}}/>
                </linearGradient>
              </defs>
              <g>
                {mapArray.map((hex,i)=>{
                  return <Hexagon
                    hex={hex}
                    key={i}
                    onClick={() => {this.clickHexagon(hex.num)}}
                    origin={AIactions && AIactions.move ? AIactions.move.origin : 0}
                    destiny={AIactions && AIactions.move ? AIactions.move.destiny : 0}
                  />;
                })}                
              </g>

              {visibleArrow ? <g className="map-arrow" transform={arrowTransform}>
                <g transform="translate(0,10)">
                  <path d="M14.504,12.65l0,17.35l-14.504,-30l14.504,-30l0,17.35l85.496,0l0,25.3l-85.496,0Z"
                  style={{'fill':'rgba(0, 0, 0, 0.4)'}}
                  />
                </g>
                <path d="M14.504,12.65l0,17.35l-14.504,-30l14.504,-30l0,17.35l85.496,0l0,25.3l-85.496,0Z"
                style={{'fill':'url(#arrowGradient)'}}
                />
                <path d="M14.504,-12.65l85.496,0l0,25.3l-85.496,0l0,17.35l-14.504,-30l14.504,-30l0,17.35Zm-12.838,12.65l11.338,23.451l0,-12.301l85.496,0l0,-22.3l-85.496,0l0,-12.301l-11.338,23.451Z"
                  style={{'fill':'#268700'}} />
              </g> : null}
            </svg>

            {!isAI ? <div className="map-human-options">
              <div className={'map-human-undo'+ (undoChangesEnabled ? ' enabled':'')}
                onClick={this.resetMap}
              >
                <i className="fa fa-undo" aria-hidden="true"></i>
                <span>Undo all changes</span>
              </div>
              <div className="map-human-pan">
                <div className="map-op-selector" onClick={this.toggleAction}>
                  <I18N id={isAddAction ? 'Add':'Move'}/>
                  <i className="fa fa-caret-down" aria-hidden="true"></i>
                </div>
                <div className={'map-op-ic' + (selectedUnit === 'worker' ? ' selected':'')}
                  onClick={()=>{this.selectUnitToAction('worker')}}>
                  <svg className={currentFaction} width="100%" height="100%" viewBox="0 0 45 52" style={svgStyle}>
                    <path transform="translate(4,5)" d={svgPoints.worker.points} />
                  </svg>
                </div>
                <div className={'map-op-ic' + (selectedUnit === 'mech' ? ' selected':'')}
                  onClick={()=>{this.selectUnitToAction('mech')}}
                >
                  <svg className={currentFaction} width="100%" height="100%" viewBox="0 0 45 52" style={svgStyle}>
                    <path transform="translate(2,0)" d={svgPoints.mech.points} />
                  </svg>
                </div>
                <div className={'map-op-ic' + (selectedUnit === 'character' ? ' selected':'') + (disabledCharacter ? ' disabled':'')}
                onClick={()=>{this.selectUnitToAction('character')}}
                >
                  <svg className={currentFaction} width="100%" height="100%" viewBox="0 0 45 52" style={svgStyle}>
                    <path d={svgPoints.character.points} />
                  </svg>
                </div>
              </div>
            </div>:null}
          </div>
        </div>        
        <Button onClick={this.continueAction}>
          <I18N id="Continue"/>
        </Button>
      </div>
      <div id="map-cursor"
          style={{
            'top': mapCursorPosition.y + 'px',
            'left': mapCursorPosition.x + 'px'
          }}
        >
          {movingUnit ? <div className="map-cursor-svg">
            <svg className={currentFaction} width="100%" height="100%" viewBox="0 0 45 52" style={svgStyle}>
              {movingUnit === 'mech' ? <g>
                <path d={svgPoints.mech.points}/>
              </g>:null}
              {movingUnit === 'worker' ? <g>
                <path d={svgPoints.worker.points}/>
              </g>:null}
              {movingUnit === 'character' ? <g>
                <path d={svgPoints.character.points}/>
              </g>:null}
            </svg>
          </div>:null}
        </div>
    </div>;
  }
}

// REDUX ****************************************/

function mapStateToProps(state) {
  const {map,players,AIactions} = state;
  return {
    map,
    players,
    AIactions
  };
}

const {
  goTo,
  updateMap,
} = actions;

const mapDispatchToProps = dispatch => {
  return {
    goTo: (dir) => {
      dispatch(goTo(dir))
    },
    updateMap: (newMap) => {
      dispatch(updateMap(newMap))
    }
  };
};

const View = connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewVisual);

export default View;