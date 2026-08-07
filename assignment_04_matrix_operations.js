// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 4
// =============================================================================
//
// TASK: Matrix Operations
//
// Write a JavaScript program that performs three operations on matrices
// (2D arrays), each implemented in its own function.
//
// In JavaScript, a matrix is represented as an array of arrays:
//   let matrix = [[1, 2, 3], [4, 5, 6]];   // 2 rows, 3 columns
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_04_matrix_operations.js
//
// -----------------------------------------------------------------------------
// PART A — Transpose a Matrix
// -----------------------------------------------------------------------------
// - Read an M x N matrix from the user.
// - Compute and display its transpose (rows become columns, columns become rows).
//
// Example (2 x 3 input):
//
//   Original Matrix:      Transposed Matrix:
//   1  2  3               1  4
//   4  5  6               2  5
//                         3  6
//
// -----------------------------------------------------------------------------
// PART B — Add Two Matrices
// -----------------------------------------------------------------------------
// - Read two matrices of exactly the same size (M x N).
// - Compute their element-wise sum and display the result.
//
// -----------------------------------------------------------------------------
// PART C — Multiply Two Matrices
// -----------------------------------------------------------------------------
// - Read matrix A of size M x N and matrix B of size N x P.
//   (Number of COLUMNS in A must equal number of ROWS in B.)
// - Compute and display the matrix product A x B (result is M x P).
//
// -----------------------------------------------------------------------------
// EXPECTED INPUT FORMAT
// -----------------------------------------------------------------------------
// When entering a row, the user types all values on one line separated by spaces:
//
//   Enter number of rows: 2
//   Enter number of columns: 3
//   Enter row 1: 1 2 3
//   Enter row 2: 4 5 6
//
// Hint: Use row.split(' ').map(Number) to convert a line of text into an array
// of numbers.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Use nested loops for all operations (no external libraries).
// - Each operation must be in its own function (see scaffold below).
// - Display each matrix in a neat, aligned grid format.
// - Tip: Complete Part A first, then Parts B and C.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================

const readlineSync = require('readline-sync');

function printMatrix(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        const rowStr = matrix[i].map(num => String(num).padStart(5)).join('');
        console.log(rowStr);
    }
}


function inputMatrix(rows, cols, matrixName = '') {
    const matrix = [];
    if (matrixName) {
        console.log(`\nEnter elements for Matrix ${matrixName} (${rows}x${cols}):`);
    }
    for (let i = 0; i < rows; i++) {
        const line = readlineSync.question(`Enter row ${i + 1}: `);
        const row = line.trim().split(/\s+/).map(Number);
        
        if (row.length !== cols || row.some(isNaN)) {
            console.log(`Error: Please enter exactly ${cols} numbers separated by spaces.`);
            i--; // Retry this row
            continue;
        }
        matrix.push(row);
    }
    return matrix;
}


function transposeMatrix(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const transposed = [];

    for (let j = 0; j < cols; j++) {
        const newRow = [];
        for (let i = 0; i < rows; i++) {
            newRow.push(matrix[i][j]);
        }
        transposed.push(newRow);
    }
    return transposed;
}


function addMatrices(matrixA, matrixB) {
    const rows = matrixA.length;
    const cols = matrixA[0].length;
    const sumMatrix = [];

    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            row.push(matrixA[i][j] + matrixB[i][j]);
        }
        sumMatrix.push(row);
    }
    return sumMatrix;
}


function multiplyMatrices(matrixA, matrixB) {
    const rowsA = matrixA.length;
    const colsA = matrixA[0].length;
    const colsB = matrixB[0].length;
    const productMatrix = [];

    for (let i = 0; i < rowsA; i++) {
        const row = [];
        for (let j = 0; j < colsB; j++) {
            let sum = 0;
            for (let k = 0; k < colsA; k++) {
                sum += matrixA[i][k] * matrixB[k][j];
            }
            row.push(sum);
        }
        productMatrix.push(row);
    }
    return productMatrix;
}


function main() {
    console.log('=========================================');
    console.log('          MATRIX OPERATIONS MENU         ');
    console.log('=========================================');

   
    console.log('\n--- PART A: Transpose a Matrix ---');
    const rA = readlineSync.questionInt('Enter number of rows: ');
    const cA = readlineSync.questionInt('Enter number of columns: ');

    const matA = inputMatrix(rA, cA);

    console.log('\nOriginal Matrix:');
    printMatrix(matA);

    const transposedMat = transposeMatrix(matA);
    console.log('\nTransposed Matrix:');
    printMatrix(transposedMat);

    
    console.log('\n--- PART B: Add Two Matrices ---');
    const rB = readlineSync.questionInt('Enter number of rows for matrices: ');
    const cB = readlineSync.questionInt('Enter number of columns for matrices: ');

    const matB1 = inputMatrix(rB, cB, '1');
    const matB2 = inputMatrix(rB, cB, '2');

    const sumMat = addMatrices(matB1, matB2);
    console.log('\nSum Matrix:');
    printMatrix(sumMat);

   
    console.log('\n--- PART C: Multiply Two Matrices ---');
    const rM1 = readlineSync.questionInt('Enter rows for Matrix A: ');
    const cM1 = readlineSync.questionInt('Enter columns for Matrix A (will match rows of Matrix B): ');
    const cM2 = readlineSync.questionInt('Enter columns for Matrix B: ');

    const multA = inputMatrix(rM1, cM1, 'A');
    const multB = inputMatrix(cM1, cM2, 'B'); 

    const productMat = multiplyMatrices(multA, multB);
    console.log('\nProduct Matrix (A x B):');
    printMatrix(productMat);
}


main();
