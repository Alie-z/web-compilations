async function* range(start, end) {
    for (let i = start; i <= end; i++) {
        yield Promise.resolve(i);
    }
}

(async () => {
    const gen = range(1, 3);
    for await (const item of gen) {
        console.log(item);
    }
})(); //1,2,3
