import React, { useState } from 'react';

import { createStage , checkCollision} from '../gameHelpers';

//Styled components
import {StyledTetrisWrapper, StyledTetris} from './styles/StyledTetris';

//CustomHooks
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';

//Components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

const Tetris=()=>{
  const [droptime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage] = useStage(player, resetPlayer);

  console.log('re-render');

  const movePlayer = dir => {
    if (!checkCollision(player, stage, { x: dir, y: 0})) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  }

  const startGame = () => {
    //Reset everything
    setStage(createStage());
    resetPlayer();
  }

  const drop = () => {
    if (!checkCollision(player, stage, {x: 0, y: 1})) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
     } else {
      // Game over 
        if (player.pos.y < 1) {
          console.log("GAME OVER!!")
          setGameOver(true);
          setDropTime(null);
        }
      }
  }
    

  const dropPlayer = () => {
    drop();
  }

  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37) {
        movePlayer(-1);
      }
      else if (keyCode === 39) {
        movePlayer(1);
      }
      else if (keyCode === 40) {
        dropPlayer();
      } else if (keyCode == 38) {
        playerRotate(stage, 1);
      }
    }
  }

  return(
    <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)}>
			<StyledTetris>
				<Stage stage={stage}/>
					<aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" /> ) : (
						<div>
							<Display text='Score'/>
							<Display text='Rows'/>
							<Display text='Level'/>
						</div>
          )}
						<StartButton callback={ startGame } />
					</aside>
				</StyledTetris>
    </StyledTetrisWrapper>
  )
}
export default Tetris