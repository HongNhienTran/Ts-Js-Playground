import { Lesson } from './jsLessons';

export const challenges: Lesson[] = [
  {
    id: "ch-1",
    titleEn: "Slay the Code Dragon",
    titleVi: "Hạ Gục Rồng Code",
    concept: "Complex Conditionals (FizzBuzz Style)",
    descriptionEn: `### 🐉 The Dragon's Pattern
The legendary Code Dragon breathes elemental fire at regular patterns based on its power level. To deflect its attacks, your defensive shield must cast different spells matching its power level:

- If the dragon's power level is **divisible by 3**, output \`"Water Shield"\`.
- If the dragon's power level is **divisible by 5**, output \`"Fire Shield"\`.
- If the dragon's power level is **divisible by both 3 and 5**, output \`"Omnishield"\`.
- Otherwise, output \`"Dodge"\`.

### 🛡️ Your Quest
Write a function named \`dragonDefense\` that takes a number \`powerLevel\` and returns the appropriate string command (exactly as capitalized above).`,
    descriptionVi: `### 🐉 Quy Luật Tấn Công Của Rồng
Rồng Code huyền thoại phun lửa theo các chu kỳ năng lượng tương ứng. Để phản đòn và dựng khiên chắn tối ưu, bạn phải điều khiển tấm khiên thi triển các spells tương thích với cấp sức mạnh của rồng:

- Nếu cấp sức mạnh của rồng **chia hết cho 3**, thi triển \`"Water Shield"\`.
- Nếu cấp sức mạnh của rồng **chia hết cho 5**, thi triển \`"Fire Shield"\`.
- Nếu cấp sức mạnh của rồng **chia hết cho cả 3 và 5**, thi triển \`"Omnishield"\`.
- Các trường hợp còn lại, xuất lệnh né đòn \`"Dodge"\`.

### 🛡️ Nhiệm Vụ Của Bạn
Viết một hàm tên là \`dragonDefense\` nhận vào một số đại diện cho cấp sức mạnh của rồng \`powerLevel\` và trả về chuỗi câu lệnh phòng thủ thích hợp (viết hoa chính xác như mô tả ở trên).`,
    starterCode: `function dragonDefense(powerLevel) {
  // Cast your shield spells here
}
`,
    xpReward: 60,
    difficulty: "Medium",
    tests: [
      {
        description: "dragonDefense should return 'Omnishield' for power 15",
        testScript: "if (dragonDefense(15) !== 'Omnishield') throw new Error('Expected Omnishield for power level 15, but got ' + dragonDefense(15));"
      },
      {
        description: "dragonDefense should return 'Water Shield' for power 9",
        testScript: "if (dragonDefense(9) !== 'Water Shield') throw new Error('Expected Water Shield for power level 9.');"
      },
      {
        description: "dragonDefense should return 'Fire Shield' for power 20",
        testScript: "if (dragonDefense(20) !== 'Fire Shield') throw new Error('Expected Fire Shield for power level 20.');"
      },
      {
        description: "dragonDefense should return 'Dodge' for power 7",
        testScript: "if (dragonDefense(7) !== 'Dodge') throw new Error('Expected Dodge for power level 7.');"
      }
    ]
  },
  {
    id: "ch-2",
    titleEn: "Cauldron Alchemy",
    titleVi: "Vạc Nung Giả Kim",
    concept: "Array Reduce & Objects",
    descriptionEn: `### 📜 The Alchemist's Cauldron
To forge an epic weapon, you must melt down materials in the magical crucible. You need to calculate the exact weight of materials to ensure the crucible doesn't overflow (maximum capacity is **1000 kg**).

### 🛡️ Your Quest
Write a function named \`calculateCauldronWeight\` that takes an array of items. Each item is an object:
\`\`\`javascript
{ name: "Iron Ore", weight: 150 }
\`\`\`
The function should sum the weights of all items and:
- Return the sum if it is less than or equal to 1000.
- Throw an error with the message \`"Cauldron overflow!"\` if the total weight exceeds 1000.

*Hint: Use the array method \`.reduce()\` to sum the weights.*`,
    descriptionVi: `### 📜 Vạc Nung Phép Thuật
Để rèn nên một vũ khí sử thi, bạn phải nấu chảy các nguyên liệu trong vạc luyện kim ma thuật. Bạn cần tính tổng trọng lượng của các nguyên liệu để đảm bảo vạc nấu không bị quá tải (sức chứa tối đa là **1000 kg**).

### 🛡️ Nhiệm Vụ Của Bạn
Viết một hàm tên là \`calculateCauldronWeight\` nhận vào một mảng chứa danh sách các vật phẩm. Mỗi vật phẩm là một đối tượng dạng:
\`\`\`javascript
{ name: "Iron Ore", weight: 150 }
\`\`\`
Hàm này sẽ tính tổng trọng lượng của toàn bộ các vật phẩm và:
- Trả về tổng trọng lượng nếu nó nhỏ hơn hoặc bằng 1000.
- Ném ra (throw) một lỗi có tin nhắn thông báo là \`"Cauldron overflow!"\` nếu tổng trọng lượng vượt quá 1000 kg.

*Gợi ý: Sử dụng phương thức mảng \`.reduce()\` để cộng dồn trọng lượng.*`,
    starterCode: `function calculateCauldronWeight(materials) {
  // Calculate total weight and return it, or throw error
}
`,
    xpReward: 80,
    difficulty: "Hard",
    tests: [
      {
        description: "calculateCauldronWeight should return sum of weights",
        testScript: `
          const items = [{name: 'Mithril', weight: 300}, {name: 'Dragon Scale', weight: 250}];
          if (calculateCauldronWeight(items) !== 550) {
            throw new Error("Expected weight 550, but got " + calculateCauldronWeight(items));
          }
        `
      },
      {
        description: "Should throw 'Cauldron overflow!' if total weight exceeds 1000",
        testScript: `
          const items = [{name: 'Mithril', weight: 800}, {name: 'Iron Ore', weight: 300}];
          let threw = false;
          try {
            calculateCauldronWeight(items);
          } catch (e) {
            if (e.message === "Cauldron overflow!") {
              threw = true;
            }
          }
          if (!threw) {
            throw new Error("Expected function to throw Error('Cauldron overflow!') when weight is 1100.");
          }
        `
      }
    ]
  },
  {
    id: "ch-3",
    titleEn: "Dungeon Pathfinding",
    titleVi: "Dò Đường Hầm Ngục",
    concept: "Recursion & Nested Structures",
    descriptionEn: `### 📜 The Relic Room
You are exploring a nested dungeon structure where rooms can branch into other rooms. You must search recursively through the rooms to find if the magical relic is hidden anywhere.

A dungeon room is shaped like this:
\`\`\`javascript
{
  name: "Chamber of Echoes",
  items: ["Rusty Sword", "Old Key"],
  subRooms: [
    {
      name: "Tomb of the Hero",
      items: ["Ancient Relic"],
      subRooms: []
    }
  ]
}
\`\`\`

### 🛡️ Your Quest
Write a function named \`containsRelic\` that takes a room object. It should search the current room's items for \`"Ancient Relic"\`. If not found, it must check all sub-rooms recursively.
- Return \`true\` if \`"Ancient Relic"\` is found anywhere in the room or its sub-rooms.
- Return \`false\` if it is not found anywhere.`,
    descriptionVi: `### 📜 Căn Phòng Hòm Báu
Bạn đang khám phá một hầm ngục nhiều tầng, trong đó mỗi phòng có thể rẽ nhánh dẫn đến các phòng con khác. Bạn phải thực hiện tìm kiếm đệ quy qua các căn phòng để xác định xem bảo vật cổ xưa có được giấu ở bất kỳ đâu không.

Cấu trúc một căn phòng hầm ngục trông như sau:
\`\`\`javascript
{
  name: "Chamber of Echoes",
  items: ["Rusty Sword", "Old Key"],
  subRooms: [
    {
      name: "Tomb of the Hero",
      items: ["Ancient Relic"],
      subRooms: []
    }
  ]
}
\`\`\`

### 🛡️ Nhiệm Vụ Của Bạn
Viết một hàm tên là \`containsRelic\` nhận vào một đối tượng phòng \`room\`. Hàm sẽ tìm kiếm xem trong danh sách vật phẩm (\`items\`) của phòng hiện tại có phần tử \`"Ancient Relic"\` hay không. Nếu không tìm thấy, nó phải tiếp tục kiểm tra đệ quy sâu vào tất cả các phòng con (\`subRooms\`).
- Trả về \`true\` nếu tìm thấy \`"Ancient Relic"\` ở phòng hiện tại hoặc bất kỳ phòng con nào bên dưới.
- Trả về \`false\` nếu không tìm thấy ở bất cứ đâu.`,
    starterCode: `function containsRelic(room) {
  // Recursively explore rooms to find "Ancient Relic"
}
`,
    xpReward: 100,
    difficulty: "Hard",
    tests: [
      {
        description: "Should find relic in immediate room",
        testScript: `
          const room = { name: "A", items: ["Ancient Relic"], subRooms: [] };
          if (containsRelic(room) !== true) throw new Error("Failed to find relic in the root room.");
        `
      },
      {
        description: "Should find relic in nested sub-rooms",
        testScript: `
          const room = {
            name: "A",
            items: ["Health Potion"],
            subRooms: [
              { name: "B", items: [], subRooms: [] },
              { name: "C", items: ["Gold", "Ancient Relic"], subRooms: [] }
            ]
          };
          if (containsRelic(room) !== true) throw new Error("Failed to find relic in nested sub-room C.");
        `
      },
      {
        description: "Should return false if relic is not present",
        testScript: `
          const room = {
            name: "A",
            items: ["Shield"],
            subRooms: [
              { name: "B", items: ["Gold"], subRooms: [] }
            ]
          };
          if (containsRelic(room) !== false) throw new Error("Expected false when there is no Ancient Relic.");
        `
      }
    ]
  }
];
