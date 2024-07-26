const canvas = document.getElementById('canvas');
canvas.width = 300;

const context = canvas.getContext('2d');

const road = new Road(canvas.width/2, canvas.width*0.9);
const cars = generateCars(1000);
let bestCar = cars[0];
if (localStorage.getItem("bestBrain")) {
    for (let i=0; i<cars.length; i++) {
        cars[i].brain = JSON.parse(localStorage.getItem("bestBrain"))
        console.log(cars[i].brain.levels[1].biases[0])
        if (i!=0){
            NeuralNetwork.mutate(cars[i].brain, 0.1)
        }
        console.log(cars[i].brain.levels[1].biases[0])
    }
    bestCar.brain = JSON.parse(localStorage.getItem("bestBrain"))
}

const traffic = [
    new Car(road.getLaneCenter(1), -100, 30, 50, "NPC", 2),
    new Car(road.getLaneCenter(3), -300, 30, 50, "NPC", 2),
    new Car(road.getLaneCenter(2), -300, 30, 50, "NPC", 2),
    new Car(road.getLaneCenter(4), -500, 30, 50, "NPC", 2),
    new Car(road.getLaneCenter(0), -500, 30, 50, "NPC", 1),
    new Car(road.getLaneCenter(2), -700, 30, 50, "NPC", 2),
    new Car(road.getLaneCenter(1), -700, 30, 50, "NPC", 2),
    new Car(road.getLaneCenter(2), -900, 30, 50, "NPC", 2),
    new Car(road.getLaneCenter(1), -1100, 30, 50, "NPC", 2),
    new Car(road.getLaneCenter(3), -700, 30, 50, "NPC", 2),
    new Car(road.getLaneCenter(0), -900, 30, 50, "NPC", 3),
    new Car(road.getLaneCenter(1), -900, 30, 50, "NPC", 2),
    new Car(road.getLaneCenter(4), -1100, 30, 50, "NPC", 3),
    new Car(road.getLaneCenter(2), -100, 30, 50, "NPC", 2),
    new Car(road.getLaneCenter(3), -300, 30, 50, "NPC", 2),
    new Car(road.getLaneCenter(4), -300, 30, 50, "NPC", 2),
    new Car(road.getLaneCenter(2), -500, 30, 50, "NPC", 2),
    new Car(road.getLaneCenter(1), -500, 30, 50, "NPC", 2),
    new Car(road.getLaneCenter(0), -700, 30, 50, "NPC", 4),
    new Car(road.getLaneCenter(3), -1700, 30, 50, "NPC", 2),
    new Car(road.getLaneCenter(2), -1900, 30, 50, "NPC", 2),
    new Car(road.getLaneCenter(4), -1100, 30, 50, "NPC", 2),
    new Car(road.getLaneCenter(2), -1700, 30, 50, "NPC", 2),
    new Car(road.getLaneCenter(0), -1900, 30, 50, "NPC", 3),
    new Car(road.getLaneCenter(1), -1900, 30, 50, "NPC", 2),
    new Car(road.getLaneCenter(2), -1100, 30, 50, "NPC", 3),
]
console.log("hskjndanj")

animate();

function save(){
    localStorage.setItem("bestBrain", JSON.stringify(bestCar.brain));
}

function discard() {
    localStorage.removeItem("bestBrain");
}

function generateCars(N){
    const cars = [];
    for (let i = 1; i <= N; i++) {
        cars.push(new Car(road.getLaneCenter(2), 100, 30, 50, "MAIN", 5))
    }
    return cars
}

function animate(){
    for (let i = 0; i< traffic.length; i++){
        traffic[i].update(road.borders, []);
    }
    for (let i = 0; i<cars.length; i++) {
        cars[i].update(road.borders, traffic);
    }

    bestCar = cars.find(
        car => car.y==Math.min(...cars.map(c=>c.y))
    );

    canvas.height = window.innerHeight;

    context.save();
    context.translate(0, canvas.height*0.5 -bestCar.y);

    road.draw(context);

    for (let i = 0; i< traffic.length; i++){
        traffic[i].draw(context);
    }

    context.globalAlpha = 0.2;
    for (let i=0; i<cars.length; i++) {
        cars[i].draw(context);
    }
    context.globalAlpha = 1;
    bestCar.draw(context, true)
    console.log(bestCar.brain)

    context.restore();
    requestAnimationFrame(animate);
}