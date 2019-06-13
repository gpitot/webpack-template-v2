import tileOptions from './tile-options';

class Tile {
    constructor({parent, tileSize, x}) {
        this.parent = parent;
        this.config = {
            ...this.getRandomTile(),
            ...tileSize,
            coords : {
                x : x * tileSize.size,
                y : null
            },
        }
        this.active = false;

        this.createElement();
    }

    getRandomTile = () => {
        return tileOptions[Math.floor(Math.random() * tileOptions.length)];
    }

    

    createElement = () => {
        const el = document.createElement('div');
        el.classList.add('tile');
        el.style.width = (this.config.size - (this.config.margin * 2)) + 'px';
        el.style.height = (this.config.size - (this.config.margin * 2)) + 'px';
        el.style.backgroundImage = `url(${this.config.image})`;
        el.style.top = "-999px";
        el.style.left = `${this.config.coords.x}px`;
        this.el = el;
        this.parent.element.appendChild(el);
    }

    startDestroyAnimation = () => {
        //do animation
        this.el.classList.add('destroy');
    }

    destroyElement = () => {
        
        //delete node
        setTimeout(() => {
            this.el.parentNode.removeChild(this.el);
        }, 400);
        
        
    }

    draw = (x=null, y=null) => {
       
        if (x!==null && y!==null) {
            this.el.style.top = `${(y * this.config.size)+ this.config.margin}px`;
            this.el.style.left = `${(x * this.config.size)+ this.config.margin}px`;
            // this.el.style.top = `${y * (this.config.size - this.config.margin)}px`
            // this.el.style.left = `${x * (this.config.size - this.config.margin)}px`;
        }
        
        
        if (this.destroyed) {
            this.startDestroyAnimation();
        }

        if (this.active) {
            this.el.classList.add('active');
        } else if (this.el.classList.contains('active')) {
            this.el.classList.remove('active');
        }

        this.config.coords = {
            x, y
        }
    }
}

export default Tile;