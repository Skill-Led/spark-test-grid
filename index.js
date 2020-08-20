$( document ).ready(function() {
   
    function minWalk(gridList, startX, startY, endX, endY) {
  
      const walkMinGrid = gridList.map(rowString => rowString.split(''));
      
      let currentStep = 1;
  
      const markNearestCells = (cellRow, cellColumn) => {
        const isFirstGridRow = cellRow === 0;
        const isLastGridRow = cellRow === (walkMinGrid.length-1);
  
        const isFirstGridColumn = cellColumn === 0;
        const isLastGridColumn = cellColumn === (walkMinGrid[cellRow].length-1);
      
        const isEmptyCell = (row, column) => walkMinGrid[row][column] === '.';
  
        //top step
        if(!isFirstGridRow && isEmptyCell(cellRow-1,cellColumn)) {
          walkMinGrid[cellRow-1][cellColumn] = currentStep;
        }
  
        //top-right step
        if(!isFirstGridRow && !isLastGridColumn && isEmptyCell(cellRow-1,cellColumn+1)) {
          walkMinGrid[cellRow-1][cellColumn+1] = currentStep;
        }
  
        //right step
        if(!isLastGridColumn && isEmptyCell(cellRow,cellColumn+1)) {
          walkMinGrid[cellRow][cellColumn+1] = currentStep;
        }
  
        //bottom-right step
        if(!isLastGridColumn && !isLastGridRow && isEmptyCell(cellRow+1,cellColumn+1)) {
          walkMinGrid[cellRow+1][cellColumn+1] = currentStep;
        }
  
        //bottom step
        if(!isLastGridRow && isEmptyCell(cellRow+1,cellColumn)) {
          walkMinGrid[cellRow+1][cellColumn] = currentStep;
        }
  
        //bottom-left step
        if(!isLastGridRow && !isFirstGridColumn && isEmptyCell(cellRow+1,cellColumn-1)) {
          walkMinGrid[cellRow+1][cellColumn-1] = currentStep;
        }
  
        //left step
        if(!isFirstGridColumn && isEmptyCell(cellRow,cellColumn-1) ) {
          walkMinGrid[cellRow][cellColumn-1] = currentStep;
        }
  
        //top-left step
        if(!isFirstGridRow && !isFirstGridColumn && isEmptyCell(cellRow-1, cellColumn-1)) {
          walkMinGrid[cellRow-1][cellColumn-1] = currentStep;
        }
      }
   
      walkMinGrid[startX][startY] = 0;
  
      while(walkMinGrid[endX][endY] === '.') {
        let hasPrevStepCells = false;
     
        for(let gridRow=0; gridRow<walkMinGrid.length; gridRow++) {
          for(let gridColumn=0; gridColumn<walkMinGrid[gridRow].length; gridColumn++){
            if(walkMinGrid[gridRow][gridColumn] === currentStep-1 ) {
              markNearestCells(gridRow,gridColumn);
              hasPrevStepCells=true;
            }
          }
        }
  
         if(!hasPrevStepCells) {
          return 'there are no way to the endpoint';
         }
        currentStep+=1;
      }
      
      return walkMinGrid[endX][endY];
    }
  
    const result = minWalk(
      [
        '.X.',
        '.X.',
        '...',
      ], 
      2, 1,
      0, 2
    );
  
    $('#result').text(result);
  });