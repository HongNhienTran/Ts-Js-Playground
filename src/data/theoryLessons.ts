export interface TheoryLesson {
  id: string;
  titleEn: string;
  titleVi: string;
  category: 'JS' | 'TS';
  readTime: string;
  contentEn: string;
  contentVi: string;
}

export const theoryLessons: TheoryLesson[] = [
  // === JAVASCRIPT TRACK ===
  {
    id: "js-theory-1",
    titleEn: "1. Variables & Data Types",
    titleVi: "1. Khai Báo Biến & Kiểu Dữ Liệu",
    category: "JS",
    readTime: "3 min",
    contentEn: `### JavaScript Variables
Variables are containers for storing data values. In modern JavaScript, we have three ways to declare variables:
- **let**: Declares block-scoped variables that can be reassigned.
- **const**: Declares block-scoped constants that cannot be reassigned.
- **var**: An older way to declare function-scoped variables (deprecated in modern projects).

### Primitive vs Object Types
JavaScript values are divided into two main categories:
1. **Primitive Types:** Stored directly in the call stack. They are immutable.
   - String: text data.
   - Number: integers and floats.
   - Boolean: true or false.
   - Null: intentional absence of value.
   - Undefined: declared but uninitialized variables.
   - Symbol & BigInt: specialized types for unique keys and large integers.

2. **Object Types:** Stored in the heap. They are mutable and passed by reference.
   - Objects, Arrays, and Functions are all objects in JavaScript.

\`\`\`javascript
let score = 10; // mutable
const maxScore = 100; // immutable constant

const player = { name: "Arthur", level: 1 }; // Object reference
player.level = 2; // Allowed even if declared with const!
\`\`\`
`,
    contentVi: `### Khai Báo Biến Trong JavaScript
Biến được hiểu như là các hộp chứa để lưu trữ dữ liệu. Trong JavaScript hiện đại, chúng ta có ba từ khóa chính để khai báo biến:
- **let**: Khai báo biến trong phạm vi khối (block scope) và có thể gán lại giá trị mới.
- **const**: Khai báo hằng số trong phạm vi khối và không thể gán lại giá trị mới.
- **var**: Cách khai báo kiểu cũ có phạm vi hàm (function scope), hiện tại không khuyến khích sử dụng.

### Kiểu Dữ Liệu Nguyên Bản & Đối Tượng
Dữ liệu trong JavaScript được phân thành hai nhóm lớn:
1. **Kiểu Nguyên Bản (Primitive Types):** Lưu trữ giá trị thực tế trực tiếp trong bộ nhớ stack. Giá trị của chúng không thể bị biến đổi (immutable).
   - String: Dữ liệu văn bản.
   - Number: Số nguyên và số thực.
   - Boolean: Đúng (true) hoặc sai (false).
   - Null: Đại diện cho giá trị trống được chỉ định chủ ý.
   - Undefined: Biến đã khai báo nhưng chưa được gán giá trị.
   - Symbol & BigInt: Kiểu đặc biệt cho các định danh duy nhất và số cực lớn.

2. **Kiểu Đối Tượng (Object Types):** Lưu trữ địa chỉ tham chiếu trong bộ nhớ heap. Giá trị của chúng có thể thay đổi được (mutable).
   - Đối tượng (Objects), Mảng (Arrays) và Hàm (Functions) đều thuộc nhóm này.

\`\`\`javascript
let score = 10; // có thể thay đổi
const maxScore = 100; // hằng số cố định

const player = { name: "Arthur", level: 1 }; // Kiểu tham chiếu
player.level = 2; // Được phép thay đổi thuộc tính con dù khai báo bằng const!
\`\`\`
`
  },
  {
    id: "js-theory-2",
    titleEn: "2. Control Flow & Operators",
    titleVi: "2. Cấu Trúc Điều Kiện & Vòng Lặp",
    category: "JS",
    readTime: "4 min",
    contentEn: `### Logical Operators
Operators allow you to perform logic checks:
- **&& (AND):** Returns true if both conditions are true.
- **|| (OR):** Returns true if at least one condition is true.
- **! (NOT):** Reverses the boolean value.

### Conditional Statements
Conditionals control what code blocks execute:
- **if / else if / else**: Executes blocks based on boolean truth.
- **switch**: Compares a value against multiple case constants.

### Loops & Iteration
Loops repeat actions while conditions are met:
- **for**: Standard counter loop.
- **while**: Runs as long as the condition remains true.
- **for...of**: Iterates through elements of arrays.
- **for...in**: Iterates through keys of objects.

\`\`\`javascript
const level = 5;
if (level >= 5 && level < 10) {
  console.log("Middle Tier Mage");
} else {
  console.log("Novice or Grandmaster");
}

// Loop through array
const items = ["Sword", "Shield", "Potion"];
for (const item of items) {
  console.log("Found loot: " + item);
}
\`\`\`
`,
    contentVi: `### Toán Tử Logic
Toán tử giúp chúng ta thực hiện các kiểm tra logic cơ bản:
- **&& (VÀ):** Trả về true nếu cả hai điều kiện cùng đúng.
- **|| (HOẶC):** Trả về true nếu có ít nhất một điều kiện đúng.
- **! (PHỦ ĐỊNH):** Đảo ngược giá trị logic từ true thành false và ngược lại.

### Cấu Trúc Điều Kiện
Điều kiện giúp điều hướng chương trình chạy các khối mã khác nhau:
- **if / else if / else**: Thực thi mã dựa trên kết quả đúng/sai của biểu thức logic.
- **switch**: So sánh một giá trị đơn lẻ với nhiều trường hợp (cases) cố định.

### Vòng Lặp
Vòng lặp giúp lặp lại một hành động nhiều lần:
- **for**: Vòng lặp đếm cơ bản với bộ đếm tăng dần.
- **while**: Chạy liên tục khi điều kiện kiểm tra còn đúng.
- **for...of**: Duyệt qua từng phần tử của một mảng.
- **for...in**: Duyệt qua từng thuộc tính (khóa) của một đối tượng.

\`\`\`javascript
const level = 5;
if (level >= 5 && level < 10) {
  console.log("Pháp sư Trung cấp");
} else {
  console.log("Tập sự hoặc Đại pháp sư");
}

// Duyệt mảng bằng for...of
const items = ["Kiếm", "Khiên", "Thuốc phục hồi"];
for (const item of items) {
  console.log("Nhận được: " + item);
}
\`\`\`
`
  },
  {
    id: "js-theory-3",
    titleEn: "3. Functions & Execution Scope",
    titleVi: "3. Hàm & Phạm Vi Thực Thi",
    category: "JS",
    readTime: "4 min",
    contentEn: `### Declaring Functions
Functions are block of code designed to perform a particular task.
1. **Function Declarations:** Fully hoisted, can be called before definition.
2. **Function Expressions:** Assigned to variables, not hoisted.
3. **Arrow Functions:** Shorter syntax, does not bind its own "this" keyword.

### Variable Scope
Scope defines variable accessibility:
- **Global:** Defined outside functions.
- **Function/Local:** Defined inside a function.
- **Block:** Declared inside block brackets.

### Hoisting Explanation
JavaScript moves declarations to the top of their scope before executing code. Function declarations are hoisted completely. var variables are hoisted as undefined. let and const variables are hoisted but reside in the Temporal Dead Zone (TDZ) and cannot be accessed before their declaration.

\`\`\`javascript
// Arrow function syntax
const castSpell = (spell) => {
  return "Casting: " + spell;
};

// Hoisting behavior
console.log(mana); // prints undefined (var is hoisted)
var mana = 100;
\`\`\`
`,
    contentVi: `### Khai Báo Hàm (Functions)
Hàm là khối mã lệnh được thiết kế để thực hiện một công việc cụ thể.
1. **Khai báo Hàm (Function Declarations):** Được đưa lên đầu phạm vi (hoisted), có thể gọi trước khi viết mã khai báo.
2. **Biểu thức Hàm (Function Expressions):** Gán hàm vào một biến, không được hoisted.
3. **Hàm Mũi Tên (Arrow Functions):** Cú pháp ngắn gọn, không tự ràng buộc từ khóa "this".

### Phạm Vi Biến (Variable Scope)
Phạm vi quyết định nơi biến có thể được nhìn thấy:
- **Toàn cục (Global):** Khai báo ngoài cùng, truy cập được từ mọi nơi.
- **Cục bộ/Hàm (Function/Local):** Chỉ tồn tại bên trong hàm khai báo nó.
- **Khối (Block):** Nằm trong cặp ngoặc nhọn khai báo bằng let/const.

### Cơ Chế Hoisting (Đưa Khai Báo Lên Đầu)
JavaScript luôn chuyển phần khai báo lên đầu scope trước khi chạy mã. Khai báo hàm được hoisted hoàn toàn. Khai báo biến var được hoisted với giá trị mặc định undefined. Biến khai báo bằng let và const cũng được hoisted nhưng bị khóa trong Vùng Chết Tạm Thời (TDZ) cho tới khi mã chạy đến đúng dòng khai báo của nó.

\`\`\`javascript
// Cú pháp hàm mũi tên
const castSpell = (spell) => {
  return "Đang thi triển: " + spell;
};

// Hành vi của Hoisting với var
console.log(mana); // In ra: undefined (chỉ phần khai báo biến var được đưa lên đầu)
var mana = 100;
\`\`\`
`
  },
  {
    id: "js-theory-4",
    titleEn: "4. Arrays & Objects Manipulation",
    titleVi: "4. Xử Lý Mảng & Đối Tượng",
    category: "JS",
    readTime: "4 min",
    contentEn: `### Object Methods & Destructuring
Objects store keyed collections of data. You can destructure objects to unpack values easily:
\`\`\`javascript
const mage = { name: "Eldrin", class: "Wizard", xp: 150 };
const { name, xp } = mage; // Destructuring
console.log(name); // "Eldrin"
\`\`\`

### Array Methods
Modern JavaScript provides array methods to transform collections without manual loops:
- **map**: Transforms every element, returns a new array of same length.
- **filter**: Keeps elements that pass a logic check, returns a new array.
- **reduce**: Aggregates array values into a single output value.

\`\`\`javascript
const bag = [10, 20, 30]; // bags of gold
const doubled = bag.map(gold => gold * 2); // [20, 40, 60]

const heavyBags = bag.filter(gold => gold > 15); // [20, 30]

const totalGold = bag.reduce((sum, gold) => sum + gold, 0); // 60
\`\`\`
`,
    contentVi: `### Đối Tượng & Phân Rã (Destructuring)
Đối tượng lưu trữ các bộ dữ liệu đi kèm với chìa khóa (key-value). Chúng ta có thể dùng cú pháp destructuring để giải nén dữ liệu nhanh chóng:
\`\`\`javascript
const mage = { name: "Eldrin", class: "Wizard", xp: 150 };
const { name, xp } = mage; // Giải nén (Destructuring)
console.log(name); // In ra: Eldrin
\`\`\`

### Các Phương Thức Duyệt Mảng Quan Trọng
JavaScript hiện đại cung cấp nhiều phương thức giúp xử lý mảng mà không cần sử dụng vòng lặp thủ công:
- **map**: Biến đổi từng phần tử trong mảng và trả về mảng mới có độ dài tương đương.
- **filter**: Lọc lấy các phần tử thỏa mãn điều kiện và trả về mảng mới.
- **reduce**: Cộng dồn hoặc biến đổi mảng thành một giá trị đầu ra duy nhất (như tính tổng).

\`\`\`javascript
const bag = [10, 20, 30]; // số vàng trong các túi
const doubled = bag.map(gold => gold * 2); // Trả về mảng: [20, 40, 60]

const heavyBags = bag.filter(gold => gold > 15); // Trả về mảng: [20, 30]

const totalGold = bag.reduce((sum, gold) => sum + gold, 0); // Trả về số: 60
\`\`\`
`
  },
  {
    id: "js-theory-5",
    titleEn: "5. Closures & Advanced Functions",
    titleVi: "5. Bao Đóng & Hàm Nâng Cao",
    category: "JS",
    readTime: "4 min",
    contentEn: `### Lexical Scope
Lexical scope means that inner functions have access to the variables defined in their outer scope based on where the functions are written in the code.

### Closures
A closure is created when an inner function remembers and accesses its outer lexical scope even after the outer function has finished executing. Closures enable:
- **Private state encapsulation**: Creating variables that cannot be modified directly from outside the function.
- **State persistence**: Retaining state between function calls without using global variables.

\`\`\`javascript
function createCounter() {
  let count = 0; // Private state variable
  return () => {
    count++;
    return count;
  };
}

const increment = createCounter();
console.log(increment()); // 1
console.log(increment()); // 2 (state is preserved!)
\`\`\`
`,
    contentVi: `### Lexical Scope (Phạm Vi Từ Vựng)
Phạm vi từ vựng định nghĩa rằng các hàm con bên trong luôn có quyền truy cập vào các biến thuộc phạm vi của hàm cha dựa trên vị trí vật lý mà các hàm đó được viết trong mã nguồn.

### Bao Đóng (Closures)
Bao đóng xuất hiện khi một hàm con ghi nhớ và tiếp tục truy cập được vào phạm vi ngoài của nó, ngay cả khi hàm ngoài chứa nó đã chạy xong hoàn toàn. Closures giúp chúng ta:
- **Đóng gói trạng thái riêng tư**: Tạo ra các biến nội bộ không thể sửa đổi trực tiếp từ bên ngoài.
- **Ghi nhớ trạng thái**: Lưu giữ thông tin giữa các lần gọi hàm khác nhau mà không cần dùng biến toàn cục.

\`\`\`javascript
function createCounter() {
  let count = 0; // Biến trạng thái riêng tư
  return () => {
    count++;
    return count;
  };
}

const increment = createCounter();
console.log(increment()); // In ra: 1
console.log(increment()); // In ra: 2 (trạng thái được ghi nhớ qua closure!)
\`\`\`
`
  },
  {
    id: "js-theory-6",
    titleEn: "6. Promises & Async Programming",
    titleVi: "6. Lời Hứa & Lập Trình Bất Đồng Bộ",
    category: "JS",
    readTime: "5 min",
    contentEn: `### Asynchronous Javascript
Because JavaScript runs on a single execution thread, long-running operations (like network calls or timers) must run asynchronously to prevent blocking the user interface.

### Promises
A Promise is a placeholder object for a value that will resolve or reject in the future.
- **then**: Executed when a Promise resolves successfully.
- **catch**: Executed when a Promise encounters an error.

### Async / Await
The async and await keywords provide a clean syntax to write asynchronous operations.
- Marking a function as **async** ensures it returns a Promise.
- Putting **await** before a Promise forces JavaScript to pause execution until that Promise is fulfilled or rejected.

\`\`\`javascript
function fetchGold() {
  return new Promise(resolve => {
    setTimeout(() => resolve(50), 1000); // gets 50 gold after 1 sec
  });
}

// Async usage
async function collectGold() {
  console.log("Searching...");
  const gold = await fetchGold(); // pauses here for 1 sec
  console.log("Found: " + gold + " gold!");
}
\`\`\`
`,
    contentVi: `### Lập Trình Bất Đồng Bộ
Vì JavaScript chạy trên luồng xử lý đơn (single thread), các tác vụ tốn thời gian như gọi mạng hoặc chờ thời gian đếm ngược cần phải chạy bất đồng bộ để tránh chặn đứng giao diện người dùng.

### Promises (Lời Hứa)
Promise là một đối tượng đóng vai trò đại diện cho một giá trị sẽ hoàn thành hoặc thất bại trong tương lai.
- **then**: Kích hoạt khi Promise hoàn thành thành công.
- **catch**: Kích hoạt khi Promise gặp lỗi thất bại.

### Async / Await
Từ khóa async và await cung cấp cú pháp sạch sẽ hơn để làm việc với Promise.
- Khai báo một hàm là **async** giúp đảm bảo nó luôn trả về một Promise.
- Đặt từ khóa **await** trước một Promise giúp dừng tiến trình tạm thời cho đến khi Promise trả ra kết quả.

\`\`\`javascript
function fetchGold() {
  return new Promise(resolve => {
    setTimeout(() => resolve(50), 1000); // nhận về 50 vàng sau 1 giây
  });
}

// Cách dùng Async/Await
async function collectGold() {
  console.log("Đang tìm...");
  const gold = await fetchGold(); // dừng chờ tại đây 1 giây
  console.log("Nhận được: " + gold + " vàng!");
}
\`\`\`
`
  },

  // === TYPESCRIPT TRACK ===
  {
    id: "ts-theory-1",
    titleEn: "1. Type Annotations & Basic Types",
    titleVi: "1. Chú Thích Kiểu & Các Kiểu Cơ Bản",
    category: "TS",
    readTime: "3 min",
    contentEn: `### Static Typing
TypeScript adds type definitions on top of JavaScript. The compiler checks these annotations before building, alerting you of bugs immediately.

### Basic Type Annotations
You declare types by writing a colon after the variable name followed by the type name:
- **string**: text values.
- **number**: integers and decimals.
- **boolean**: true / false logic.
- **any**: turns off type-checking (use sparingly!).
- **unknown**: a safer counterpart to any, requiring a type check before operations.
- **void**: represents functions that return no value.

\`\`\`typescript
let characterName: string = "Garrick";
let healthPoints: number = 100;
let isMage: boolean = true;

// Typed array
let inventory: string[] = ["Mana Potion", "Scroll"];
\`\`\`
`,
    contentVi: `### Định Kiểu Tĩnh (Static Typing)
TypeScript bổ sung định nghĩa kiểu dữ liệu ngay trên mã nguồn JavaScript. Trình biên dịch sẽ kiểm tra các chú thích này trước khi chạy chương trình, giúp bạn phát hiện lỗi logic ngay trong lúc soạn thảo.

### Các Chú Thích Kiểu Cơ Bản
Chúng ta khai báo kiểu bằng cách viết dấu hai chấm sau tên biến kèm theo tên kiểu dữ liệu:
- **string**: Kiểu chuỗi văn bản.
- **number**: Kiểu số (nguyên và thực).
- **boolean**: Kiểu logic đúng hoặc sai.
- **any**: Tắt hoàn toàn việc kiểm tra kiểu (nên hạn chế dùng).
- **unknown**: Kiểu chưa xác định nhưng an toàn hơn any, yêu cầu phải kiểm tra kiểu trước khi xử lý dữ liệu.
- **void**: Đại diện cho hàm không trả về giá trị gì.

\`\`\`typescript
let characterName: string = "Garrick";
let healthPoints: number = 100;
let isMage: boolean = true;

// Định kiểu cho mảng
let inventory: string[] = ["Bình mana", "Cuộn phép"];
\`\`\`
`
  },
  {
    id: "ts-theory-2",
    titleEn: "2. Interfaces vs Type Aliases",
    titleVi: "2. Interface So Với Type Aliases",
    category: "TS",
    readTime: "4 min",
    contentEn: `### Object Shapes in TypeScript
We have two main ways to define structural shapes of objects in TypeScript: **Interfaces** and **Type Aliases**.

### Interfaces
Interfaces are open to extension and can merge if declared multiple times with the same name. They use the extends keyword for inheritance.
\`\`\`typescript
interface Item {
  id: string;
  price: number;
}

interface Shield extends Item {
  defense: number;
}
\`\`\`

### Type Aliases
Types are more flexible than interfaces. They can define objects, but also primitive values, union types, tuples, and intersections. They cannot be declaration-merged.
\`\`\`typescript
type Role = "Mage" | "Warrior" | "Rogue"; // Union Type
type Point = { x: number; y: number; };

// Intersection Type
type GuildMember = Point & { name: string; role: Role; };
\`\`\`
`,
    contentVi: `### Định Nghĩa Cấu Trúc Đối Tượng
Trong TypeScript, chúng ta có hai cách chính để định hình cấu trúc dữ liệu cho các đối tượng: **Interface** và **Type Alias**.

### Interfaces (Giao Diện)
Interface hoạt động chuyên biệt để định nghĩa cấu trúc đối tượng, hỗ trợ kế thừa bằng từ khóa extends và có khả năng gộp các khai báo trùng tên lại làm một.
\`\`\`typescript
interface Item {
  id: string;
  price: number;
}

interface Shield extends Item {
  defense: number;
}
\`\`\`

### Type Aliases (Bí Danh Kiểu)
Type linh hoạt hơn interface. Type có thể định nghĩa đối tượng, định nghĩa giá trị nguyên bản, kiểu kết hợp (union type), mảng cố định (tuples) hoặc phép giao (intersections). Type không thể khai báo trùng tên để tự gộp lại.
\`\`\`typescript
type Role = "Mage" | "Warrior" | "Rogue"; // Kiểu Union (kiểu hội)
type Point = { x: number; y: number; };

// Phép giao (Intersection) kết hợp nhiều kiểu
type GuildMember = Point & { name: string; role: Role; };
\`\`\`
`
  },
  {
    id: "ts-theory-3",
    titleEn: "3. Functions Typing & Overloads",
    titleVi: "3. Định Kiểu Cho Hàm & Overloads",
    category: "TS",
    readTime: "3 min",
    contentEn: `### Typed Parameters & Return Types
In TypeScript, we declare type definitions for both function input parameters and the output value:

\`\`\`typescript
function calculateDps(damage: number, speed: number): number {
  return damage * speed;
}
\`\`\`

### Optional & Default Parameters
You can specify optional parameters using a question mark, or supply default values directly:
\`\`\`typescript
function registerHero(name: string, title?: string): string {
  return title ? name + " the " + title : name;
}
\`\`\`

### Function Overloads
Function overloads allow you to declare multiple function signatures for a single function, letting you invoke a function in different ways depending on parameter types.
`,
    contentVi: `### Định Kiểu Tham Số & Giá Trị Trả Về
Trong TypeScript, chúng ta khai báo kiểu dữ liệu rõ ràng cho các tham số đầu vào và cả giá trị đầu ra của hàm:

\`\`\`typescript
function calculateDps(damage: number, speed: number): number {
  return damage * speed;
}
\`\`\`

### Tham Số Tùy Chọn & Mặc Định
Bạn có thể xác định một tham số là tùy chọn bằng cách sử dụng dấu chấm hỏi, hoặc cung cấp trực tiếp giá trị mặc định:
\`\`\`typescript
function registerHero(name: string, title?: string): string {
  return title ? name + " the " + title : name;
}
\`\`\`

### Quá Tải Hàm (Function Overloads)
Quá tải hàm cho phép bạn khai báo nhiều chữ ký (signatures) của hàm khác nhau cho cùng một hàm, giúp hàm có thể xử lý nhiều định dạng tham số truyền vào khác nhau.
`
  },
  {
    id: "ts-theory-4",
    titleEn: "4. Classes & Object Oriented Programming",
    titleVi: "4. Lớp & Lập Trình Hướng Đối Tượng",
    category: "TS",
    readTime: "4 min",
    contentEn: `### TypeScript Classes
TypeScript classes are syntactic blueprints for creating objects, supporting inheritance, encapsulation, and access modifiers.

### Access Modifiers
TypeScript provides visibility modifiers to restrict properties access:
- **public:** Accessible from anywhere (default).
- **private:** Accessible only within the declaring class.
- **protected:** Accessible within the declaring class and its subclasses.
- **readonly:** Immutable properties that must be set in constructor.

\`\`\`typescript
class Player {
  private level: number = 1;
  readonly name: string;

  constructor(name: string) {
    this.name = name;
  }

  public getLevel(): number {
    return this.level;
  }

  public levelUp(): void {
    this.level += 1;
  }
}
\`\`\`
`,
    contentVi: `### Lớp (Classes) Trong TypeScript
Class hoạt động như một bản vẽ thiết kế để tạo ra các đối tượng đối thoại thực tế, hỗ trợ các nguyên lý kế thừa, đóng gói và kiểm soát quyền truy cập thuộc tính.

### Các Bộ Từ Khóa Truy Cập (Access Modifiers)
TypeScript cung cấp các bộ từ khóa giúp giới hạn quyền thay đổi thuộc tính:
- **public:** Có thể truy cập tự do từ bất cứ đâu (mặc định).
- **private:** Chỉ có thể truy cập hoặc chỉnh sửa từ bên trong chính lớp đó.
- **protected:** Truy cập được từ bên trong lớp đó và các lớp con kế thừa từ nó.
- **readonly:** Thuộc tính chỉ đọc, chỉ có thể gán giá trị ở constructor và không thể thay đổi sau đó.

\`\`\`typescript
class Player {
  private level: number = 1;
  readonly name: string;

  constructor(name: string) {
    this.name = name;
  }

  public getLevel(): number {
    return this.level;
  }

  public levelUp(): void {
    this.level += 1;
  }
}
\`\`\`
`
  },
  {
    id: "ts-theory-5",
    titleEn: "5. Generics & Utility Types",
    titleVi: "5. Generics & Kiểu Tiện Ích",
    category: "TS",
    readTime: "4 min",
    contentEn: `### Understanding Generics
Generics introduce type parameterization. It acts like a variable for types, letting functions, classes, or interfaces work with different structures while preserving type safety.

We declare generics using angle brackets \`<T>\`.

\`\`\`typescript
interface Container<T> {
  contents: T;
}

const bag: Container<string> = { contents: "Healing Scroll" };
\`\`\`

### Common Utility Types
TypeScript built-in utility types help transform shapes quickly:
- **Partial<T>:** Makes all properties of T optional.
- **Readonly<T>:** Makes all properties of T read-only.
- **Record<K, T>:** Constructs an object type with keys K and values T.
- **Omit<T, K>:** Removes properties K from type T.
`,
    contentVi: `### Tìm Hiểu Về Generics
Generics mang khái niệm tham số hóa kiểu dữ liệu. Nó đóng vai trò giống như một biến chứa kiểu, giúp hàm, lớp hoặc giao diện hoạt động được với nhiều cấu trúc dữ liệu khác nhau nhưng vẫn giữ được tính an toàn kiểu.

Chúng ta khai báo generic bằng cặp ngoặc nhọn \`<T>\`.

\`\`\`typescript
interface Container<T> {
  contents: T;
}

const bag: Container<string> = { contents: "Healing Scroll" };
\`\`\`

### Các Kiểu Tiện Ích (Utility Types) Thường Dùng
TypeScript tích hợp sẵn các kiểu tiện ích giúp biến đổi nhanh cấu trúc dữ liệu:
- **Partial<T>:** Biến tất cả các thuộc tính của T thành tùy chọn (optional).
- **Readonly<T>:** Biến tất cả các thuộc tính của T thành chỉ đọc (readonly).
- **Record<K, T>:** Tạo cấu trúc đối tượng có khóa là K và giá trị là T.
- **Omit<T, K>:** Loại bỏ các thuộc tính khóa K ra khỏi kiểu dữ liệu T.
`
  }
];
