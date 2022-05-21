let courses = [
			{ name: "Courses in England", prices: [0, 100] }, 
			{ name: "Courses in Germany", prices: [500, null] }, 
			{ name: "Courses in Italy", prices: [100, 200] }, 
			{ name: "Courses in Russia", prices: [null, 400] },
			{ name: "Courses in China", prices: [50, 250] },
			{ name: "Courses in USA", prices: [200, null] },
			{ name: "Courses in Kazakhstan", prices: [56, 324] },
			{ name: "Courses in France", prices: [null, null] },
		];
		
		let requiredRange1 = [null, 200];
		let requiredRange2 = [100, 350];
		let requiredRange3 = [200, null];

		var res = courses.forEach(function (ob) {//Функция заменяющая значения null на 0 и бесконечность соответственно
			ob.prices[0] !=null ? ob.prices[0] : ob.prices[0] = 0;
			ob.prices[1]!=null ? ob.prices[1] : ob.prices[1] = Infinity;
		});
			
		function filterItems(query) {//функция фильтрации исходного массива по заданному параметру, принимает массив с верхним и нижним значением фильтра, возвращает отфильтрованный массив
			return courses.filter(function(el) {
				if (query[0] == null) {// заменяем значение null на 0 если необходимо
					query[0] = 0;
				}
				if (query[1] == null) {// заменяем значение null на бесконечность если необходимо
					query[1] = Infinity;
				}
				return (el.prices[0]<=query[0] && query[0]<=el.prices[1] || //если нижнее или верхнее значение параметра фильтрации попадает в ценовой диапазон курса, то обьект возвращается в массив, иначе отфильтровывается
				el.prices[0]<=query[1] && query[1]<=el.prices[1]);
			})  
		}

		function sortItems(query) { //Функция сортировки массива по параметру:возрастанию или убыванию,принимает параметр, возвращает отсортированный массив
			let sort_result = courses.slice(); //создаем клон исходного массива
			sort_result.sort(function (a, b) {
				switch (query) { //проверяем параметр по возрастанию или убыванию
					case 'up_price':
						if (a.prices[0] > b.prices[0]) {
						return 1;
						}
						if (a.prices[0] < b.prices[0]) {
						return -1;
						}
						return 0;
					break;
					case 'down_price':
						if (a.prices[0] < b.prices[0]) {
						return 1;
						}
						if (a.prices[0] > b.prices[0]) {
						return -1;
						}
						return 0;
					break;
					return;
				}
			})
			return sort_result;//возвращает отсортированный клон массива
		}

		function buttonAction(innertext) { //функция определяет действие кнопок, принимает парамметр innerText надписи на кнопках
		 
		const require = {//создаем обьект, ключами являются надписи на кнопках, значениями являются массивы из двух элементов. Первы элемент- передаваемый в вызываемую функцию параметр, второй элемент - идентификатор вызываемой функции
			'Курсы стоимостью до 200':[requiredRange2, 'filter'],
			'Курсы стоимостью от 100 до 350':[requiredRange2, 'filter'],
			'Курсы стоимостью от 200':[requiredRange3, 'filter'],
			'Отсортировать по возрастанию цены':['up_price', 'sort'],
			'Отсортировать по убыванию цены':['down_price', 'sort'],
			'Сбросить':['reset', 'reset'],
		}
		 
		switch (require[innertext][1]) {//перебираем идентификаторы вызываемых функций
			case 'filter':
				return filterItems(require[innertext][0]).map(e => `<div>${e.name}</div>`).join('');//передаем значение в функцию фильтрации
			break;
			case 'sort':
				return sortItems(require[innertext][0]).map(e => `<div>${e.name}</div>`).join('');//передаем значение в функцию сортировки
			break;
			case 'reset':
				return '';//обнуляем значение кнопкой сбросить
			break;
		}
		}

		document.querySelector('#all_courses').innerHTML = 
		courses.map(c => `<tr><td>${c.name}</td><td>${c.prices[0]}</td><td>${c.prices[1]}</td></tr>`).join(''); //выводим на страницу первоначальный массив в виде таблицы

		document.querySelector('#control-buttons').addEventListener('click', ({target}) => { // реакция на событие "клик мышки по кнопке"
		document.querySelector('#result_header').innerHTML = (target.innerText === 'Сбросить') //если нажата кнопка сбросить надпись "Результат" убрать, при нажатии любой другой кнопки - показать
			? ''
			: 'Результат:';
		  
		document.querySelector('#result').innerHTML = (target.innerText) 
		? buttonAction(target.innerText)//вызывается функция действия кнопок, в нее передается надпись с нажатой кнопки
		: '';
				
		})
