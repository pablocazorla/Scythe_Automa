import React, { Component } from 'react';
import {factionImg,svgPoints} from '../../config';
import {isOdd} from '../../utils';

export default class Hexagon extends Component {
  constructor(props) {
    super(props);
    const {hex,origin,destiny} = this.props;
    this.state = {
      hex,
      isOrigin: hex.num === origin,
      isDestiny: hex.num === destiny,
      withEnemies:false
    };
  }
  componentWillReceiveProps (nextProps) {
    const {hex,origin,destiny} = nextProps;
    this.setState({
      hex,
      isOrigin: hex.num === origin,
      isDestiny: hex.num === destiny,
      withEnemies: nextProps.hex.attack ? true:false
    });
  }
  render() {
    const {onClick} = this.props;

    const {hex,withEnemies,isOrigin,isDestiny} = this.state;

    const showNum_Develop = true;
    ///////////////
    const factory = hex.type === 'factory',
    encounter = hex.encounter,
    factionHeadImg = hex.type === 'head',
    factionHeadImgHref = factionHeadImg ? hex.faction:'',
    {mech,worker,character} = hex.people;
    /////////////

    var num = '' + hex.num,
      row = parseInt(num.charAt(0), 10),
      col = parseInt(num.charAt(1), 10),
      dx = 65 + (isOdd(row) ? 60 : 0) + (120 * (col - 1)),
      dy = 30 + (99 * (row - 1));


      let baseClass = 'base';
      baseClass += withEnemies ? ' withEnemies':'';
      baseClass += isOrigin ? ' origin':'';
      baseClass += isDestiny ? ' destiny':'';

    return <g transform={'translate(' + dx + ',' + dy + ')'}
      className={'hex' + (hex.type === 'head' ? '' : ' hexagon')}
    >
      <polygon className={baseClass} points={svgPoints.hexagon.points}/>
      {withEnemies ? <g className="attack" transform="translate(-1,7)">
        <path d={svgPoints.attack.points1} style={{'fill':'#fff','fillOpacity':'0.501961'}} />
        <path d={svgPoints.attack.points2} style={{'fill':'#fff'}} />
      </g>:null}

      {factory ? <g>
        <path className="factory-icon" d={svgPoints.factory.points} />
      </g>:null}
      
      {encounter ? <g>
        <circle transform="translate(50,100)" cx="10" cy="10" r="10" className="encounter-marker" />
      </g>:null}

      {factionHeadImg ? <g filter="url(#grayscale_svg)">
        <image href={factionImg[factionHeadImgHref]} width="84" height="84" x="18" y="18" />
      </g>:null}

      {hex.faction && !withEnemies ? <g className={hex.faction ? 'people ' + hex.faction : ''}>
        {mech > 0 ? <g>
          <path transform="translate(10,29)" className="mech" d={svgPoints.mech.points} />
        </g> : null}
        {character > 0 ? <g>
          <path transform="translate(34,74)" className="character" d={svgPoints.character.points} />
        </g> : null}
        {worker > 0 ? <g>
          <path transform="translate(70,30)" id="worker" d={svgPoints.worker.points} />
        </g> : null}
        {mech > 1 ? <g>
          <circle cx="48.153" cy="30.153" r="13.153" style={{'fill':'#000'}} />
          <text data-bind="text:mech" x="41.903px" y="38.274px"
            style={{
              'fontFamily': '"Arial", sans-serif',
              'fontWeight': 700,
              'fontSize': '22px',
              'fill': '#FFF'
            }}          
          >{mech}</text>
        </g> : null}
        {worker > 1 ? <g>
          <circle cx="103.153" cy="44.153" r="13.153" style={{'fill':'#000'}}  />
          <text data-bind="text:worker" x="97.05px" y="52.274px"
            style={{
              'fontFamily': '"Arial", sans-serif',
              'fontWeight': 700,
              'fontSize': '22px',
              'fill': '#FFF'
            }}
          >{worker}</text>
        </g> : null}
      </g>:null}

      {showNum_Develop ? <text x="45px" y="100px"
        style={{
          'fontFamily': '"Arial", sans-serif',
          'fontWeight': 700,
          'fontSize': '30px',
          'fill': '#000',
          'opacity':0.8
      }} >{hex.num}</text>:null}

      <polygon className="detect-click" points={svgPoints.hexagon.points} onClick={onClick}/>
    </g>;
  }
};