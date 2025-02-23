//Задача № 1
function cachingDecoratorNew(func) {
    let cache = [];

    function wrapper(...args) {
        const hash = md5(args.toString()); // получаем правильный хеш c помощью функции md5
        let objectInCache = cache.find((item) => item.hash === hash); // ищем элемент, хеш которого равен нашему хешу
        if (objectInCache) { // если элемент найден
            console.log("Из кеша: " + objectInCache.result); // индекс нам известен, по индексу в массиве лежит объект, как получить нужное значение?
            return "Из кеша: " + objectInCache.result;
        }
  
        let result = func(...args); // в кеше результата нет — придётся считать
        cache.push({"hash": hash, "result": result}) ; // добавляем элемент с правильной структурой
        if (cache.length > 5) { 
          cache.shift() // если слишком много элементов в кеше, надо удалить самый старый (первый) 
        }
        console.log("Вычисляем: " + result);
        return "Вычисляем: " + result;  
    }
    return wrapper;
  }

//Задача № 2
function debounceDecoratorNew(func, delay) {
  let timeoutId;

  function wrapper(...args) {
    wrapper.allCount += 1;
    const f = function () {
      func(...args);
      wrapper.count += 1;
      timeoutId = null;
    }

    if (typeof timeoutId === 'undefined') {
      f(); // синхронный вызов
    }
    if (timeoutId !== null) {
      clearTimeout(timeoutId); // очищаем таймаут, если он не очищен
    }
    timeoutId = setTimeout(f, delay);
  }

  wrapper.count = 0;
  wrapper.allCount = 0;
  return wrapper;
}
