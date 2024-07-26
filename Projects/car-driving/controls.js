class Controls{
    constructor(type){
        this.forward = false;
        this.reverse = false;
        this.right = false;
        this.left = false;

        switch(type) {
            case "MAIN":
                this.#addKeyboardListener();
                break;
            case "NPC":
                this.forward = true;
                break;
        }
        
    }
    #addKeyboardListener(){
        document.onkeydown = (event) => {
            switch(event.key){
                case "ArrowUp":
                    this.forward = true;
                    break;
                case "ArrowRight":
                    this.right = true;
                    break;
                case "ArrowLeft":
                    this.left = true;
                    break;
                case "ArrowDown":
                    this.reverse = true;
                    break;
            }
        }
        document.onkeyup = (event) => {
            switch(event.key){
                case "ArrowUp":
                    this.forward = false;
                    break;
                case "ArrowRight":
                    this.right = false;
                    break;
                case "ArrowLeft":
                    this.left = false;
                    break;
                case "ArrowDown":
                    this.reverse = false;
                    break;
            }
        }
    }
}