// --- ЗАДАНИЕ 1 ---
// Проблема была в том, что catch был пустым и глотал ошибку (helo is not defined).
// Теперь ошибка выводится в консоль.
function hello() {
  console.log('Skill');
}
try { 
  helo();
} catch (error) {
  console.error("Проблема в коде:", error.message); 
}
console.log('complete');


// --- ЗАДАНИЕ 2 ---
// Валидация имени внутри функции greeting. Бросаем ошибку, если пусто.
function greeting() {
  const username = prompt("Введите имя пользователя");
  if (!username || username.trim().length === 0) {
    throw new Error("Имя обязательно для заполнения");
  }
}

try { 
  greeting();
} catch(error) { 
  alert(error.message);
}


// --- ЗАДАНИЕ 3 ---
// Проблема была в том, что внутренний catch перехватывал вообще все ошибки.
// Добавили проверку: если ошибка глобальная (GlobalError) — пробрасываем её дальше.
function globalError() {
  const error = Error('Глобальная ошибка');
  error.name = 'GlobalError';
  throw error;
}

function localError() {
  const error = Error('Локальная ошибка');
  error.name = 'LocalError';
  throw error;
}

function testErrorScope(fn) {
  try {
    try {
      fn();
    } catch (error) {
      if (error.name === 'GlobalError') {
        throw error; // Пробрасываем во внешний catch
      }
      console.log('Обнаружена локальная ошибка');
      console.error(error);
    }
  } catch (error) {
    console.log('Обнаружена глобальная ошибка');
    console.error(error);
  }
}

testErrorScope(localError);
testErrorScope(globalError);