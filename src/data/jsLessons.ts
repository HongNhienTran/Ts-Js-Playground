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
      }
    ]
  }
];
