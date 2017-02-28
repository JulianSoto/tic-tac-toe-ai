var gameState = [[0,0,0], [0,0,0], [0,0,0]];

function IA(gameState){
  var higher = null;
  if (!gameEnded(gameState) && winner(gameState) === 0){
    for (var i = 0; i < gameState.length; i++){
      for (var j = 0; j < gameState[i].length; j++){
        if (gameState[i][j] === 0){
          var minimax = min(gameState, i, j);
          if (!higher || minimax > higher.value){
            higher = {
              i: i,
              j: j,
              value: minimax
            };
          }
        }
      }
    }

    gameState[higher.i][higher.j] = 1;
  }
}

function max(gameState, x, y){
  var higher = -1000;

  gameState[x][y] = -1;
  var win = winner(gameState);
  if (win !== 0){
    higher = win;
  } else if (gameEnded(gameState)){
    higher = 0;
  } else {
    for (var i = 0; i < gameState.length; i++){
      for (var j = 0; j < gameState[i].length; j++){
        if (gameState[i][j] === 0){
          var minimax = min(gameState, i, j);
          if (minimax > higher) higher = minimax;
        }
      }
    }
  }
  gameState[x][y] = 0;

  return higher;
}

function min(gameState, x, y){
  var lower = 1000;

  gameState[x][y] = 1;
  var win = winner(gameState);
  if (win !== 0){
    lower = win;
  } else if (gameEnded(gameState)){
    lower = 0;
  } else {
    for (var i = 0; i < gameState.length; i++){
      for (var j = 0; j < gameState[i].length; j++){
        if (gameState[i][j] === 0){
          var minimax = max(gameState, i, j);
          if (minimax < lower) lower = minimax;
        }
      }
    }
  }
  gameState[x][y] = 0;

  return lower;
}

//0 = no winner, 1 = cpu winner, -1 = human winner
function winner(state){
  for (var i = 0; i < state.length; i++){
    if (state[i][0] !== 0 && state[i][0] === state[i][1] && state[i][0] === state[i][2]){
      return state[i][0];
    }
  }
  
  for (var i = 0; i < state[0].length; i++){
    if (state[0][i] !== 0 && state[0][i] === state[1][i] && state[0][i] === state[2][i]){
      return state[0][i];
    }
  }
  
  if (state[0][0] !== 0 && state[0][0] === state[1][1] && state[0][0] === state[2][2]){
    return state[0][0];
  }
  
  if (state[0][2] !== 0 && state[0][2] === state[1][1] && state[0][2] === state[2][0]){
    return state[0][2];
  }
  
  return 0;
}

function gameEnded(state){
  for (var i = 0; i < state.length; i++){
    for (var j = 0; j < state[i].length; j++){
      if (state[i][j] === 0) return false;
    }
  }
  
  return true;
}