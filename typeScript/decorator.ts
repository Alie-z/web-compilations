function Logger(constructor: Function) {
    console.log(`Class is being created`);
}

@Logger
class Person {
    constructor(public name: string) {}
}

const p = new Person('Alice');
// 输出：Class Person is being created
