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
Declare the following variables with strict type annotations:
1. A variable named \`swordDamage\` annotated with type \`number\` and set to \`45\`.
2. A variable named \`isLegendary\` annotated with type \`boolean\` and set to \`true\`.
3. A variable named \`weaponName\` annotated with type \`string\` and set to \`"Excalibur"\`.
4. A variable named \`spellPower\` annotated with type \`number\` and set to \`80\`.
5. A variable named \`heroName\` annotated with type \`string\` and set to \`"Arthur"\`.`,
    descriptionVi: `### Cuộn Giấy Chú Thích Kiểu
TypeScript là một phần mở rộng khai báo kiểu dữ liệu cho JavaScript. Bằng cách chú thích rõ ràng kiểu dữ liệu cho biến, trình biên dịch sẽ đảm bảo không pháp sư nào dùng nhầm "bình máu" ở vị trí cần "thanh kiếm".

Chú thích kiểu cơ bản trông như thế này:
\`\`\`typescript
let level: number = 5;
let characterName: string = "Garrick";
let isDead: boolean = false;
\`\`\`

### Nhiệm Vụ Của Bạn
Khai báo các biến sau đây kèm theo chú thích kiểu dữ liệu nghiêm ngặt:
1. Một biến tên là \`swordDamage\` được chú thích kiểu \`number\` và gán giá trị bằng \`45\`.
2. Một biến tên là \`isLegendary\` được chú thích kiểu \`boolean\` và gán giá trị bằng \`true\`.
3. Một biến tên là \`weaponName\` được chú thích kiểu \`string\` và gán giá trị bằng \`"Excalibur"\`.
4. Một biến tên là \`spellPower\` được chú thích kiểu \`number\` và gán giá trị bằng \`80\`.
5. Một biến tên là \`heroName\` được chú thích kiểu \`string\` và gán giá trị bằng \`"Arthur"\`.`,
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
      },
      {
        description: "spellPower must be typed as a number",
        testScript: `
          if (!code.includes('spellPower') || !/spellPower\\s*:\\s*number/.test(code)) {
            throw new Error("spellPower must be declared with a 'number' type annotation.");
          }
          if (spellPower !== 80) throw new Error("spellPower must equal 80.");
        `
      },
      {
        description: "heroName must be typed as a string",
        testScript: `
          if (!code.includes('heroName') || !/heroName\\s*:\\s*string/.test(code)) {
            throw new Error("heroName must be declared with a 'string' type annotation.");
          }
          if (heroName !== "Arthur") throw new Error("heroName must equal 'Arthur'.");
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
        `
      },
      {
        description: "Hero interface level and role check",
        testScript: `
          if (!/level\\s*:\\s*number/.test(code)) throw new Error("Hero interface must include 'level: number'.");
          if (!/role\\s*:\\s*(['\"]Mage['\"]\\s*\\|\\s*['\"]Warrior['\"]\\s*\\|\\s*['\"]Cleric['\"]|['\"]Warrior['\"]\\s*\\|\\s*['\"]Mage['\"]\\s*\\|\\s*['\"]Cleric['\"])/.test(code)) {
            throw new Error("Hero interface must include 'role: \"Mage\" | \"Warrior\" | \"Cleric\"'.");
          }
        `
      },
      {
        description: "Hero interface must include optional gold",
        testScript: `
          if (!/gold\\s*\\?\\s*:\\s*number/.test(code)) {
            throw new Error("Hero interface must include optional 'gold?: number'.");
          }
        `
      },
      {
        description: "playerOne object must be defined",
        testScript: `
          if (typeof playerOne !== 'object') throw new Error("playerOne is not defined or is not an object.");
        `
      },
      {
        description: "playerOne must be explicitly type-annotated with Hero",
        testScript: `
          if (!/playerOne\\s*:\\s*Hero\\b/.test(code)) {
            throw new Error("playerOne must be explicitly type-annotated with the 'Hero' interface.");
          }
        `
      },
      {
        description: "playerOne name and level must match types",
        testScript: `
          if (typeof playerOne.name !== 'string') throw new Error("playerOne name should be a string.");
          if (typeof playerOne.level !== 'number') throw new Error("playerOne level should be a number.");
        `
      },
      {
        description: "playerOne role must be Mage, Warrior, or Cleric",
        testScript: `
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
        `
      },
      {
        description: "Chest interface must contain a 'loot' property of generic type",
        testScript: `
          if (!/loot\\s*:\\s*[A-Z]/.test(code)) {
            throw new Error("Chest interface must contain a 'loot' property of generic type (e.g. loot: T).");
          }
        `
      },
      {
        description: "Chest interface must contain an 'isLocked: boolean' property",
        testScript: `
          if (!/isLocked\\s*:\\s*boolean/.test(code)) {
            throw new Error("Chest interface must contain an 'isLocked: boolean' property.");
          }
        `
      },
      {
        description: "openChest function must be generic",
        testScript: `
          if (!/function\\s+openChest\\s*<\\s*[A-Z]\\s*>/.test(code) && !/const\\s+openChest\\s*=\\s*<\\s*[A-Z]\\s*>/.test(code)) {
            throw new Error("You must define a generic function named openChest (e.g. function openChest<T>(...) ).");
          }
        `
      },
      {
        description: "openChest should return the loot from the chest",
        testScript: `
          if (typeof openChest !== 'function') throw new Error("openChest is not a function.");
          const fakeChest = { loot: "Golden Ring", isLocked: false };
          if (openChest(fakeChest) !== "Golden Ring") {
            throw new Error("openChest should return the loot from the chest.");
          }
        `
      },
      {
        description: "openChest should handle numeric loot type",
        testScript: `
          const numChest = { loot: 999, isLocked: true };
          if (openChest(numChest) !== 999) {
            throw new Error("openChest failed to retrieve numeric loot.");
          }
        `
      },
      {
        description: "openChest should accept parameter typed as Chest<T>",
        testScript: `
          if (!/openChest\\s*<\\s*[A-Za-z]+\\s*>\\s*\\(\\s*\\w+\\s*:\\s*Chest\\s*<\\s*[A-Za-z]+\\s*>/.test(code) && !/\\(\\s*\\w+\\s*:\\s*Chest\\s*<\\s*[A-Za-z]+\\s*>\\s*\\)/.test(code)) {
            throw new Error("The function parameter must be explicitly typed as Chest<T>.");
          }
        `
      }
    ]
  },
  {
    id: "ts-4",
    titleEn: "The Spell of Fusion",
    titleVi: "Phép Thuật Hợp Nhất",
    concept: "Union Types & Type Aliases",
    descriptionEn: `### The Scroll of Union Types
Sometimes, a magical force can manifest in different formats: a scroll can cost either a raw number of mana crystals or a string detailing the currency. 

Wizards use type aliases and union types (\`|\`) to let variables hold one of several types.

\`\`\`typescript
type ManaCost = number | string;
\`\`\`

### Your Quest
1. Define a type alias named \`ManaValue\` that is a union of \`number\` and \`string\`.
2. Write a function named \`parseMana\` that takes a parameter named \`mana\` of type \`ManaValue\`.
3. The function must return a \`number\`. If \`mana\` is already a \`number\`, return it directly. If it is a \`string\`, parse it into a whole number using \`parseInt()\` and return it.`,
    descriptionVi: `### Cuộn Giấy Về Kiểu Hợp Nhất
Đôi khi, năng lượng ma thuật có thể thể hiện dưới nhiều định dạng khác nhau: chi phí của cuộn sách có thể là một con số thô hoặc một chuỗi chữ.

Các pháp sư dùng bí danh kiểu (type aliases) kết hợp kiểu hợp nhất (union types - \`|\`) để biến có thể giữ một trong nhiều kiểu dữ liệu.

\`\`\`typescript
type ManaCost = number | string;
\`\`\`

### Nhiệm Vụ Của Bạn
1. Định nghĩa một bí danh kiểu dữ liệu tên là \`ManaValue\` đại diện cho tập hợp gồm \`number\` hoặc \`string\`.
2. Viết một hàm tên là \`parseMana\` nhận vào một tham số tên là \`mana\` có kiểu \`ManaValue\`.
3. Hàm này phải trả về kiểu \`number\`. Nếu \`mana\` là một số, hãy trả về nó trực tiếp. Nếu nó là chuỗi, hãy phân tích nó thành số nguyên dùng \`parseInt()\` và trả về.`,
    starterCode: `// Define your type alias ManaValue below


// Write parseMana function below

`,
    xpReward: 40,
    difficulty: "Medium",
    tests: [
      {
        description: "ManaValue type alias must be defined",
        testScript: `
          if (!/type\\s+ManaValue\\b/.test(code)) {
            throw new Error("You must declare 'type ManaValue = ...'");
          }
        `
      },
      {
        description: "ManaValue must be a union of string and number",
        testScript: `
          if (!/ManaValue\\s*=\\s*(number\\s*\\|\\s*string|string\\s*\\|\\s*number)/.test(code)) {
            throw new Error("ManaValue must be string | number.");
          }
        `
      },
      {
        description: "parseMana function must be defined",
        testScript: `
          if (typeof parseMana !== 'function') throw new Error("parseMana is not a function.");
        `
      },
      {
        description: "parseMana must return a number directly if input is number",
        testScript: `
          if (parseMana(75) !== 75) throw new Error("parseMana should return 75 for number input 75.");
        `
      },
      {
        description: "parseMana must parse string to number correctly",
        testScript: `
          if (parseMana("150") !== 150) throw new Error("parseMana should return 150 for string input '150'.");
        `
      },
      {
        description: "parseMana should use parseInt for decimal strings",
        testScript: `
          if (parseMana("45.8") !== 45) throw new Error("parseMana should return 45 for '45.8' using parseInt.");
        `
      },
      {
        description: "parseMana input parameter must be type-annotated with ManaValue",
        testScript: `
          if (!/parseMana\\s*\\(\\s*mana\\s*:\\s*ManaValue/.test(code)) {
            throw new Error("parseMana input parameter 'mana' must be annotated with 'ManaValue'.");
          }
        `
      }
    ]
  },
  {
    id: "ts-5",
    titleEn: "The Guild Ranks",
    titleVi: "Phân Cấp Hội Pháp Sư",
    concept: "Enums",
    descriptionEn: `### The Tome of Enums
Enums allow us to define a set of named constants. This makes it easier to document intent or create a set of distinct cases.

\`\`\`typescript
enum MagicClass {
  Fire,
  Water,
  Earth
}
\`\`\`

### Your Quest
1. Create a numeric enum named \`GuildRank\` with these three members and explicit values:
   - \`Novice\` set to \`1\`
   - \`Mage\` set to \`2\`
   - \`Archmage\` set to \`3\`
2. Write a function named \`getRankBonus\` that takes a parameter named \`rank\` of type \`GuildRank\`.
3. The function should check the rank and return:
   - \`10\` for \`GuildRank.Novice\`
   - \`50\` for \`GuildRank.Mage\`
   - \`200\` for \`GuildRank.Archmage\``,
    descriptionVi: `### Cuộn Sách Về Enum
Enum cho phép chúng ta định nghĩa một tập hợp các hằng số được đặt tên. Điều này giúp dễ dàng mô tả rõ ràng các trường hợp cố định trong mã nguồn.

\`\`\`typescript
enum MagicClass {
  Fire,
  Water,
  Earth
}
\`\`\`

### Nhiệm Vụ Của Bạn
1. Tạo một enum dạng số tên là \`GuildRank\` với ba thành viên và giá trị gán rõ ràng:
   - \`Novice\` bằng \`1\`
   - \`Mage\` bằng \`2\`
   - \`Archmage\` bằng \`3\`
2. Viết một hàm tên là \`getRankBonus\` nhận vào một tham số tên là \`rank\` có kiểu \`GuildRank\`.
3. Hàm sẽ kiểm tra giá trị của cấp bậc và trả về:
   - \`10\` cho \`GuildRank.Novice\`
   - \`50\` cho \`GuildRank.Mage\`
   - \`200\` cho \`GuildRank.Archmage\``,
    starterCode: `// Define enum GuildRank below


// Write getRankBonus function below

`,
    xpReward: 35,
    difficulty: "Medium",
    tests: [
      {
        description: "GuildRank enum must be defined",
        testScript: `
          if (!/enum\\s+GuildRank\\b/.test(code)) {
            throw new Error("You must define an 'enum GuildRank'.");
          }
        `
      },
      {
        description: "GuildRank Novice must equal 1",
        testScript: `
          if (GuildRank.Novice !== 1) throw new Error("GuildRank.Novice must equal 1.");
        `
      },
      {
        description: "GuildRank Mage must equal 2",
        testScript: `
          if (GuildRank.Mage !== 2) throw new Error("GuildRank.Mage must equal 2.");
        `
      },
      {
        description: "GuildRank Archmage must equal 3",
        testScript: `
          if (GuildRank.Archmage !== 3) throw new Error("GuildRank.Archmage must equal 3.");
        `
      },
      {
        description: "getRankBonus function must be defined",
        testScript: `
          if (typeof getRankBonus !== 'function') throw new Error("getRankBonus is not a function.");
        `
      },
      {
        description: "getRankBonus should return correct value for Novice and Mage",
        testScript: `
          if (getRankBonus(GuildRank.Novice) !== 10) throw new Error("Novice rank should return 10.");
          if (getRankBonus(GuildRank.Mage) !== 50) throw new Error("Mage rank should return 50.");
        `
      },
      {
        description: "getRankBonus should return correct value for Archmage",
        testScript: `
          if (getRankBonus(GuildRank.Archmage) !== 200) throw new Error("Archmage rank should return 200.");
        `
      }
    ]
  },
  {
    id: "ts-6",
    titleEn: "Protected Relics",
    titleVi: "Bảo Vật Bất Khả Xâm Phạm",
    concept: "Optional & Readonly Properties",
    descriptionEn: `### Readonly & Optional Modifiers
In TypeScript interfaces, we can shield properties from being reassigned after initial creation using the \`readonly\` modifier. 
We can also mark properties as optional using \`?\`.

\`\`\`typescript
interface Spell {
  readonly id: string;
  name: string;
  manaCost?: number;
}
\`\`\`

### Your Quest
1. Define an interface named \`Relic\`. It must have:
   - A readonly property \`id\` of type \`string\`.
   - A property \`name\` of type \`string\`.
   - An optional property \`powerLevel\` of type \`number\`.
2. Write a function named \`upgradeRelic\` that takes two parameters:
   - \`relic\` of type \`Relic\`
   - \`bonus\` of type \`number\`
3. The function should return the sum of the relic's \`powerLevel\` and the \`bonus\`. If the relic does not have a \`powerLevel\`, use a default value of **\`100\`** as the base power.`,
    descriptionVi: `### Thuộc Tính Chỉ Đọc & Tùy Chọn
Trong các interface của TypeScript, chúng ta có thể ngăn chặn thuộc tính bị ghi đè sau khi khởi tạo bằng công cụ sửa đổi \`readonly\`.
Chúng ta cũng có thể đánh dấu một thuộc tính là tùy chọn bằng dấu hỏi \`?\`.

\`\`\`typescript
interface Spell {
  readonly id: string;
  name: string;
  manaCost?: number;
}
\`\`\`

### Nhiệm Vụ Của Bạn
1. Định nghĩa một interface tên là \`Relic\`. Nó phải gồm:
   - Một thuộc tính chỉ đọc \`readonly id\` có kiểu \`string\`.
   - Một thuộc tính \`name\` có kiểu \`string\`.
   - Một thuộc tính tùy chọn \`powerLevel\` có kiểu \`number\`.
2. Viết một hàm tên là \`upgradeRelic\` nhận vào hai tham số:
   - \`relic\` có kiểu \`Relic\`
   - \`bonus\` có kiểu \`number\`
3. Hàm này sẽ trả về tổng giá trị của \`powerLevel\` của relic và \`bonus\`. Nếu relic không có thuộc tính \`powerLevel\`, hãy sử dụng giá trị mặc định là **\`100\`** làm sức mạnh cơ bản.`,
    starterCode: `// Define interface Relic below


// Write upgradeRelic function below

`,
    xpReward: 40,
    difficulty: "Medium",
    tests: [
      {
        description: "Relic interface must be defined",
        testScript: `
          if (!/interface\\s+Relic\\b/.test(code)) {
            throw new Error("You must define an 'interface Relic'.");
          }
        `
      },
      {
        description: "Relic interface must declare id as readonly string",
        testScript: `
          if (!/readonly\\s+id\\s*:\\s*string/.test(code)) {
            throw new Error("Relic interface must contain 'readonly id: string'.");
          }
        `
      },
      {
        description: "Relic interface must declare powerLevel as optional number",
        testScript: `
          if (!/powerLevel\\s*\\?\\s*:\\s*number/.test(code)) {
            throw new Error("Relic interface must contain 'powerLevel?: number'.");
          }
        `
      },
      {
        description: "upgradeRelic function must be defined",
        testScript: `
          if (typeof upgradeRelic !== 'function') throw new Error("upgradeRelic is not defined.");
        `
      },
      {
        description: "upgradeRelic should sum powerLevel and bonus",
        testScript: `
          const relic = { id: "relic-01", name: "Amulet", powerLevel: 150 };
          if (upgradeRelic(relic, 25) !== 175) {
            throw new Error("Expected 175 for powerLevel 150 and bonus 25.");
          }
        `
      },
      {
        description: "upgradeRelic should default base power to 100 when powerLevel is missing",
        testScript: `
          const relic = { id: "relic-02", name: "Shield" };
          if (upgradeRelic(relic, 15) !== 115) {
            throw new Error("Expected 115 when powerLevel is missing and bonus is 15.");
          }
        `
      },
      {
        description: "Relic name must be typed as string",
        testScript: `
          if (!/name\\s*:\\s*string/.test(code)) {
            throw new Error("Relic interface must contain 'name: string'.");
          }
        `
      }
    ]
  },
  {
    id: "ts-7",
    titleEn: "Dimensional Coordinates",
    titleVi: "Tọa Độ Không Gian",
    concept: "Tuple Types",
    descriptionEn: `### The Spell of Tuples
A tuple type is a special array type that knows exactly how many elements it contains, and what types they have at specific indices.

\`\`\`typescript
let coordinates: [number, number] = [10, 20];
\`\`\`

### Your Quest
1. Define a type alias named \`Coordinate\` as a tuple type representing exactly two numbers: \`[number, number]\`.
2. Write a function named \`calculateDistance\` that takes two parameters:
   - \`p1\` of type \`Coordinate\`
   - \`p2\` of type \`Coordinate\`
3. The function should calculate and return the Manhattan distance between the two points, which is defined as: \`|p1[0] - p2[0]| + |p1[1] - p2[1]|\`.

*Hint: You can use \`Math.abs()\` to compute the absolute value of differences.*`,
    descriptionVi: `### Câu Thần Chú Bộ Ngăn (Tuples)
Kiểu dữ liệu tuple là một kiểu mảng đặc biệt biết chính xác nó chứa bao nhiêu phần tử, và các phần tử ở mỗi vị trí cụ thể có kiểu dữ liệu là gì.

\`\`\`typescript
let coordinates: [number, number] = [10, 20];
\`\`\`

### Nhiệm Vụ Của Bạn
1. Định nghĩa một bí danh kiểu dữ liệu tên là \`Coordinate\` có dạng một tuple đại diện cho đúng hai con số: \`[number, number]\`.
2. Viết một hàm tên là \`calculateDistance\` nhận vào hai tham số:
   - \`p1\` có kiểu \`Coordinate\`
   - \`p2\` có kiểu \`Coordinate\`
3. Hàm này sẽ tính toán và trả về khoảng cách Manhattan giữa hai điểm này, được tính bằng công thức: \`|p1[0] - p2[0]| + |p1[1] - p2[1]|\`.

*Gợi ý: Bạn có thể sử dụng \`Math.abs()\` để tính giá trị tuyệt đối.*`,
    starterCode: `// Define type alias Coordinate below


// Write calculateDistance function below

`,
    xpReward: 45,
    difficulty: "Medium",
    tests: [
      {
        description: "Coordinate type alias must be defined",
        testScript: `
          if (!/type\\s+Coordinate\\b/.test(code)) {
            throw new Error("You must define 'type Coordinate = ...'");
          }
        `
      },
      {
        description: "Coordinate must be typed as tuple [number, number]",
        testScript: `
          if (!/Coordinate\\s*=\\s*\\[\\s*number\\s*,\\s*number\\s*\\]/.test(code)) {
            throw new Error("Coordinate must be a tuple of [number, number].");
          }
        `
      },
      {
        description: "calculateDistance function must be defined",
        testScript: `
          if (typeof calculateDistance !== 'function') throw new Error("calculateDistance is not a function.");
        `
      },
      {
        description: "calculateDistance([0, 0], [3, 4]) must return 7",
        testScript: `
          if (calculateDistance([0, 0], [3, 4]) !== 7) throw new Error("Expected distance of 7.");
        `
      },
      {
        description: "calculateDistance([5, 10], [5, 10]) must return 0",
        testScript: `
          if (calculateDistance([5, 10], [5, 10]) !== 0) throw new Error("Expected distance of 0.");
        `
      },
      {
        description: "calculateDistance([-1, -2], [2, 2]) must return 7",
        testScript: `
          if (calculateDistance([-1, -2], [2, 2]) !== 7) throw new Error("Expected distance of 7 for negative coordinates.");
        `
      },
      {
        description: "calculateDistance inputs must be type-annotated with Coordinate",
        testScript: `
          if (!/calculateDistance\\s*\\(\\s*p1\\s*:\\s*Coordinate\\s*,\\s*p2\\s*:\\s*Coordinate/.test(code)) {
            throw new Error("Function parameters p1 and p2 must be annotated with type 'Coordinate'.");
          }
        `
      }
    ]
  }
];
