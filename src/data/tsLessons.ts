import { Lesson } from './jsLessons';

export const tsLessons: Lesson[] = [
  {
    id: "ts-1",
    titleEn: "Forge the Typed Sword",
    titleVi: "Rèn Kiếm Chú Thích Kiểu",
    concept: "Basic Type Annotations",
    descriptionEn: `### The Scroll of Typing
TypeScript is a typing extension for JavaScript. By annotating variables, the compiler ensures no wizard uses a "healing potion" where a "sword" is required.

Basic annotations look like this:
\`\`\`typescript
let level: number = 5;
let characterName: string = "Garrick";
let isDead: boolean = false;
\`\`\`

### Your Quest
Declare:
1. A variable named \`swordDamage\` annotated with the type \`number\` and set to \`45\`.
2. A variable named \`isLegendary\` annotated with the type \`boolean\` and set to \`true\`.
3. A variable named \`weaponName\` annotated with the type \`string\` and set to \`"Excalibur"\`.`,
    descriptionVi: `### Cuộn Giấy Chú Thích Kiểu
TypeScript là một phần mở rộng khai báo kiểu dữ liệu cho JavaScript. Bằng cách chú thích rõ ràng kiểu dữ liệu cho biến, trình biên dịch sẽ đảm bảo không pháp sư nào dùng nhầm "bình máu" ở vị trí cần "thanh kiếm".

Chú thích kiểu cơ bản trông như thế này:
\`\`\`typescript
let level: number = 5;
let characterName: string = "Garrick";
let isDead: boolean = false;
\`\`\`

### Nhiệm Vụ Của Bạn
Khai báo:
1. Một biến tên là \`swordDamage\` được chú thích kiểu \`number\` và gán giá trị bằng \`45\`.
2. Một biến tên là \`isLegendary\` được chú thích kiểu \`boolean\` và gán giá trị bằng \`true\`.
3. Một biến tên là \`weaponName\` được chú thích kiểu \`string\` và gán giá trị bằng \`"Excalibur"\`.`,
    starterCode: `// Declare your typed variables below
`,
    xpReward: 25,
    difficulty: "Easy",
    tests: [
      {
        description: "swordDamage must be typed as a number",
        testScript: `
          if (!code.includes('swordDamage') || !/swordDamage\\s*:\\s*number/.test(code)) {
            throw new Error("swordDamage must be declared with a strict 'number' type annotation (e.g. swordDamage: number).");
          }
          if (swordDamage !== 45) throw new Error("swordDamage must equal 45.");
        `
      },
      {
        description: "isLegendary must be typed as a boolean",
        testScript: `
          if (!code.includes('isLegendary') || !/isLegendary\\s*:\\s*boolean/.test(code)) {
            throw new Error("isLegendary must be declared with a 'boolean' type annotation.");
          }
          if (isLegendary !== true) throw new Error("isLegendary must equal true.");
        `
      },
      {
        description: "weaponName must be typed as a string",
        testScript: `
          if (!code.includes('weaponName') || !/weaponName\\s*:\\s*string/.test(code)) {
            throw new Error("weaponName must be declared with a 'string' type annotation.");
          }
          if (weaponName !== "Excalibur") throw new Error("weaponName must equal 'Excalibur'.");
        `
      }
    ]
  },
  {
    id: "ts-2",
    titleEn: "Create the Hero Sheet",
    titleVi: "Thiết Kế Hồ Sơ Anh Hùng",
    concept: "Interfaces",
    descriptionEn: `### The Parchment of Interfaces
Interfaces describe the "shape" of an object. They act as blueprints or contracts for objects.

\`\`\`typescript
interface Potion {
  name: string;
  restoreAmount: number;
  isCursed?: boolean; // Optional property
}
\`\`\`

### Your Quest
1. Define an interface named \`Hero\`. It should have:
   - \`name\`: type \`string\`
   - \`level\`: type \`number\`
   - \`role\`: a union of literal strings: \`"Mage" | "Warrior" | "Cleric"\`
   - \`gold\`: type \`number\` (optional, meaning it should end with a \`?\` mark)
2. Declare a constant variable named \`playerOne\` typed as \`Hero\` that matches your interface definition. (Assign a name, level, role, and optionally gold).`,
    descriptionVi: `### Cuộn Giấy Về Interface
Interface mô tả cấu trúc "hình dáng" của một đối tượng. Chúng hoạt động như bản vẽ thiết kế hoặc hợp đồng bắt buộc cho các đối tượng.

\`\`\`typescript
interface Potion {
  name: string;
  restoreAmount: number;
  isCursed?: boolean; // Thuộc tính tùy chọn
}
\`\`\`

### Nhiệm Vụ Của Bạn
1. Định nghĩa một interface tên là \`Hero\`. Nó phải gồm:
   - \`name\`: kiểu \`string\`
   - \`level\`: kiểu \`number\`
   - \`role\`: kiểu tập hợp chữ cố định: \`"Mage" | "Warrior" | "Cleric"\`
   - \`gold\`: kiểu \`number\` tùy chọn (kết thúc bằng dấu \`?\` đại diện cho thuộc tính không bắt buộc)
2. Khai báo một hằng số tên là \`playerOne\` được định kiểu là \`Hero\` khớp với cấu trúc interface vừa khai báo.`,
    starterCode: `// Define the interface Hero below

// Declare playerOne below
`,
    xpReward: 35,
    difficulty: "Medium",
    tests: [
      {
        description: "Hero interface must be defined with properties",
        testScript: `
          if (!/interface\\s+Hero\\b/.test(code)) {
            throw new Error("You must define an 'interface Hero'.");
          }
          if (!/name\\s*:\\s*string/.test(code)) throw new Error("Hero interface must include 'name: string'.");
          if (!/level\\s*:\\s*number/.test(code)) throw new Error("Hero interface must include 'level: number'.");
          if (!/role\\s*:\\s*(['\"]Mage['\"]\\s*\\|\\s*['\"]Warrior['\"]\\s*\\|\\s*['\"]Cleric['\"]|['\"]Warrior['\"]\\s*\\|\\s*['\"]Mage['\"]\\s*\\|\\s*['\"]Cleric['\"])/.test(code)) {
            throw new Error("Hero interface must include 'role: \"Mage\" | \"Warrior\" | \"Cleric\"'.");
          }
          if (!/gold\\s*\\?\\s*:\\s*number/.test(code)) {
            throw new Error("Hero interface must include optional 'gold?: number'.");
          }
        `
      },
      {
        description: "playerOne object must be defined and type-annotated with Hero",
        testScript: `
          if (!/playerOne\\s*:\\s*Hero\\b/.test(code)) {
            throw new Error("playerOne must be explicitly type-annotated with the 'Hero' interface.");
          }
          if (typeof playerOne !== 'object') throw new Error("playerOne is not defined or is not an object.");
          if (typeof playerOne.name !== 'string') throw new Error("playerOne name should be a string.");
          if (typeof playerOne.level !== 'number') throw new Error("playerOne level should be a number.");
          if (!['Mage', 'Warrior', 'Cleric'].includes(playerOne.role)) throw new Error("playerOne role must be Mage, Warrior, or Cleric.");
        `
      }
    ]
  },
  {
    id: "ts-3",
    titleEn: "The Generic Loot Box",
    titleVi: "Hòm Đồ Generic Kỳ Bí",
    concept: "Generics",
    descriptionEn: `### The Spell of Generics
A generic represents a type placeholder. It is written using angle brackets \`<T>\`. This allows you to build interfaces or functions that handle different types while keeping strict type checking.

\`\`\`typescript
interface Bag<T> {
  contents: T;
}
\`\`\`

### Your Quest
1. Create a generic interface named \`Chest<T>\`. It should have two properties:
   - \`loot\`: of type \`T\`
   - \`isLocked\`: of type \`boolean\`
2. Write a typed function named \`openChest<T>\` that takes one parameter:
   - \`chest\`: of type \`Chest<T>\`
   
   The function should return the \`loot\` property (which will be of type \`T\`).`,
    descriptionVi: `### Phép Thuật Tham Số Kiểu Generic
Generic đại diện cho một chỗ trống kiểu dữ liệu tạm thời. Nó được viết bằng các dấu ngoặc nhọn \`<T>\`. Nó cho phép bạn xây dựng các interface hoặc hàm hoạt động được với nhiều kiểu dữ liệu khác nhau nhưng vẫn giữ tính kiểm tra kiểu nghiêm ngặt.

\`\`\`typescript
interface Bag<T> {
  contents: T;
}
\`\`\`

### Nhiệm Vụ Của Bạn
1. Tạo một interface generic tên là \`Chest<T>\`. Nó phải có hai thuộc tính:
   - \`loot\`: kiểu dữ liệu generic \`T\`
   - \`isLocked\`: kiểu \`boolean\`
2. Viết một hàm generic tên là \`openChest<T>\` nhận vào một tham số:
   - \`chest\`: kiểu \`Chest<T>\`
   
   Hàm này sẽ trả về giá trị của thuộc tính \`loot\` (kiểu dữ liệu tương ứng là \`T\`).`,
    starterCode: `// Define interface Chest<T> here


// Write function openChest<T> here

`,
    xpReward: 50,
    difficulty: "Hard",
    tests: [
      {
        description: "Chest<T> interface must be generic and defined",
        testScript: `
          if (!/interface\\s+Chest\\s*<\\s*[A-Z]\\s*>/.test(code)) {
            throw new Error("You must define a generic 'interface Chest<T>'.");
          }
          if (!/loot\\s*:\\s*[A-Z]/.test(code)) {
            throw new Error("Chest interface must contain a 'loot' property of generic type (e.g. loot: T).");
          }
          if (!/isLocked\\s*:\\s*boolean/.test(code)) {
            throw new Error("Chest interface must contain an 'isLocked: boolean' property.");
          }
        `
      },
      {
        description: "openChest function must be generic and return the loot",
        testScript: `
          if (!/function\\s+openChest\\s*<\\s*[A-Z]\\s*>/.test(code) && !/const\\s+openChest\\s*=\\s*<\\s*[A-Z]\\s*>/.test(code)) {
            throw new Error("You must define a generic function named openChest (e.g. function openChest<T>(...) ).");
          }
          if (typeof openChest !== 'function') throw new Error("openChest is not a function.");
          
          const fakeChest = { loot: "Golden Ring", isLocked: false };
          if (openChest(fakeChest) !== "Golden Ring") {
            throw new Error("openChest should return the loot from the chest.");
          }
        `
      }
    ]
  }
];
