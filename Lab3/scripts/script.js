// ЧАСТИНА 1. Функціональне програмування та робота з масивами (Сервіси)

console.log("--- ЧАСТИНА 1: СЕРВІСИ ---");

// Створення 10 записів про сервіси
let services = [
    { id: 1, name: "Ремонт ПК", type: "Технічний", usersDay1: 15, usersDay2: 20, durationHours: 24, cost: 800 },
    { id: 2, name: "Консультація", type: "Юридичний", usersDay1: 5, usersDay2: 12, durationHours: 2, cost: 1000 },
    { id: 3, name: "Прибирання", type: "Побутовий", usersDay1: 45, usersDay2: 30, durationHours: 5, cost: 600 },
    { id: 4, name: "Налаштування ПЗ", type: "Технічний", usersDay1: 22, usersDay2: 18, durationHours: 2, cost: 400 },
    { id: 5, name: "Складання договору", type: "Юридичний", usersDay1: 8, usersDay2: 15, durationHours: 24, cost: 1500 },
    { id: 6, name: "Монтаж техніки", type: "Технічний", usersDay1: 30, usersDay2: 25, durationHours: 5, cost: 1200 },
    { id: 7, name: "Доставка", type: "Побутовий", usersDay1: 50, usersDay2: 60, durationHours: 2, cost: 200 },
    { id: 8, name: "Ремонт смартфону", type: "Технічний", usersDay1: 18, usersDay2: 22, durationHours: 24, cost: 900 },
    { id: 9, name: "Аудит", type: "Юридичний", usersDay1: 3, usersDay2: 4, durationHours: 48, cost: 5000 },
    { id: 10, name: "Хімчистка", type: "Побутовий", usersDay1: 12, usersDay2: 14, durationHours: 5, cost: 1300 }
];

// 1.1 Впорядкування за терміном тривалості та знаходження середньої кількості користувачів
function sortAndAverage(arr) {
    // Впорядкування за тривалістю (durationHours)
    let sorted = [...arr].sort((a, b) => a.durationHours - b.durationHours);
    console.log("1.1 Відсортовані сервіси за тривалістю:");
    sorted.forEach(s => console.log(`${s.name} - ${s.durationHours} год.`));

    // Знаходження середньої кількості користувачів за однаковим терміном
    let grouped = {};
    arr.forEach(s => {
        if (!grouped[s.durationHours]) grouped[s.durationHours] = { totalUsers: 0, daysCount: 0 };
        // Сумуємо користувачів за обидві доби
        grouped[s.durationHours].totalUsers += (s.usersDay1 + s.usersDay2);
        // Рахуємо кількість "діб", щоб знайти середнє значення на добу для даного терміну
        grouped[s.durationHours].daysCount += 2; 
    });

    console.log("\nСередня кількість користувачів для кожного терміну:");
    for (let duration in grouped) {
        let avg = grouped[duration].totalUsers / grouped[duration].daysCount;
        console.log(`Тривалість ${duration} год: середня кількість ${avg.toFixed(1)} користувачів на добу`);
    }
}
sortAndAverage(services);

// 1.2 Знаходження сервісу з максимальною кількістю користувачів за добу_2
function findMaxDay2Type(arr) {
    let maxService = arr.reduce((max, current) => current.usersDay2 > max.usersDay2 ? current : max, arr[0]);
    console.log(`\n1.2 Максимально користувачів за добу_2 у сервісу "${maxService.name}". Його тип: ${maxService.type}`);
}
findMaxDay2Type(services);

// 1.3 Додавання нового запису
function addNewService(arr, newRecord) {
    // Перевірка наявності всіх полів
    let isComplete = newRecord.id && newRecord.name && newRecord.type && 
                     newRecord.usersDay1 !== undefined && newRecord.usersDay2 !== undefined && 
                     newRecord.durationHours && newRecord.cost;

    if (!isComplete) {
        // Якщо інфо відсутня — в кінець
        arr.push(newRecord);
        console.log("\n1.3 Додано неповний запис у КІНЕЦЬ списку.");
    } else {
        // Якщо вся інфо є — сортуємо за вартістю і вставляємо у відповідне місце
        arr.sort((a, b) => a.cost - b.cost);
        let insertIndex = arr.findIndex(s => s.cost > newRecord.cost);
        if (insertIndex === -1) insertIndex = arr.length; // Якщо найдорожчий — в кінець відсортованого
        arr.splice(insertIndex, 0, newRecord);
        console.log("\n1.3 Повний запис додано із збереженням сортування за вартістю.");
    }
}

// Тестуємо 1.3
let incompleteService = { id: 11, name: "Оновлення ПЗ" }; // Неповний
let completeService = { id: 12, name: "Заміна екрану", type: "Технічний", usersDay1: 10, usersDay2: 12, durationHours: 10, cost: 1100 }; // Повний
addNewService(services, incompleteService);
addNewService(services, completeService);


// 1.4 Обчислення тривалості надання декількох сервісів (за типом)
function calculateNewDurations(servicesToProcess) {
    let count = servicesToProcess.length;
    let multiplier = 1;

    if (count === 1) {
        multiplier = 1;
    } else if (count > 1 && count <= 3) {
        multiplier = 1.1;
    } else {
        multiplier = 2;
    }

    console.log(`\n1.4 Обробка ${count} сервісів одночасно (коефіцієнт х${multiplier}):`);
    let updatedServices = servicesToProcess.map(s => {
        return { name: s.name, originalDuration: s.durationHours, newDuration: (s.durationHours * multiplier).toFixed(1) };
    });
    console.table(updatedServices);
}

// Тестуємо 1.4: передаємо масив із 2 сервісів технічного типу
let techServices = services.filter(s => s.type === "Технічний").slice(0, 2);
calculateNewDurations(techServices);

// ЧАСТИНА 2. Об'єктно-орієнтований підхід (Облікові записи)

console.log("\n\n--- ЧАСТИНА 2: КОРИСТУВАЧІ ---");

// Визначаємо клас для користувачів
class UserAccount {
    constructor(lastName, firstName, age, email, purpose, dateStr, timeStr) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.age = age;
        this.email = email;
        this.purpose = purpose;
        this.dateObj = new Date(dateStr); // Парсинг дати
        this.dateStr = dateStr;
        this.timeStr = timeStr;
    }

    getMonthNumber() {
        return this.dateObj.getMonth() + 1; // getMonth повертає 0-11, тому +1
    }
}

// 2. Створення 10 облікових записів
let users = [
    new UserAccount("Шевченко", "Іван", 20, "ivan@gmail.com", "побажання", "2026-10-15", "14:30"),
    new UserAccount("Коваленко", "Олена", 65, "olena@ukr.net", "претензія", "2026-10-15", "09:15"),
    new UserAccount("Бойко", "Петро", 40, "petro@yahoo.com", "питання", "2026-11-02", "11:00"),
    new UserAccount("Ткаченко", "Марія", 22, "maria@gmail.com", "побажання", "2026-10-20", "16:45"),
    new UserAccount("Кравченко", "Олег", 70, "oleg@test.com", "претензія", "2026-09-10", "10:00"),
    new UserAccount("Лисенко", "Анна", 35, "anna@ukr.net", "побажання", "2026-10-15", "14:30"), // Той самий місяць і час, що у Івана
    new UserAccount("Мельник", "Сергій", 18, "serg@gmail.com", "скарга", "2026-08-05", "12:00"),
    new UserAccount("Григоренко", "Ігор", 62, "igor@mail.com", "претензія", "2026-10-01", "08:30"),
    new UserAccount("Савченко", "Юлія", 30, "yulia@gmail.com", "консультація", "2026-12-12", "15:20"),
    new UserAccount("Павленко", "Максим", 24, "max@ukr.net", "побажання", "2026-07-22", "17:00")
];

// 2.1 Виведення користувачів, які звернулись впродовж певного місяця і часу
function findUsersByMonthAndTime(accounts, targetMonth, targetTime) {
    let result = accounts.filter(u => u.getMonthNumber() === targetMonth && u.timeStr === targetTime);
    console.log(`\n2.1 Звернення у ${targetMonth}-му місяці о ${targetTime}:`);
    result.forEach(u => console.log(`${u.lastName} ${u.firstName}`));
}
findUsersByMonthAndTime(users, 10, "14:30"); // Тест для жовтня (10) та 14:30


// 2.2 Мінімальний вік користувача, його E-mail та дата
function findMinAgeInfo(accounts) {
    // Використовую метод reduce для пошуку мінімуму
    let minAgeUser = accounts.reduce((min, current) => current.age < min.age ? current : min, accounts[0]);
    console.log(`\n2.2 Наймолодший користувач: вік ${minAgeUser.age}. Його E-mail: ${minAgeUser.email}. Дата: ${minAgeUser.dateStr}`);
}
findMinAgeInfo(users);


// 2.3 Розподіл на класи
function classifyUsers(accounts) {
    let classes = {
        "активна молодь": 0,
        "похилий претензійний": 0,
        "середній без претензій": 0,
        "інші": 0
    };

    accounts.forEach(u => {
        if (u.age <= 25 && u.purpose === "побажання") { // "активна молодь" (до 25 включно)
            classes["активна молодь"]++;
        } else if (u.age > 60 && u.purpose === "претензія") { // "похилий претензійний"
            classes["похилий претензійний"]++;
        } else if (u.age > 25 && u.age <= 60 && u.purpose !== "претензія") { // "середній без претензій"
            classes["середній без претензій"]++;
        } else {
            classes["інші"]++;
        }
    });

    console.log("\n2.3 Класифікація користувачів (кількість у кожному класі):");
    console.table(classes);
}
classifyUsers(users);


// 2.4 Сортування в алфавітному порядку E-mail із виведенням мети
function sortEmailsAndPrint(accounts) {
    // localeCompare забезпечує правильне алфавітне сортування рядків
    let sortedAccounts = [...accounts].sort((a, b) => a.email.localeCompare(b.email));
    
    console.log("\n2.4 Відсортовані користувачі за E-mail:");
    sortedAccounts.forEach(u => console.log(`${u.email}  -->  Мета: ${u.purpose}`));
}
sortEmailsAndPrint(users);