// const { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit, add } = require('../src/math');

// test('Hello world', () => {

// });

// test('This should fail', () => {
//     throw new Error('Failure');
// });

// test('Should calculate total with tip', () => {
//     const total = calculateTip(10 , 0.3);
//     // if (total !== 13) {
//     //     throw new Error('Total tip should be 13. Got ' + total);
//     // }
//     expect(total).toBe(13);
// });

// test('should calculate total with default', () => {
//     const total = calculateTip(10);
//     expect(total).toBe(12.5);
// });

//
// Goal: Test temperature conversion functions
//
// 1. Export both functions and load them into test suite
// 2. Create "Should convert 32 F to 0 C"
// 3. Create "Should convert 0 C to 32 F"
// 4. Run the Jest to test your work!
 
// test('Should convert 32 F to 0 C', () => {
//     const total = fahrenheitToCelsius(32);
//     expect(total).toBe(0);
// });

// test('Should convert 0 C to 32 F', () => {
//     const total = celsiusToFahrenheit(0);
//     expect(total).toBe(32);
// });

// test('Async test demo', (done) => {
//     setTimeout(() => {
//         expect(1).toBe(2);
//         done();
//     }, 2000);
// });

// test('Should add two numbers', (done) => {
//     add(2, 3).then((sum) => {
//         expect(sum).toBe(5);
//         done();
//     });
// });

// test('Should add two numbers async/await', async () => {
//     const sum = await add(10, 22);
//     expect(sum).toBe(32);
// });