export interface Lesson {
  id: string;
  titleEn: string;
  titleVi: string;
  concept: string;
  descriptionEn: string;
  descriptionVi: string;
  starterCode: string;
  xpReward: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tests: {
    description: string;
    testScript: string;
  }[];
}

export const jsLessons: Lesson[] = [
  {
    id: "js-1",
    titleEn: "Declare the Mana Pool",
    titleVi: "Khai Báo Bể Mana",
    concept: "Variables & Data Types",
    descriptionEn: `### The Scroll of Variables
Every wizard needs a pool of mana to store magical energy. To write magical code, you must declare structures in memory to hold numbers, words, and spells.

In JavaScript, we declare variables that can change using \`let\`, and variables that stay constant using \`const\`.

### Your Quest
Declare a variable named \`manaPool\` using **\`let\`** and assign it the number **\`100\`**.
Then, declare a constant variable named \`SPELL_NAME\` using **\`const\`** and assign it the string **\`"Fireball"\`**.`,
    descriptionVi: `### Cuộn Giấy Khai Báo Biến
Mỗi pháp sư cần một bể mana để tích trữ năng lượng ma thuật. Để viết các câu lệnh ma thuật, bạn phải khai báo các cấu trúc trong bộ nhớ để lưu trữ số, từ ngữ và các câu thần chú.

Trong JavaScript, chúng ta khai báo các biến có thể thay đổi bằng \`let\`, và các biến giữ nguyên giá trị (hằng số) bằng \`const\`.

### Nhiệm Vụ Của Bạn
Khai báo một biến tên là \`manaPool\` dùng **\`let\`** và gán giá trị bằng số **\`100\`**.
Sau đó, khai báo một hằng số tên là \`SPELL_NAME\` dùng **\`const\`** và gán giá trị chuỗi **\`"Fireball"\`**.`,
    starterCode: `// Declare your variables below
`,
    xpReward: 20,
    difficulty: "Easy",
    tests: [
      {
        description: "Variable manaPool should be declared",
        testScript: "if (typeof manaPool === 'undefined') throw new Error('manaPool is not defined. Make sure you declared it.');"
      },
      {
        description: "manaPool should equal 100",
        testScript: "if (manaPool !== 100) throw new Error('manaPool should have the value 100.');"
      },
      {
        description: "manaPool should be declared with let (mutable)",
        testScript: `
          let works = true;
          try {
            manaPool = 150;
          } catch(e) {
            works = false;
          }
          if (!works) throw new Error('manaPool should be reassignable (declared with let).');
        `
      },
      {
        description: "SPELL_NAME should be declared and equal 'Fireball'",
        testScript: "if (typeof SPELL_NAME === 'undefined') throw new Error('SPELL_NAME is not defined.'); if (SPELL_NAME !== 'Fireball') throw new Error('SPELL_NAME should be equal to \"Fireball\"');"
      },
      {
        description: "SPELL_NAME should be declared with const (immutable)",
        testScript: `
          if (!/const\\s+SPELL_NAME\\b/.test(code)) {
            throw new Error('SPELL_NAME should be declared with const.');
          }
        `
      }
    ]
  },
  {
    id: "js-2",
    titleEn: "The Fireball Multiplier",
    titleVi: "Hệ Số Nhân Của Hỏa Cầu",
    concept: "Functions & Parameters",
    descriptionEn: `### The Tome of Functions
A function is a reusable incantation. You pass it ingredients (parameters) and it returns the result of the potion.

\`\`\`javascript
function castSpell(manaCost) {
  return "Spell cast with cost: " + manaCost;
}
\`\`\`

### Your Quest
Write a function named \`castFireball\` that takes two parameters:
1. \`baseDamage\` (a number)
2. \`multiplier\` (a number)

The function should multiply these two parameters together and **return** the total damage.`,
    descriptionVi: `### Sách Phép Về Hàm
Hàm là một câu thần chú có thể tái sử dụng. Bạn truyền cho nó các nguyên liệu (tham số) và nó sẽ trả về kết quả của bình thuốc.

\`\`\`javascript
function castSpell(manaCost) {
  return "Spell cast with cost: " + manaCost;
}
\`\`\`

### Nhiệm Vụ Của Bạn
Viết một hàm tên là \`castFireball\` nhận vào hai tham số:
1. \`baseDamage\` (sát thương cơ bản - một số)
2. \`multiplier\` (hệ số nhân - một số)

Hàm sẽ thực hiện nhân hai tham số này với nhau và **trả về (return)** tổng sát thương.`,
    starterCode: `function castFireball(baseDamage, multiplier) {
  // Write your code here
}
`,
    xpReward: 30,
    difficulty: "Easy",
    tests: [
      {
        description: "castFireball function should be defined",
        testScript: "if (typeof castFireball !== 'function') throw new Error('castFireball is not a function.');"
      },
      {
        description: "castFireball(10, 3) should return 30",
        testScript: "if (castFireball(10, 3) !== 30) throw new Error('Expected 30 damage for base 10 and multiplier 3, but got ' + castFireball(10, 3));"
      },
      {
        description: "castFireball(5, 5) should return 25",
        testScript: "if (castFireball(5, 5) !== 25) throw new Error('Expected 25 damage for base 5 and multiplier 5.');"
      },
      {
        description: "castFireball(0, 10) should return 0",
        testScript: "if (castFireball(0, 10) !== 0) throw new Error('Expected 0 damage when baseDamage is 0.');"
      },
      {
        description: "castFireball(100, 0.5) should return 50",
        testScript: "if (castFireball(100, 0.5) !== 50) throw new Error('Expected 50 damage for base 100 and multiplier 0.5.');"
      },
      {
        description: "castFireball(-5, 4) should return -20",
        testScript: "if (castFireball(-5, 4) !== -20) throw new Error('Expected -20 damage for negative baseDamage.');"
      },
      {
        description: "castFireball(12, 12) should return 144",
        testScript: "if (castFireball(12, 12) !== 144) throw new Error('Expected 144 damage for base 12 and multiplier 12.');"
      }
    ]
  },
  {
    id: "js-3",
    titleEn: "Filter Corrupted Loot",
    titleVi: "Lọc Lấy Chiến Lợi Phẩm Sạch",
    concept: "Array Filtering",
    descriptionEn: `### The Spell of Selection
When monsters drop loot, some items are cursed. Wizards use the \`filter\` array method to purify their inventory by filtering out unwanted items.

The \`.filter()\` method takes a callback function and returns a new array with all elements that pass the test.

\`\`\`javascript
const safeGold = goldPiles.filter(pile => pile > 0);
\`\`\`

### Your Quest
Write a function named \`purifyInventory\` that takes an array of item strings. It should return a **new array** containing only items that do **not** contain the word \`"Corrupted"\`.

*Hint: You can use the string method \`.includes()\` inside your filter.*`,
    descriptionVi: `### Phép Thuật Sàng Lọc
Khi quái vật rơi đồ, một số vật phẩm có thể bị nhiễm độc hoặc bị nguyền rủa. Các pháp sư dùng phương thức mảng \`filter\` để lọc bỏ các vật phẩm không mong muốn.

Phương thức \`.filter()\` nhận vào một hàm callback và trả về một mảng mới chỉ gồm các phần tử vượt qua bài kiểm tra.

\`\`\`javascript
const safeGold = goldPiles.filter(pile => pile > 0);
\`\`\`

### Nhiệm Vụ Của Bạn
Viết một hàm tên là \`purifyInventory\` nhận vào một mảng chứa tên các vật phẩm dạng chuỗi. Nó sẽ trả về một **mảng mới** chỉ chứa các vật phẩm **không** chứa từ \`"Corrupted"\` (Bị nguyền rủa).

*Gợi ý: Bạn có thể sử dụng phương thức chuỗi \`.includes()\` bên trong bộ lọc.*`,
    starterCode: `function purifyInventory(items) {
  // Write your code here
}
`,
    xpReward: 40,
    difficulty: "Medium",
    tests: [
      {
        description: "purifyInventory should be a function",
        testScript: "if (typeof purifyInventory !== 'function') throw new Error('purifyInventory is not defined.');"
      },
      {
        description: "Should filter out items containing 'Corrupted'",
        testScript: `
          const items = ["Epic Sword", "Corrupted Shield", "Health Potion", "Corrupted Ring"];
          const result = purifyInventory(items);
          if (result.includes("Corrupted Shield") || result.includes("Corrupted Ring")) {
            throw new Error("Inventory still contains corrupted items: " + result.join(', '));
          }
        `
      },
      {
        description: "Should preserve safe items",
        testScript: `
          const items = ["Epic Sword", "Corrupted Shield", "Health Potion", "Corrupted Ring"];
          const result = purifyInventory(items);
          if (result.length !== 2 || !result.includes("Epic Sword") || !result.includes("Health Potion")) {
            throw new Error("Missing items that should have been kept: " + result.join(', '));
          }
        `
      },
      {
        description: "Should return an empty array if all items are corrupted",
        testScript: `
          const items = ["Corrupted Bow", "Corrupted Axe"];
          const result = purifyInventory(items);
          if (result.length !== 0) throw new Error("Expected empty array but got: " + JSON.stringify(result));
        `
      },
      {
        description: "Should return identical array if no items are corrupted",
        testScript: `
          const items = ["Staff", "Robe"];
          const result = purifyInventory(items);
          if (result.length !== 2 || result[0] !== "Staff" || result[1] !== "Robe") {
            throw new Error("Expected identical array but got: " + JSON.stringify(result));
          }
        `
      },
      {
        description: "Should handle an empty inventory array",
        testScript: `
          const result = purifyInventory([]);
          if (!Array.isArray(result) || result.length !== 0) throw new Error("Expected empty array for empty input.");
        `
      },
      {
        description: "Should be case-sensitive for 'Corrupted' filtering",
        testScript: `
          const items = ["corrupted staff", "Corrupted Robe"];
          const result = purifyInventory(items);
          if (!result.includes("corrupted staff")) {
            throw new Error("Only exact match 'Corrupted' should be filtered out.");
          }
        `
      }
    ]
  },
  {
    id: "js-4",
    titleEn: "Double the Guild Gold",
    titleVi: "Nhân Đôi Vàng Của Hội",
    concept: "Array Mapping",
    descriptionEn: `### The Spell of Transmutation
The \`map\` array method is used to transform every single item in an array, returning a brand new array of the exact same length.

\`\`\`javascript
const doubledValues = numbers.map(num => num * 2);
\`\`\`

### Your Quest
Write a function named \`doubleGold\` that takes an array of numbers representing guild member gold bags. It should return a new array where the gold in each bag is doubled.`,
    descriptionVi: `### Phép Thuật Biến Đổi Mảng
Phương thức \`map\` được dùng để biến đổi từng phần tử trong mảng và trả về một mảng mới có độ dài chính xác tương đương.

\`\`\`javascript
const doubledValues = numbers.map(num => num * 2);
\`\`\`

### Nhiệm Vụ Của Bạn
Viết một hàm tên là \`doubleGold\` nhận vào một mảng chứa các số đại diện cho số vàng của mỗi thành viên hội. Nó phải trả về một mảng mới trong đó giá trị mỗi túi vàng được nhân đôi.`,
    starterCode: `function doubleGold(bags) {
  // Write your code here
}
`,
    xpReward: 35,
    difficulty: "Easy",
    tests: [
      {
        description: "doubleGold should be a function",
        testScript: "if (typeof doubleGold !== 'function') throw new Error('doubleGold is not defined.');"
      },
      {
        description: "Should double array values correctly",
        testScript: `
          const res = doubleGold([10, 20, 5]);
          if (res[0] !== 20 || res[1] !== 40 || res[2] !== 10) {
            throw new Error("Expected [20, 40, 10] but got " + JSON.stringify(res));
          }
        `
      },
      {
        description: "Should handle an empty array",
        testScript: `
          const res = doubleGold([]);
          if (!Array.isArray(res) || res.length !== 0) throw new Error("Expected empty array for empty input.");
        `
      },
      {
        description: "Should double negative values",
        testScript: `
          const res = doubleGold([-5, -10]);
          if (res[0] !== -10 || res[1] !== -20) throw new Error("Expected [-10, -20] for negative gold bags.");
        `
      },
      {
        description: "Should handle decimal values correctly",
        testScript: `
          const res = doubleGold([1.5, 4.25]);
          if (res[0] !== 3 || res[1] !== 8.5) throw new Error("Expected [3, 8.5] for decimal bags.");
        `
      },
      {
        description: "Should return a new array instead of modifying original",
        testScript: `
          const original = [1, 2];
          const res = doubleGold(original);
          if (res === original) throw new Error("Do not return the same array instance, map returns a new array.");
        `
      },
      {
        description: "Should double larger lists",
        testScript: `
          const res = doubleGold([1, 2, 3, 4]);
          if (res.length !== 4 || res[3] !== 8) throw new Error("Failed validation on four element array.");
        `
      }
    ]
  },
  {
    id: "js-5",
    titleEn: "The Async Summoning Rite",
    titleVi: "Nghi Thức Triệu Hồi Bất Đồng Bộ",
    concept: "Promises & Async/Await",
    descriptionEn: `### The Time Spell
Summoning monsters across dimensions takes time. In JavaScript, we represent tasks that take time using **Promises**.

We can create a Promise that executes after a delay using \`setTimeout\`:
\`\`\`javascript
const delaySpell = new Promise((resolve) => {
  setTimeout(() => resolve("Ready"), 100);
});
\`\`\`

### Your Quest
Write a function named \`summonFamiliar\` that returns a Promise. 
The Promise should wait for **100 milliseconds** (using \`setTimeout\`) and then resolve with the string \`"Familiar Summoned!"\`.`,
    descriptionVi: `### Câu Thần Chú Thời Gian
Triệu hồi linh thú hoặc quái vật xuyên không gian luôn cần thời gian. Trong JavaScript, chúng ta đại diện cho các tác vụ cần thời gian xử lý bằng **Promises**.

Chúng ta tạo một Promise chạy sau một thời gian chờ bằng cách kết hợp \`setTimeout\`:
\`\`\`javascript
const delaySpell = new Promise((resolve) => {
  setTimeout(() => resolve("Ready"), 100);
});
\`\`\`

### Nhiệm Vụ Của Bạn
Viết một hàm tên là \`summonFamiliar\` trả về một Promise. 
Promise này phải đợi **100 mili giây** (sử dụng \`setTimeout\`) và sau đó giải quyết (resolve) với chuỗi \`"Familiar Summoned!"\`.`,
    starterCode: `function summonFamiliar() {
  // Write code returning a Promise
}
`,
    xpReward: 50,
    difficulty: "Hard",
    tests: [
      {
        description: "summonFamiliar should return a Promise",
        testScript: `
          const p = summonFamiliar();
          if (!(p instanceof Promise)) {
            throw new Error("summonFamiliar did not return a Promise instance.");
          }
        `
      },
      {
        description: "Promise should resolve to 'Familiar Summoned!' after delay",
        testScript: `
          const start = Date.now();
          return summonFamiliar().then(result => {
            const duration = Date.now() - start;
            if (result !== "Familiar Summoned!") {
              throw new Error("Expected resolution value 'Familiar Summoned!' but got '" + result + "'");
            }
            if (duration < 80) {
              throw new Error("The summoning finished too quickly (took " + duration + "ms), did you set a 100ms timeout?");
            }
          });
        `
      },
      {
        description: "Promise should not resolve instantly",
        testScript: `
          let resolved = false;
          summonFamiliar().then(() => { resolved = true; });
          if (resolved) throw new Error("Promise resolved synchronously! It must use setTimeout delay.");
        `
      },
      {
        description: "Resolution value should be string type",
        testScript: `
          return summonFamiliar().then(result => {
            if (typeof result !== 'string') throw new Error("Expected string type resolution.");
          });
        `
      },
      {
        description: "Timeout should be approximately 100ms",
        testScript: `
          const start = Date.now();
          return summonFamiliar().then(() => {
            const duration = Date.now() - start;
            if (duration > 250) throw new Error("Timeout took too long (" + duration + "ms). Aim for 100ms.");
          });
        `
      },
      {
        description: "Must use setTimeout function",
        testScript: `
          if (!code.includes("setTimeout")) throw new Error("You must use setTimeout inside your Promise.");
        `
      },
      {
        description: "Function should not throw errors when called",
        testScript: `
          try {
            summonFamiliar();
          } catch(e) {
            throw new Error("Calling summonFamiliar threw a synchronous error: " + e.message);
          }
        `
      }
    ]
  },
  {
    id: "js-6",
    titleEn: "Destructuring the Magic Scrolls",
    titleVi: "Giải Mã Cuộn Sách Định Mệnh",
    concept: "Objects & Destructuring",
    descriptionEn: `### The Scroll of Destructuring
Wizards use the destructuring syntax to quickly extract magical properties from ancient scrolls without writing duplicate property accessor calls.

\`\`\`javascript
const { name, power } = spell;
\`\`\`

### Your Quest
Write a function named \`getScrollDetails\` that takes a \`scroll\` object.
Use object destructuring to extract \`title\`, \`power\`, and \`levelRequired\` from the \`scroll\`.
Provide a default value of **\`1\`** for \`levelRequired\` if it is missing.
Return a string formatted exactly as: \`"Scroll: [title] | Power: [power] | Level: [levelRequired]"\`.`,
    descriptionVi: `### Cuộn Giấy Rã Cấu Trúc
Các pháp sư dùng cú pháp rã cấu trúc (destructuring) để nhanh chóng rút trích các thuộc tính ma thuật từ cuộn sách cổ mà không cần lặp lại việc gọi khóa đối tượng.

\`\`\`javascript
const { name, power } = spell;
\`\`\`

### Nhiệm Vụ Của Bạn
Viết một hàm tên là \`getScrollDetails\` nhận vào một đối tượng \`scroll\`.
Sử dụng rã cấu trúc đối tượng để lấy ra các biến \`title\`, \`power\`, và \`levelRequired\`.
Gán giá trị mặc định bằng **\`1\`** cho \`levelRequired\` nếu thuộc tính này không tồn tại trong đối tượng.
Trả về chuỗi có định dạng chính xác: \`"Scroll: [title] | Power: [power] | Level: [levelRequired]"\`.`,
    starterCode: `function getScrollDetails(scroll) {
  // Destructure title, power, levelRequired (default to 1) from scroll
  // Return the formatted string
}
`,
    xpReward: 40,
    difficulty: "Medium",
    tests: [
      {
        description: "getScrollDetails should be a function",
        testScript: "if (typeof getScrollDetails !== 'function') throw new Error('getScrollDetails is not defined.');"
      },
      {
        description: "Should return correct format for complete scroll object",
        testScript: `
          const scroll = { title: "Blizzard", power: 85, levelRequired: 5 };
          const res = getScrollDetails(scroll);
          if (res !== "Scroll: Blizzard | Power: 85 | Level: 5") {
            throw new Error("Expected 'Scroll: Blizzard | Power: 85 | Level: 5' but got '" + res + "'");
          }
        `
      },
      {
        description: "Should use default levelRequired of 1 when missing",
        testScript: `
          const scroll = { title: "Spark", power: 12 };
          const res = getScrollDetails(scroll);
          if (res !== "Scroll: Spark | Power: 12 | Level: 1") {
            throw new Error("Expected default level 1 but got: " + res);
          }
        `
      },
      {
        description: "Should handle power value of 0 correctly",
        testScript: `
          const scroll = { title: "Poison", power: 0, levelRequired: 2 };
          const res = getScrollDetails(scroll);
          if (res !== "Scroll: Poison | Power: 0 | Level: 2") {
            throw new Error("Failed when power is 0. Got: " + res);
          }
        `
      },
      {
        description: "Must use destructuring syntax in the code",
        testScript: `
          if (!/\\{\\s*(title|power|levelRequired)\\b/.test(code)) {
            throw new Error("You must use object destructuring syntax (e.g., const { title, ... } = scroll).");
          }
        `
      },
      {
        description: "Should handle long scroll titles",
        testScript: `
          const scroll = { title: "Ultimate Shadow Realm Decimation Spell", power: 999 };
          const res = getScrollDetails(scroll);
          if (!res.includes("Ultimate Shadow Realm Decimation Spell")) {
            throw new Error("Title destructuring failed or title was truncated.");
          }
        `
      },
      {
        description: "Should return a string type",
        testScript: `
          const res = getScrollDetails({ title: "A", power: 1 });
          if (typeof res !== "string") throw new Error("Function should return a string.");
        `
      }
    ]
  },
  {
    id: "js-7",
    titleEn: "Warding Against Wild Spells",
    titleVi: "Khiên Chắn Phép Hỗn Loạn",
    concept: "Error Handling (try...catch)",
    descriptionEn: `### The Ward Spell
When casting experimental spells, they can explode and throw fatal runtime errors. Wizards use a \`try...catch\` barrier to prevent their program from crashing.

\`\`\`javascript
try {
  castUnstableSpell();
} catch (error) {
  console.log("Spell backfired: " + error.message);
}
\`\`\`

### Your Quest
Write a function named \`performSpellCast\` that takes one parameter: a function named \`spellFunc\`.
Execute \`spellFunc\` inside a \`try...catch\` block.
- If \`spellFunc\` executes successfully, **return** its return value.
- If it throws an error, catch the error and **return** the string: \`"Warded: [error.message]"\`.`,
    descriptionVi: `### Khiên Chắn Phép Thuật
Khi thi triển các phép thuật thử nghiệm, chúng có thể phát nổ và gây ra lỗi runtime. Các pháp sư dùng khối lệnh \`try...catch\` làm khiên bảo vệ để ngăn chương trình bị dừng đột ngột.

\`\`\`javascript
try {
  castUnstableSpell();
} catch (error) {
  console.log("Spell backfired: " + error.message);
}
\`\`\`

### Nhiệm Vụ Của Bạn
Viết một hàm tên là \`performSpellCast\` nhận vào một tham số: một hàm tên là \`spellFunc\`.
Chạy hàm \`spellFunc\` bên trong một khối lệnh \`try...catch\`.
- Nếu \`spellFunc\` chạy thành công, **trả về (return)** giá trị trả về của hàm đó.
- Nếu nó ném ra lỗi (throw error), hãy bắt (catch) lỗi đó và **trả về (return)** chuỗi: \`"Warded: [error.message]"\`.`,
    starterCode: `function performSpellCast(spellFunc) {
  // Execute spellFunc within a try-catch block
}
`,
    xpReward: 45,
    difficulty: "Medium",
    tests: [
      {
        description: "performSpellCast should be a function",
        testScript: "if (typeof performSpellCast !== 'function') throw new Error('performSpellCast is not defined.');"
      },
      {
        description: "Should return value of a successful spell function",
        testScript: `
          const successSpell = () => "Golden Sparkles";
          const res = performSpellCast(successSpell);
          if (res !== "Golden Sparkles") throw new Error("Expected successful spell return value, got: " + res);
        `
      },
      {
        description: "Should catch and format thrown errors",
        testScript: `
          const failedSpell = () => { throw new Error("Mana depletion!"); };
          const res = performSpellCast(failedSpell);
          if (res !== "Warded: Mana depletion!") {
            throw new Error("Expected 'Warded: Mana depletion!' but got '" + res + "'");
          }
        `
      },
      {
        description: "Should handle custom errors with messages",
        testScript: `
          const failedSpell = () => { throw new TypeError("Wrong wand!"); };
          const res = performSpellCast(failedSpell);
          if (res !== "Warded: Wrong wand!") {
            throw new Error("Failed to capture correct error message: " + res);
          }
        `
      },
      {
        description: "Should support spells returning undefined",
        testScript: `
          const emptySpell = () => {};
          const res = performSpellCast(emptySpell);
          if (typeof res !== 'undefined') throw new Error("Expected undefined return value from successful spell returning nothing.");
        `
      },
      {
        description: "Must contain a try-catch block",
        testScript: `
          if (!code.includes("try") || !code.includes("catch")) {
            throw new Error("Your code must implement a 'try { ... } catch(e) { ... }' construct.");
          }
        `
      },
      {
        description: "Should call the spellFunc exactly once",
        testScript: `
          let callCount = 0;
          const counterSpell = () => { callCount++; return "Ok"; };
          performSpellCast(counterSpell);
          if (callCount !== 1) throw new Error("spellFunc must be executed exactly 1 time.");
        `
      }
    ]
  }
];
