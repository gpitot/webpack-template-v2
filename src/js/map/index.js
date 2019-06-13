import Tile from '../tile'

class Map {
    constructor({dimensions, parentEl, destroyCallback}) {
        if (!parentEl) return;

        this.parent = {
            element : parentEl,
            dimensions : parentEl.getBoundingClientRect()
        }

        this.destroyCallback = destroyCallback;

        this.tileConfig = {
            size : this.getTileSize(dimensions),
            dimensions : dimensions,
            margin : 1
        }
        if (this.tileConfig.size <= 10) {
            this.tileConfig.margin = 0;
        }

        this.animating = false;
        this.activeSquare = null;
        this.lastDestroyed = null;
        
        this.map = this.setUpMap();
        this.drawMap();
        this.makeMove();


        this.parent.element.addEventListener('click', this.handleClick);
        
    }

    handleClick = (e) => {
        //check to see what tile has been clicked
        if (this.animating) return;

        const {
            pageX, pageY
        } = e;
        const col = Math.floor((pageX - this.parent.dimensions.left) / (this.tileConfig.size));
        const row = Math.floor((pageY - this.parent.dimensions.top) / (this.tileConfig.size));
        
        //CHECK BOUNDS
        if (col >= this.map.length || row >= this.map[0].length) return;

        if (this.activeSquare) {
            //reset
            this.activeSquare.tile.active = false;
            this.activeSquare.tile.draw();
            //check tiles are adjacent
            if (this.tilesAreAdjacent(this.activeSquare.coords, {x : col, y : row})) {
                this.animating = true;
                
                this.swapTiles(this.activeSquare.coords, {x : col, y : row})
                this.activeSquare = null;
                return;
            }
        }
        
        this.activeSquare = {
            tile : this.map[col][row],
            coords : {
                x : col,
                y : row
            }
        }
        this.activeSquare.tile.active = true;
        this.activeSquare.tile.draw();
        
        
    }

    tilesAreAdjacent = (coord1, coord2) => {
        //checks if tiles are next to eachother 
        return (Math.abs(coord1.x - coord2.x) < 2 && Math.abs(coord1.y - coord2.y) < 2) && !(Math.abs(coord1.x - coord2.x) === 1 && Math.abs(coord1.y - coord2.y) === 1);
    }


    swapTiles = (tile1, tile2) => {
        //check if tiles are 3 in a row
        //yes
        //do animation
        //swap tiles
        //thos/makeMove
       

        //no
        //fake swap animation
        //reset

     
        const temp = this.map[tile1.x][tile1.y];
        this.map[tile1.x][tile1.y] = this.map[tile2.x][tile2.y];
        this.map[tile2.x][tile2.y] = temp; 
        this.drawMap();
       
       
        
        const willDestroy = this.checkTilesForDestroy(this.map);
        this.animating = false;
        if (willDestroy) {
            //swap tiles
            //futureBoard[tile1.config.y][tile1.config.x] = tile2;  
            this.lastDestroyed = temp.config;
            //swap image on half page
            this.destroyCallback(temp.config);
            this.makeMove();
            
        } else {
            //do fake swap animation


            //reset tiles
            setTimeout(()=>{
                this.map[tile2.x][tile2.y] = this.map[tile1.x][tile1.y];
                this.map[tile1.x][tile1.y] = temp;
                this.drawMap();
            },400)
            
            
        }

        
        
    }

    getTileSize = ({rows, cols}) => {
        //get smaller of width / cols and height / rows
        return (
            this.parent.dimensions.width / cols > this.parent.dimensions.height / rows ? 
            Math.floor(this.parent.dimensions.height / rows) 
            : 
            Math.floor(this.parent.dimensions.width / cols) 
        )
    }

    setUpMap = () => {

        const {rows, cols} = this.tileConfig.dimensions;
        const tileSize = this.tileConfig;
        

        let map = [];
        for (let x=0; x<cols; x+=1) {
            let row = [];
            for (let y=0; y<rows; y+=1) {

                row.push(new Tile({
                    parent : this.parent,
                    tileSize,
                    x,
                }));
            }
            map.push(row);
        }
        return map;
    }


    drawMap = () => {
        for (let x=0; x<this.map.length; x+=1) {
            for (let y=0; y<this.map[x].length; y+=1) {
                this.map[x][y].draw(x, y);
            }
        }
    }


    checkTilesForDestroy = (map) => {
        let willDestroy = false;
        let currentType = null;
        let destroyInOrderCount = 0; //if this gets to 3 then last 3 are destroyed
       
        //check rows
        for (let row=0;row<map.length;row+=1) {
            for (let col=0;col<map[row].length;col+=1) {
                if (map[row][col].config.id === currentType) {
                    destroyInOrderCount += 1;
                    
                    if (destroyInOrderCount === 2) {
                        //row of 3
                        //set last 3 to destroyed = true
                        map[row][col].destroyed = true;
                        map[row][col-1].destroyed = true;
                        map[row][col-2].destroyed = true;
                        willDestroy = true;

                    } else if (destroyInOrderCount > 2) {
                        //set current to destroyed = true
                        map[row][col].destroyed = true;
                    }

                } else {
                    currentType = map[row][col].config.id;
                    destroyInOrderCount = 0;
                }
            }
            //reset at end of row
            currentType = null;
            destroyInOrderCount = 0;
        }


        //check columns
        currentType = null;
        destroyInOrderCount = 0;
        for (let col=0;col<map[0].length;col+=1) {
            for (let row=0;row<map.length;row+=1) {
                if (map[row][col].config.id === currentType) {
                    destroyInOrderCount += 1;
                    
                    if (destroyInOrderCount === 2) {
                        //row of 3
                        //set last 3 to destroyed = true
                        map[row][col].destroyed = true;
                        map[row-1][col].destroyed = true;
                        map[row-2][col].destroyed = true;
                        willDestroy = true;

                    } else if (destroyInOrderCount > 2) {
                        //set current to destroyed = true
                        map[row][col].destroyed = true;
                    }

                } else {
                    currentType = map[row][col].config.id;
                    destroyInOrderCount = 0;
                }
            }
            //reset at end of row
            currentType = null;
            destroyInOrderCount = 0;
        }


        return willDestroy;

    }


    removeDestroyedTiles = () => {
        const map = this.map;
        const tileSize = this.tileConfig;
        
        for (let x=0; x<this.map.length; x+=1) {
            let colTilesDestroyed = 0;
            for (let y=this.map[x].length-1; y>=0; y-=1) {
                if (map[x][y].destroyed) {
                    map[x][y].destroyElement();
                    map[x].splice(y, 1);
                    colTilesDestroyed += 1;
                    
                }
            }

            for (let i=0; i<colTilesDestroyed; i+=1) {
                map[x].unshift(new Tile({
                    parent : this.parent,
                    tileSize,
                    x,
                }))
            }
        }

        this.makeMove();
    }



    makeMove = () => {
        if (this.checkTilesForDestroy(this.map)) {
            setTimeout(()=> {
                this.drawMap();
                this.removeDestroyedTiles();
                setTimeout(this.drawMap, 300);
            }, 100);
        } 
    }
}

export default Map;