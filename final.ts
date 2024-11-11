
class Task {
    private name:string;
    private priority:number;

    constructor(name:string, priority:number){
        this.name = name;
        this.priority = priority;
    }

    public getPriority():number{
        return this.priority
    }

    public show(): string{
        return "tarea: " + this.name + ", prioridad: " + this.priority
    }
}

class MinHeap {
    private heap: Task[];
    private n: number; 

    constructor(size: number) {
        this.heap = new Array(size + 1);
        this.n = 0;
    }

    public checkMin(): Task {
        return this.heap[1];
    }

    public isEmpty(): boolean {
        return this.n == 0;
    }

    public getQuantity(): number {
        return this.n;
    }

    public insert(value: Task): void {
        if (this.n == (this.heap.length - 1))
            this.resize(2 * this.heap.length)
        this.n++;
        this.heap[this.n] = value;
        this.swap(this.n);
    }

    private swap(i: number): void {
        let father: number = Math.floor(i / 2);
        while (i > 1 && this.heap[father].getPriority() > this.heap[i].getPriority()) {
            let temp: Task = this.heap[father];
            this.heap[father] = this.heap[i];
            this.heap[i] = temp;
            i = father;
            father = Math.floor(i / 2);
        }
    }


    private resize(newSize: number): void {
        let newHeap: Task[] = new Array(newSize);
        for (let i = 1; i < this.heap.length; i++)
            newHeap[i] = this.heap[i];
        this.heap = newHeap;
    }

    public doNext(): string {
        let max: Task = this.heap[1];
        
        this.heap[1] = this.heap[this.n];
        this.heap[this.n] = new Task("Completada",0);
        this.n--;
        
        this.sink(1); 
        return "Realizando " + max.show();
    }

    public showAll():void{
        console.log("\nMonticulo: ")
        for (let i = 1; i < this.n + 1; i++) {
            console.log(this.heap[i].show());
        }

        console.log("Christian Villegas - 1592623")
    }

    private sink(i: number): void {
        while (2*i <= this.n) {
            let j: number = 2*i; 
            if (j < this.n && this.heap[j].getPriority() > this.heap[j+1].getPriority())
                j++; 
            if (this.heap[i].getPriority() <= this.heap[j].getPriority())
                break;
            let temp: Task = this.heap[i];
            this.heap[i] = this.heap[j];
            this.heap[j] = temp;
            // verificamos si procede otro intercambio hacia abajo
            i = j;
        }
    }
}

let minHeap: MinHeap = new MinHeap(7);
minHeap.insert(new Task("Calificar laboratorio 1", 1))
minHeap.insert(new Task("Calificar laboratorio 2", 4))
minHeap.insert(new Task("Reunirse con facultad de ingeniería", 1))
minHeap.insert(new Task("Preparar la siguiente clase", 2))
minHeap.insert(new Task("Definir Laboratorio 3", 3))
minHeap.insert(new Task("Inscribirse a capacitación general", 1))

console.log(minHeap.doNext())
console.log(minHeap.doNext())
minHeap.showAll()
