class HashMap{
    constructor(){
        this.buckets = new Array(16);
        this.size = 0;
    }

    hash(key) {
        let hashCode = 0;
      
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
             hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }

        return hashCode;
    }

    set(key, value){
        const index = this.hash(key)
        if(!this.buckets[index]){
            this.buckets[index] = []
        }

        for(let pair of this.buckets[index]){
            if(pair[0] === key){
                pair[1] = value;
                return
            }
        }
        this.buckets[index].push([key, value]);
        this.size++;

        if(this.size / this.buckets.length > .75){
            this.resize();
        }

    }

    get(key){
        const index = this.hash(key)
        const bucket = this.buckets[index]
        if (bucket) {
            for(let pair of bucket) {
                if(pair[0] === key){
                    return pair[1]
                }
            }
        }
        return null
    }

    has(key){
        return this.get(key) !== null;
    }

    remove(key){
        const index = this.hash(key)
        const bucket = this.buckets[index];
        if(bucket){
            for(let i = 0; i < bucket.length; i++){
                if(bucket[i][0] === key){
                    bucket.splice(i, 1);
                    this.size--;
                    return true
                }
            }
        }
        return false;
    }

    length(){
        return this.size;
    }

    clear(){
        this.buckets = new Array(this.buckets.length);
        this.size = 0;
    }

    keys() {
        const keysArray = [];
        for(let bucket of this.buckets){
            if(bucket) {
                for(let pair of bucket) {
                    keysArray.push(pair[0])
                }
            }
        }
        return keysArray;
    }

    values(){
        const valuesArray = [];
        for(let bucket of this.buckets){
            if(bucket){
                for(let pair of bucket){
                    valuesArray.push(pair[1]);
                }
            }
        }
        return valuesArray;
    }
    
    resize() {
        const oldBuckets = this.buckets;
        this.buckets = new Array(oldBuckets.length * 2);
        this.size = 0

        for(let bucket of oldBuckets){
            if(bucket){
                for(let pair of bucket){
                    this.set(pair[0], pair[1]);
                }
            }
        }
    }

}


const test = new HashMap()

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");




