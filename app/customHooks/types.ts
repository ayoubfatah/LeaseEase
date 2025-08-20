let array: Array<string | number>;
array = ["hello", "hi", "hallo", 2];

let stringArr: string[]; //number[] boolean[] ...
stringArr = ["hello", "hi", "hellooo"];

let objArr: { name: string; age: number }[];
objArr = [{ name: "john", age: 22 }];

let mixedArr: (string | number)[];
mixedArr = [1, "JJ", 23, "BB"];

let Arr: [string, number];
Arr = ["tes", 22];

// ----

function add(a: number, b: number): number {
  return a + b;
}
const test = add(2, 3);

function add2(a: number, b: number): void {
  const result = a + b;
  console.log(result);
}

type calcFnType = (a: number, b: number) => number;

function calculate(a: number, b: number, calcFn: calcFnType): number {
  const result = calcFn(a, b);
  return result;
}

interface Admin {
  permissions: string[];
}

interface AppUser {
  userName: string;
}

interface AppAdmin extends AppUser, Admin {
  // we can add more or keep it empty
}

type roleTypes = "admin" | "user" | "editor";
let role: roleTypes; // "admin , "user" ,"editor"
role = "admin";

//
//
//
type UserType = {
  name: string;
  age: number;
};

type DataStorage<T> = {
  storage: T[]; //array full of data but we don't know what type
  add: (data: T) => void;
};

const userData: DataStorage<UserType> = {
  storage: [],
  add(data) {
    this.storage.push(data);
  },
};

userData.storage = [{ name: "A", age: 22 }];
userData.add({ name: "j", age: 200 });

function merge<T, U>(a: T, b: U) {
  return { ...a, ...b };
}
const user = merge<{ name: string; age: number }, { unemployed: boolean }>(
  { name: "Ayoub", age: 22 },
  { unemployed: true }
);
