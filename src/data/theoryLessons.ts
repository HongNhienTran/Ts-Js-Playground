export interface TheoryLesson {
  id: string;
  titleEn: string;
  titleVi: string;
  categoryEn: string;
  categoryVi: string;
  readTime: string;
  contentEn: string;
  contentVi: string;
}

export const theoryLessons: TheoryLesson[] = [
  {
    id: "theory-1",
    titleEn: "Scope & Hoisting",
    titleVi: "Phạm Vi & Hoisting",
    categoryEn: "JavaScript",
    categoryVi: "JavaScript",
    readTime: "3 min",
    contentEn: `### Understanding Scope
Scope in JavaScript determines the visibility or accessibility of variables. There are three types of scope:
1. **Global Scope:** Variables declared outside any function or block are accessible from anywhere.
2. **Function Scope:** Variables declared inside a function are only accessible within that function (using \`var\`, \`let\`, or \`const\`).
3. **Block Scope:** Variables declared inside a block \`{}\` (like \`if\` or \`for\`) using \`let\` or \`const\` are only accessible inside that block.

### Hoisting
Hoisting is JavaScript's default behavior of moving declarations to the top of the current scope.
- **Function declarations** are fully hoisted. You can call a function before it is declared.
- **\`var\` variables** are hoisted but initialized as \`undefined\`.
- **\`let\` and \`const\` variables** are hoisted but not initialized (they exist in the "Temporal Dead Zone" until their actual declaration line is reached). Calling them early throws a \`ReferenceError\`.

\`\`\`javascript
// Function hoisting works:
sayHello(); // "Hello!"
function sayHello() { console.log("Hello!"); }

// let/const hoisting throws error:
console.log(magicNumber); // ReferenceError!
let magicNumber = 42;
\`\`\`
`,
    contentVi: `### Tìm Hiểu Về Phạm Vi (Scope)
Phạm vi trong JavaScript quyết định khả năng hiển thị hoặc truy cập của các biến. Có ba cấp độ phạm vi chính:
1. **Phạm vi Toàn cục (Global Scope):** Các biến được khai báo bên ngoài tất cả các hàm hoặc khối lệnh có thể truy cập được từ bất kỳ đâu.
2. **Phạm vi Hàm (Function Scope):** Biến được khai báo bên trong hàm chỉ có thể được truy cập trong phạm vi hàm đó (áp dụng cho \`var\`, \`let\`, hoặc \`const\`).
3. **Phạm vi Khối (Block Scope):** Biến khai báo bằng \`let\` hoặc \`const\` bên trong cặp ngoặc nhọn \`{}\` (như trong \`if\` hoặc \`for\`) chỉ có thể truy cập được bên trong khối đó.

### Hoisting
Hoisting là cơ chế mặc định của JavaScript đưa phần khai báo (declarations) lên đầu phạm vi hiện tại (global hoặc function) trước khi thực thi code.
- **Khai báo Hàm (Function Declarations):** Được đưa lên đầu và sẵn sàng sử dụng đầy đủ. Bạn có thể gọi hàm trước khi viết định nghĩa hàm.
- **Biến khai báo bằng \`var\`:** Được đưa lên đầu nhưng gán giá trị mặc định là \`undefined\`.
- **Biến khai báo bằng \`let\` và \`const\`:** Cũng được đưa lên đầu nhưng không được khởi tạo (nằm trong vùng chết tạm thời - "Temporal Dead Zone"). Truy cập chúng trước dòng khai báo sẽ gây ra lỗi \`ReferenceError\`.

\`\`\`javascript
// Gọi hàm trước khai báo hoạt động tốt:
sayHello(); // In ra: "Hello!"
function sayHello() { console.log("Hello!"); }

// Gọi let/const trước khai báo sẽ báo lỗi:
console.log(magicNumber); // Lỗi: ReferenceError!
let magicNumber = 42;
\`\`\`
`
  },
  {
    id: "theory-2",
    titleEn: "Mastering Closures",
    titleVi: "Làm Chủ Closures (Bao Đóng)",
    categoryEn: "JavaScript",
    categoryVi: "JavaScript",
    readTime: "4 min",
    contentEn: `### What is a Closure?
A closure is the combination of a function bundled together with references to its surrounding state (the lexical environment). In other words, a closure gives an inner function access to the outer function's scope even after the outer function has returned.

Whenever a function is created in JavaScript, a closure is created.

### Use Case: Data Encapsulation
Closures are widely used to create private variables that cannot be accessed directly from the outside, only through exposed methods.

\`\`\`javascript
function createManaPool(initialMana) {
  let mana = initialMana; // Private variable

  return {
    getMana: () => mana,
    useMana: (amount) => {
      if (amount <= mana) {
        mana -= amount;
        return true;
      }
      return false;
    }
  };
}

const pool = createManaPool(100);
console.log(pool.getMana()); // 100
pool.useMana(30);
console.log(pool.getMana()); // 70
console.log(pool.mana);      // undefined (cannot access private variable directly!)
\`\`\`
`,
    contentVi: `### Closure (Bao Đóng) Là Gì?
Bao đóng (closure) là sự kết hợp giữa một hàm và môi trường từ vựng (lexical environment) nơi hàm đó được khai báo. Nói cách khác, closure cho phép một hàm con truy cập được vào phạm vi của hàm cha bên ngoài nó, ngay cả khi hàm cha đã thực thi xong và trả về kết quả.

Mỗi khi một hàm được tạo ra trong JavaScript, một bao đóng cũng đồng thời được thiết lập.

### Ứng dụng: Đóng gói dữ liệu (Data Encapsulation)
Bao đóng thường được dùng để tạo ra các biến "private" (riêng tư) nhằm ngăn không cho truy cập hay sửa đổi trực tiếp từ bên ngoài, chỉ có thể tác động thông qua các phương thức được trả ra.

\`\`\`javascript
function createManaPool(initialMana) {
  let mana = initialMana; // Biến riêng tư

  return {
    getMana: () => mana,
    useMana: (amount) => {
      if (amount <= mana) {
        mana -= amount;
        return true;
      }
      return false;
    }
  };
}

const pool = createManaPool(100);
console.log(pool.getMana()); // In ra: 100
pool.useMana(30);
console.log(pool.getMana()); // In ra: 70
console.log(pool.mana);      // In ra: undefined (không thể truy cập trực tiếp biến private!)
\`\`\`
`
  },
  {
    id: "theory-3",
    titleEn: "Async/Await & Promises",
    titleVi: "Bất Đồng Bộ: Promises & Async/Await",
    categoryEn: "JavaScript",
    categoryVi: "JavaScript",
    readTime: "4 min",
    contentEn: `### Understanding Asynchronous JS
JavaScript is single-threaded, meaning it executes code line by line. To run long tasks (like API requests, timers, or file reading) without freezing the UI, JavaScript offloads them asynchronously.

### Promises
A Promise is an object representing the eventual completion (or failure) of an asynchronous operation.
It has three states:
- **Pending:** Initial state, task is not finished.
- **Fulfilled:** Successful completion (triggers \`.then()\`).
- **Rejected:** Fails due to an error (triggers \`.catch()\`).

### Async/Await
Introduced in ES2017, \`async/await\` is syntactic sugar built on top of Promises. It makes asynchronous code look and behave like synchronous code.
- Add the \`async\` keyword before a function to make it return a Promise.
- Use \`await\` inside an async function to pause execution until the Promise resolves.

\`\`\`javascript
// Using Promises:
fetchLoot()
  .then(gold => console.log("Gained: " + gold))
  .catch(err => console.error("Monster escaped!", err));

// Using Async/Await:
async function openChest() {
  try {
    const gold = await fetchLoot();
    console.log("Gained: " + gold);
  } catch (err) {
    console.error("Chest was trapped!", err);
  }
}
\`\`\`
`,
    contentVi: `### Lập Trình Bất Đồng Bộ Trong JS
JavaScript hoạt động đơn luồng (single-threaded), nghĩa là thực thi mã dòng theo dòng. Để xử lý các tác vụ tốn thời gian (gửi API request, thiết lập bộ đếm timer, đọc file) mà không làm đơ giao diện, JS đưa chúng vào hàng đợi xử lý bất đồng bộ.

### Promises (Lời Hứa)
Promise là một đối tượng đại diện cho kết quả thành công (hoặc thất bại) của một tác vụ bất đồng bộ trong tương lai.
Promise có ba trạng thái:
- **Pending (Đang chờ):** Trạng thái ban đầu khi tác vụ chưa hoàn thành.
- **Fulfilled (Thành công):** Tác vụ chạy thành công (kích hoạt hàm \`.then()\`).
- **Rejected (Thất bại):** Xảy ra lỗi (kích hoạt hàm \`.catch()\`).

### Async / Await
Được giới thiệu từ bản ES2017, \`async/await\` là lớp bọc cú pháp (syntactic sugar) phía trên Promises, giúp viết code bất đồng bộ trông giống như đồng bộ và dễ đọc hơn.
- Khai báo \`async\` trước một hàm để biến hàm đó thành hàm bất đồng bộ (luôn trả ra một Promise).
- Dùng từ khóa \`await\` bên trong hàm async để dừng tiến trình thực thi cho đến khi Promise trả về kết quả.

\`\`\`javascript
// Sử dụng Promises truyền thống:
fetchLoot()
  .then(gold => console.log("Gained: " + gold))
  .catch(err => console.error("Lỗi triệu hồi!", err));

// Sử dụng Async/Await hiện đại:
async function openChest() {
  try {
    const gold = await fetchLoot();
    console.log("Gained: " + gold);
  } catch (err) {
    console.error("Rương có bẫy phép!", err);
  }
}
\`\`\`
`
  },
  {
    id: "theory-4",
    titleEn: "TS Interfaces & Types",
    titleVi: "TypeScript: Interfaces & Type Aliases",
    categoryEn: "TypeScript",
    categoryVi: "TypeScript",
    readTime: "3 min",
    contentEn: `### TypeScript Static Types
TypeScript introduces static typing to help catch errors during development. The two main ways to define object shapes are **Interface** and **Type Alias**.

### Interface
Interfaces are strictly used to define object blueprints. They support inheritance via \`extends\` and are open to declaration merging.

\`\`\`typescript
interface Character {
  name: string;
  hp: number;
}

// Inheritance
interface Wizard extends Character {
  mana: number;
}
\`\`\`

### Type Alias
Types can define objects, but they can also represent primitives, unions, tuples, or intersection types. They are more versatile but cannot be declaration-merged.

\`\`\`typescript
type Role = "Mage" | "Warrior" | "Cleric"; // Union Type
type Stats = { strength: number; speed: number; };

// Intersection
type SuperHero = Character & Stats;
\`\`\`
`,
    contentVi: `### Kiểu Dữ Liệu Tĩnh Trong TS
TypeScript giới thiệu các kiểu dữ liệu tĩnh để giúp phát hiện lỗi ngay trong lúc viết code. Hai cách chính để định nghĩa hình dáng một đối tượng là **Interface** và **Type Alias**.

### Interface
Interface được sử dụng chuyên biệt để định hình các đối tượng cấu trúc. Chúng hỗ trợ kế thừa bằng từ khóa \`extends\` và có khả năng gộp các khai báo trùng tên (declaration merging).

\`\`\`typescript
interface Character {
  name: string;
  hp: number;
}

// Kế thừa
interface Wizard extends Character {
  mana: number;
}
\`\`\`

### Type Alias (Bí Danh Kiểu)
Type ngoài định nghĩa đối tượng còn có thể gán cho các kiểu dữ liệu nguyên bản, kiểu hợp (unions), mảng cố định (tuples), hoặc kiểu giao (intersections). Type linh hoạt hơn nhưng không thể khai báo trùng tên để tự động gộp lại như interface.

\`\`\`typescript
type Role = "Mage" | "Warrior" | "Cleric"; // Kiểu Union
type Stats = { strength: number; speed: number; };

// Kết hợp (Intersection)
type SuperHero = Character & Stats;
\`\`\`
`
  },
  {
    id: "theory-5",
    titleEn: "Introduction to Generics",
    titleVi: "TypeScript: Giới Thiệu Về Generics",
    categoryEn: "TypeScript",
    categoryVi: "TypeScript",
    readTime: "4 min",
    contentEn: `### What are Generics?
Generics allow you to build reusable components that work with multiple types rather than a single type. It acts like a type variable that is passed to functions or classes when they are invoked.

We write generic types using angle brackets \`<T>\` (where \`T\` is a placeholder convention for Type).

### Simple Example
Imagine a reusable chest that can hold gold (a number), items (an array of strings), or a magic artifact (an object):

\`\`\`typescript
interface Chest<T> {
  loot: T;
  isLocked: boolean;
}

// Using with a string
const stringChest: Chest<string> = {
  loot: "Ancient Spellbook",
  isLocked: false
};

// Using with a number
const goldChest: Chest<number> = {
  loot: 500,
  isLocked: true
};
\`\`\`

By using generics, we preserve the exact type of \`loot\` and prevent the compiler from casting it to \`any\`.
`,
    contentVi: `### Generics (Tham Số Hóa Kiểu) Là Gì?
Generics cho phép bạn xây dựng các thành phần code có khả năng tái sử dụng với nhiều kiểu dữ liệu khác nhau thay vì chỉ cố định một kiểu duy nhất. Nó hoạt động giống như một tham số biến kiểu truyền vào hàm, class, hoặc interface khi được khởi tạo.

Cú pháp khai báo generic sử dụng cặp ngoặc nhọn \`<T>\` (\`T\` là chữ viết tắt thông thường cho Type).

### Ví dụ Thực Tế
Hãy tưởng tượng một hòm đồ ma thuật có thể chứa vàng (kiểu số), trang bị (kiểu mảng chuỗi) hoặc một bảo vật (kiểu đối tượng):

\`\`\`typescript
interface Chest<T> {
  loot: T;
  isLocked: boolean;
}

// Đựng một chuỗi (string)
const stringChest: Chest<string> = {
  loot: "Cuộn Giấy Cổ Xưa",
  isLocked: false
};

// Đựng một con số (number)
const goldChest: Chest<number> = {
  loot: 500,
  isLocked: true
};
\`\`\`

Nhờ sử dụng generics, chúng ta giữ nguyên được thông tin kiểu dữ liệu gốc của thuộc tính \`loot\` và tránh việc phải ép sang kiểu không an toàn \`any\`.
`
  }
];
