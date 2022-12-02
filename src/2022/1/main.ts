import fs from 'fs';

const main = async () => {
    const input = await fs.readFileSync('src/2022/1/input.txt', 'utf-8');
    const rows = input.split('\n');
    let currentElfCalories = 0;
    const elfCalories = [];

    rows.forEach((row) => {
        if (row === '') {
            elfCalories.push(currentElfCalories);
            currentElfCalories = 0;
            return;
        } else {
            currentElfCalories += parseInt(row);
        }
    });

    // Add the last elf's calories
    elfCalories.push(currentElfCalories);

    // find the biggest number
    const maxCalories = Math.max(...elfCalories);

    console.log(`Part one answer: ${maxCalories}`);

    // find the top three
    const topThree = elfCalories.sort((a, b) => b - a).slice(0, 3);

    console.log(`Part two answer: ${topThree[0] + topThree[1] + topThree[2]}`);
};

main();
