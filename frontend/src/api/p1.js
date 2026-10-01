// let arr = [22,55,33,77,22]

// let sum=0;

// for(let i=0;i<arr.length;i++){
//      sum = sum +arr[i]

// }

// console.log(sum)


// let arr = [55,33,5,66,44,56]

// let largest = -Infinity

// for(let i=0;i<arr.length;i++){
//     if(largest < arr[i])
//     {
//         largest = arr[i] 
//     }
// }
// console.log(largest)

// let seclargest = arr[0]

// for(let i=0;i<arr.length;i++){

//     if(arr[i] !== largest)
//     {
//        if(seclargest < arr[i]){
//            seclargest =arr[i]
//        }
//     }
// }
// console.log(seclargest)


// let name = 'hello'

// let reverse = ''

// for(let i =name.length-1;i>=0;i--){

//     reverse = reverse + name[i]
// }
// console.log(reverse)

// if(name === reverse){
//     console.log('fibonaci')
// }
// else{
//     console.log('no')
// }

// let number = 5

// let fact = 1

// for(let i =1 ; i<=number;i++){
//     fact = fact * i
// }console.log(fact)



//remove duplicate
// let arr = [1,2,2,5,4,4,5,6,7]

// // let unique = [...new Set(arr)]

// // console.log(unique)

// let unique = []

// for(let i=0;i<arr.length;i++){

//     if(!unique.includes(arr[i])){

//         unique.push(arr[i])
//     }
// }
// console.log(unique)


//find duplicate

// let arr = [11,44,22,66,55,55,44,44]

// let unique = []

// let duplicate = []

// for(let i=0;i<arr.length;i++){

//     if(unique.includes(arr[i])){
//         duplicate.push(arr[i])
//     }
//     else{
//         unique.push(arr[i])
//     }
// }

// console.log(unique)
// console.log(duplicate)

// let arr=[1,2,3,5]
// let total=0

// let n = arr.length + 1

// for(let i=1;i<=n;i++){

//     total = total +i
// }

// let arrsum = 0

// for(let i=0;i<arr.length;i++){
//     arrsum = arrsum + arr[i]

// }

// let mis = total - arrsum

// console.log(mis)



// let arr = [11,44,3,3,22,5]

// let unique = []

// for(let i=0;i<arr.length;i++){

//     if(!unique.includes(arr[i])){
//          unique.push(arr[i])
//     }
// }

// console.log(unique)


// let arr = [11,33,44,44,55,22,77]
// let unique =[]
// let duplicate = []

// for(let i=0;i<arr.length;i++){

//     if(unique.includes(arr[i])){
//         duplicate.push(arr[i])
//     }
//     else{
//         unique.push(arr[i])
//     }
// }

// console.log(unique)
// console.log(duplicate)


// let arr = [1,2,3,4,5]

// let total=0

// let n= arr.length+1

// for(let i =0;i<=n;i++){

//     total =total + i

// }

// let sumarr = 0

// for(let i=0;i<arr.length;i++){

//     sumarr =sumarr + arr[i]
// }

// let miss = total - sumarr

// console.log(miss)



let arr = [1,2,2,5,4,4,3]

let unique =[]
let duplicate=[]

for(let i=0;i<arr.length;i++){

    if(unique.includes(arr[i])){
        unique.push(arr[i])
    }
    else{
        duplicate.push(arr[i])
    }

}

console.log(unique)
console.log(duplicate)