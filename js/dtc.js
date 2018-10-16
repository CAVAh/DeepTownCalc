let sortingMines = [];
let needsList = [];
let itemArray = [];
let invArray = [];
let recursionCount = 0;
const noTime = ["shop", "waterCollection", "oilPumping"];
let language = 'en-US';

function submitButton(){
	sortingMines = [];
	needsList = [];
	itemArray = [];
	invArray = [];
	recursionCount = 0;

	const what = document.getElementsByClassName("what");
	const howMany = document.getElementsByClassName("how-many");
	const inventory = document.getElementsByClassName("inv");

	for (let i = 0; i < what.length; i++){
		const item = {};
		item.name = what[i].value;
		item.quantity = howMany[i].value;

		if (itemArray.length === 0){
			itemArray.push(item);
		} else {
			let matchCounter = 0;
			for (let j = itemArray.length -1; j >=0; j--){
				if (itemArray[j].name === item.name){
					itemArray[j].quantity = parseFloat(itemArray[j].quantity) + parseFloat(item.quantity);
					break;
				} else {
					matchCounter++;
					if (matchCounter === itemArray.length){
						itemArray.push(item);
					}
				}
			}
		}
	}

	const availableMines = document.getElementById("mines").value;
	const maxArea = document.getElementById("area").value;

	for (let i = 0; i < inventory.length; i++){
		inventory[i].parentNode.classList.add("hidden");
		const invItem = {};
		invItem.name = inventory[i].name;
		invItem.quantity = inventory[i].value; 
		if (inventory[i].value > 0){
			invArray.push(invItem);
		}
	}

	const matList = document.getElementsByClassName("mat");
	for (let i = 0; i < matList.length; i++){
		matList[i].parentNode.classList.add("hidden");
	}
	makeInputNeeds(availableMines, maxArea);
}

function makeInputNeeds(availableMines, maxArea){
	itemArray.forEach(function(e){
		makeThese(e.name, e.quantity);
	});

	findMines(maxArea, availableMines);
}

function makeThese(stuff, quant){
	//check the coal source slider
	if (stuff === "coal"){
		const coalRatio = document.getElementById("coal").innerHTML;
		const coalQuant = Math.ceil(quant * coalRatio / 100);	
		if (quant - coalQuant){
			makeThese("charcoal", Math.ceil(quant * (100-coalRatio) / 100));
		}
		quant = coalQuant;
	}

	invArray.forEach(function(inventoryItem){
		if(stuff === inventoryItem.name && inventoryItem.quantity > 0){
			let reduce = inventoryItem.quantity;
			inventoryItem.quantity -= quant;
			quant -= reduce;
			quant = (quant < 0) ? 0 : quant;
		}
	});

	const material = materials.filter(function(e){
		return e.name === stuff;
	})[0];

	//build array of all needs

	//add stations to material for bottleneck use
	material.quantity = quant;
	const matStation = document.getElementsByClassName("mat");
	const matStat = Array.prototype.filter.call(matStation, function(e){
		return e.dataset.name === material.name;
	})[0];
	
	material.stations = matStat.nextElementSibling.nextElementSibling.innerHTML;

	//this is to calculate bottleneck
	if (!material.hasOwnProperty("time")){
		material.time = 0;
	}

	if (material.hasOwnProperty("batch")){
		material.batches = Math.ceil(quant / material.batch);
	} else {
		material.batches = quant;
	}

	if (quant > 0){
		if (needsList.length === 0){
			needsList.push(Object.assign({}, material));
		} else {
			let matchCounter = 0;
			for (let i = needsList.length - 1; i >= 0; i--){
				if (needsList[i].name === material.name){
					needsList[i].quantity = parseInt(needsList[i].quantity) + parseInt(quant);
					break;
				} else {
					matchCounter++;
					if (matchCounter === needsList.length){
						needsList.push(Object.assign({}, material));
					}
				}
			}
		}
	}
	
	//recurse if necessary
	let q;
	if (material.hasOwnProperty("toMake")){
		material.toMake.forEach(function(e){
			q = material.batches * e.quantity;
			makeThese(e.thing, q);
		});
	}
}

function findMines (maxArea, availableMines) {
	let minableSum = 0;
	let needSum = 0;
	let minableNeeds = 0;

	needsList.forEach(function(miningNeed){
		miningNeed.totalMinable = 0;
		if (miningNeed.source === "mining"){
			minableNeeds++;
			needSum += parseFloat(miningNeed.quantity);
	
			const toMine = miningNeed.name;
			mines.forEach(function(mine){
				if (maxArea - mine.area >= 0 && mine.hasOwnProperty(toMine)){
					if (sortingMines.length === 0){
						sortingMines.push(Object.assign({}, mine));
						sortingMines[sortingMines.length-1].howMuch = mine[toMine];

						miningNeed.totalMinable = parseFloat(miningNeed.totalMinable) + parseFloat(mine[toMine]);
						minableSum += parseFloat(mine[toMine]);

					} else {
						let found;
						let i;

						for (i = 0; i < sortingMines.length; i++){
							if (sortingMines[i].area === mine.area){
								found = true;
								break;
							}
						}

						if (found){
							sortingMines[i].howMuch = parseFloat(sortingMines[i].howMuch) + parseFloat(mine[toMine]);
							miningNeed.totalMinable = parseFloat(miningNeed.totalMinable) + parseFloat(mine[toMine]);
							minableSum += parseFloat(mine[toMine]);

						} else {
							sortingMines.push(Object.assign({}, mine));
							sortingMines[sortingMines.length-1].howMuch = mine[toMine];
							miningNeed.totalMinable = parseFloat(miningNeed.totalMinable) + parseFloat(mine[toMine]);
							minableSum += parseFloat(mine[toMine]);
						}
					}
				}
			});
		}
	});
	miningAlgorithm(availableMines, minableSum, needSum, minableNeeds);
}

function miningAlgorithm(availableMines, minableSum, needSum, minableNeeds) {
	for (let i = 0; i < availableMines; i++){
		let weightedNeedSum = 0;
		needsList.forEach(function(miningNeed){
			if (miningNeed.source === "mining"){
				miningNeed.percentOfTotalMinable = miningNeed.totalMinable / minableSum;

				if (miningNeed.hasOwnProperty("runningSum")){
					miningNeed.weightedNeed = (parseFloat(miningNeed.quantity) / needSum * availableMines * 100) - parseFloat(miningNeed.runningSum);
				} else {
					miningNeed.weightedNeed = (parseFloat(miningNeed.quantity) / needSum * availableMines * 100);
				}

				if (miningNeed.weightedNeed < 0){
					miningNeed.weightedNeed = 0;
					//remove current need from sortingMines
					sortingMines.forEach(function(e){
						if (e.hasOwnProperty(miningNeed.name)){
							e.howMuch -= e[miningNeed.name];
							delete e[miningNeed.name];
						}
					});
				}

				weightedNeedSum += parseFloat(miningNeed.weightedNeed);

			}
		});

		needsList.forEach(function(miningNeed){
			if (miningNeed.source === "mining"){
				miningNeed.percentofWeightedNeed = parseFloat(miningNeed.weightedNeed) / weightedNeedSum;
				miningNeed.priority = parseFloat(miningNeed.percentofWeightedNeed) / parseFloat(miningNeed.percentOfTotalMinable);
			} else {
				miningNeed.priority = 0;	
			}
		});

		needsList.sort(function(a, b){
			return b.priority - a.priority;
		});

		sortingMines.sort(function(a, b){
			return b.howMuch - a.howMuch;
		});

		//check to see that each mined material has at least one mine

		// check each minable need against sortingMines

		//if sortingMines doesn't have a mine to produce the need, make that the top priority
		if (i >= availableMines - minableNeeds){
			checkForOrphanNeeds:
			for (let j = 0; j < needsList.length; j++){
				if (needsList[j].source === "mining" && !needsList[j].hasOwnProperty("checked")){
					needsList[j].checked = true;
					let matchCounter = 0;

					for (let k = 0; k < sortingMines.length; k++){
						if (sortingMines[k].hasOwnProperty(needsList[j].name) && sortingMines[k].hasOwnProperty("order")){
							break checkForOrphanNeeds;
						} else {
							matchCounter++;
							if (matchCounter === sortingMines.length){
								needsList.unshift(needsList[j]);
								needsList.splice([j+1], 1);
							}
						}
					}
				}
			}	
		}
		chooseMine(i);
	}
	const sortedMines = [];
	sortingMines.forEach(function(e){
		if(e.hasOwnProperty("order")){
			sortedMines.push(e);
		}
	});

	displayMines(sortedMines);
}

function chooseMine(orderIndex){
	getHighestPriority:
	for (let l = 0; l < needsList.length; l++){
		for (let m = 0; m < sortingMines.length; m++){
			if (sortingMines[m].hasOwnProperty(needsList[l].name) && sortingMines[m].howMuch > 0){
				sortingMines[m].order = orderIndex;
				sortingMines[m].howMuch = 0;
				needsList.forEach(function(miningNeed){
					if (miningNeed.source === "mining"){
						if (sortingMines[m].hasOwnProperty(miningNeed.name)){
							if (miningNeed.hasOwnProperty("runningSum")){
								miningNeed.runningSum += parseFloat(sortingMines[m][miningNeed.name]);
							} else {
								miningNeed.runningSum = parseFloat(sortingMines[m][miningNeed.name]);
							}
						}
					}
				});
				break getHighestPriority;
			}
		}
	}
}

function displayMines (sortedMines) {
	$('#mine-result').removeClass('hidden');

	if (sortedMines.length === 0) {
		$('#p-mine').show();
		$('#mine-priority').hide();
		$('#mine-area').hide();
	} else {
		$('#p-mine').hide();
		$('#mine-priority').show();
		$('#mine-area').hide();
		let minesLevel = JSON.parse(localStorage.getItem('minesLevel'));

		// Display mines list sorted by priority
		sortedMines.sort(function (a, b) {
			return a.order - b.order;
		});

		$('#mine-priority table tbody').empty();

		$.each(sortedMines, function (i, mine) {
			let level = 1;

			if(minesLevel) {
				level = minesLevel[parseInt(mine.area, 10)] || 1;
			}

			$('#mine-priority table tbody').append(
				$('<tr>').append(
					$('<td>').append(
						$('<span>', {
							'class': 'area-priority'
						}).text('Area ' + mine.area)
					),
					$('<td>').append(
						$('<input>', {
							'type': 'number',
							'class': 'mine-level',
							'data-area': mine.area,
							'max': 9,
							'min': 0,
							'value': level
						}).on('input', function() {
							$('#mine-area input[data-area="' + $(this).data('area') + '"]').val($(this).val());
							displayNeeds();
						})
					)
				)
			);
		});

		// Display mines list sorted by area
		sortedMines.sort(function (a, b) {
			return a.area - b.area;
		});

		$('#mine-area table tbody').empty();

		$.each(sortedMines, function (i, mine) {
			let level = 1;

			if(minesLevel) {
				level = minesLevel[parseInt(mine.area, 10)] || 1;
			}

			$('#mine-area table tbody').append(
				$('<tr>').append(
					$('<td>').append(
						$('<span>', {
							'class': 'area-area'
						}).text('Area ' + mine.area)
					),
					$('<td>').append(
						$('<input>', {
							'type': 'number',
							'class': 'mine-level',
							'data-area': mine.area,
							'max': 9,
							'min': 0,
							'value': level
						}).on('input', function() {
							$('#mine-priority input[data-area="' + $(this).data('area') + '"]').val($(this).val());
							displayNeeds();
						})
					)
				)
			);
		});
	}

	displayNeeds();
}

function displayNeeds(){
	//sort needsList by source, then by quantity
	needsList.sort(function(a, b){
		if (a.source === b.source){
			return (a.quantity < b.quantity) ? 1 : (a.quantity > b.quantity) ? -1 : 0;
		} else {
			return (a.source > b.source) ? -1 : 1;
		}
	});
	
	const matDiv = document.getElementsByClassName("mat");
	const invDiv = document.getElementsByClassName("inv");
	let bottleneck = Math.max.apply(Math, needsList.map(function(e){
		return Math.ceil(parseInt(e.batches) * parseInt(e.time) / e.stations);
	}));

	for (let i = 0; i < needsList.length; i++) {
		if (needsList[i].source === 'mining') {
			let resourcesByMin = calcTimeMining(needsList[i].name);

			if (resourcesByMin === 0) {
				needsList[i].timeTotal = 0;
			} else {
				const quant = Math.ceil(needsList[i].quantity / needsList[i].stations);
				needsList[i].timeTotal = Math.ceil(quant / resourcesByMin * 60);

				if(bottleneck < needsList[i].timeTotal) {
					bottleneck = needsList[i].timeTotal;
				}
			}
		}
	}

	for (let i = 0; i < needsList.length; i++) {
		for (let j = 0; j < matDiv.length; j++) {
			if (needsList[i].name === matDiv[j].dataset.name) {
				const quant = Math.ceil(needsList[i].quantity / needsList[i].stations);
				const quantStr = quant.toLocaleString(language);

				matDiv[j].classList.remove('bottleneck');
				matDiv[j].parentNode.classList.remove('hidden');
				invDiv[j].parentNode.classList.remove('hidden');
				matDiv[j].previousElementSibling.innerHTML = quantStr + '&nbsp;';

				if (needsList[i].quantity > 0) {
					const time = [0, 0, 0, 0];
					let ti;
					let timeStr = '';

					if (!noTime.includes(needsList[i].source)) {
						if (needsList[i].source === 'mining') {
							ti = needsList[i].timeTotal;
						} else {
							ti = Math.ceil(needsList[i].time / needsList[i].stations * needsList[i].batches);
						}

						if (ti !== 0) {
							if (ti === bottleneck) {
								matDiv[j].classList.add('bottleneck');
							}

							if (ti < needsList[i].time) {
								ti = needsList[i].time;
							}

							if (ti >= 86400) {
								time[0] = Math.floor(ti / 86400);
								ti -= time[0] * 86400;
							}

							if (ti >= 3600) {
								time[1] = Math.floor(ti / 3600);
								ti -= time[1] * 3600;
							}

							if (ti >= 60) {
								time[2] = Math.floor(ti / 60);
								ti -= time[2] * 60;
							}

							time[3] = Math.ceil(ti);

							time.forEach(function (value, index, time) {
								if (value === 0) {
									time[index] = '0' + '0';
								} else if (value < 10) {
									time[index] = '0' + value;
								}
							});

							timeStr = '';

							if (needsList[i].source === 'mining') {
								timeStr += '~';
							}

							if (time[0] > 0) {
								timeStr += time[0] + ':' + time[1] + ':' + time[2] + ':' + time[3];
							} else if (time[1] > 0) {
								timeStr += time[1] + ':' + time[2] + ':' + time[3];
							} else {
								timeStr += time[2] + ':' + time[3];
							}
						}
					}

					matDiv[j].innerHTML = timeStr;
				}

			}

			if (matDiv[j].dataset.source === needsList[i].source) {
				matDiv[j].parentNode.classList.remove('hidden');
				invDiv[j].parentNode.classList.remove('hidden');
			}
		}
	}
}

function calcTimeMining(name) {
	let tableMine;
	let myMinesLevel = JSON.parse(localStorage.getItem('minesLevel'));

	if(!myMinesLevel) {
		myMinesLevel = new Array(97);

		for(let i = 0; i < myMinesLevel.length; i++) {
			myMinesLevel[i] = 0;
		}
	}

	if($('#mine-priority').is(':visible')) {
		tableMine = $('#mine-priority table');
	} else {
		tableMine = $('#mine-area table');
	}

	let resourcesByMin = 0;

	tableMine.find('input.mine-level').each(function(index, input) {
		let $input = $(input);
		let level = parseInt($input.val(), 10);
		let area = parseInt($input.data('area'), 10);

		if(level >= 1 && level <= 9 && area > 0 && area <= 96) {
			myMinesLevel[area] = level;
			let mine = mines[area - 1];

			if(mine.hasOwnProperty(name)) {
				let perc = parseInt(mine[name], 10) / 100;
				resourcesByMin += mineRpm[level] * perc;
			}
		}
	});

	localStorage.setItem('minesLevel', JSON.stringify(myMinesLevel));

	return resourcesByMin;
}

document.querySelector(".more").addEventListener("click", addForm);

function addForm(){
	if (document.querySelectorAll(".item-needs").length > 1){
		document.querySelector(".item-needs").removeChild(document.querySelector(".delete-button"));
	}

	//clone the form
	const parentForm = document.getElementById("form");
	const item = document.querySelector(".item-needs");
	const itemClone = item.cloneNode(true);
	let last = document.querySelectorAll(".item-needs")[document.querySelectorAll(".item-needs").length-1];
	parentForm.insertBefore(itemClone, last.nextSibling);
	last = document.querySelectorAll(".item-needs")[document.querySelectorAll(".item-needs").length-1];
	
	addDeleteButton(item);
	addDeleteButton(last);
	submitButton();
}

function addDeleteButton(where){
	const deleteButton = document.createElement("button");
	deleteButton.innerHTML = "X";
	deleteButton.type = "button";
	deleteButton.classList.add("delete-button");
	where.appendChild(deleteButton);

	//tell delete button which div to delete
	deleteButton.addEventListener("click", function(){
		where.parentNode.removeChild(where);
		//delete button from first form
		if (document.querySelectorAll(".item-needs").length === 1){
			document.querySelector(".item-needs").removeChild(document.querySelector(".delete-button"));
		}
		submitButton();
	});
}

function showValue(newValue) {
	document.getElementById("coal").innerHTML=100 - newValue;
	document.getElementById("charcoal").innerHTML=newValue;
	submitButton();
}

document.getElementById("show-all").addEventListener("click", showAll);

function showAll(){
	Array.prototype.map.call(document.getElementsByClassName("inv"), function(e){
		e.parentNode.classList.remove("hidden");
	});

	document.getElementById("show-all").classList.add("hidden");
	document.querySelector("#hide").classList.remove("hidden");

}

document.getElementById("hide").addEventListener("click", hide);

function hide(){
	document.getElementById("show-all").classList.remove("hidden");
	document.getElementById("hide").classList.add("hidden");
	submitButton();
}

$(document).ready(function() {
	$('#p-mine').hide();

	$('#mine-priority button').click(function() {
		$('#mine-priority').hide();
		$('#mine-area').show();
	});

	$('#mine-area button').click(function() {
		$('#mine-priority').show();
		$('#mine-area').hide();
	});

	$('#mines').on('input', function () {
		localStorage.setItem('mines', $(this).val());
		submitButton();
	}).val(localStorage.getItem('mines') || 20);

	$('#area').on('input', function () {
		localStorage.setItem('max-area', $(this).val());
		submitButton();
	}).val(localStorage.getItem('max-area') || 96);

	$('#mine-result .minus').click(function () {
		$(this).parents('div:eq(0)').find('input').each(function () {
			let level = parseInt($(this).val(), 10);

			if(level > 0) {
				$('input[data-area="' + $(this).data('area') + '"]').val(level - 1);
			}

			displayNeeds();
		})
	});

	$('#mine-result .plus').click(function () {
		$(this).parents('div:eq(0)').find('input').each(function () {
			let level = parseInt($(this).val(), 10);

			if(level < 9) {
				$('input[data-area="' + $(this).data('area') + '"]').val(level + 1);
			}

			displayNeeds();
		})
	});

	language = localStorage.getItem('language') || navigator.language;

	if(language === 'pt-BR') {
		$.getScript('js/language/' + language + '.js', callbackLanguage);
	} else {
		$.getScript('js/language/en-US.js', callbackLanguage);
	}

	$('.lang').click(function () {
		localStorage.setItem('language', $(this).data('lang'));
		location.reload();
	});
});

function callbackLanguage() {
	//set up select options
	const select = document.getElementsByClassName('what');

	for (let i = 0; i < select.length; i++){
		materials.sort(function(a, b) {
			return lang.materials[a.name].localeCompare(lang.materials[b.name], language);
		});

		materials.forEach(function(e){
			const name = e.name;
			const el = document.createElement('option');
			el.textContent = lang.materials[name];
			el.value = name;
			select[i].appendChild(el);
		});
	}

	materials.sort(function(a, b){
		if (a.source === b.source){
			return lang.materials[a.name].localeCompare(lang.materials[b.name], language);
		} else {
			return (a.source > b.source) ? 1 : -1;
		}
	});

	for (let i = 0; i < materials.length; i++) {
		let $inventory = $('#inventory');
		let $needs = $('#needs');
		let $source = $('#' + materials[i].source);

		//source headings
		if (i === 0 || i > 0 && materials[i].source !== materials[i - 1].source) {
			$source = $('<div>', { id: materials[i].source });
			$inventory.append($source);
			$source.append("<h3 class='hidden center'><span class='inv' data-source='" + materials[i].source + "' />" + lang.source[materials[i].source] + "</h3>");
			$needs.append("<h3 class='hidden center'><span class='mat' data-source='" + materials[i].source + "' />" + lang.source[materials[i].source] + "</h3>");
		}

		//build inventory div
		$source.append('<li class="hidden"><label class="invLabel">' + lang.materials[materials[i].name] + ' </label><input name="' + materials[i].name + '" type="number" min="0" class="inv" form="form" oninput="submitButton()"></li>');

		//materials list
		let mat = '<li class="hidden" data-source="' + materials[i].source + '"><span class="quantity"></span> ' + lang.materials[materials[i].name];

		if(materials[i].source === 'mining') {
			mat += ' -&nbsp;<span class="time mat" data-name="' + materials[i].name + '"></span>*&nbsp;&nbsp;&nbsp;<span class="plus hidden">+ [</span><span class="number hidden"></span><span class="minus hidden">] -</span></li>';
		} else if (!noTime.includes(materials[i].source)) {
			mat += ' -&nbsp;<span class="time mat" data-name="' + materials[i].name + '"></span>&nbsp;&nbsp;&nbsp;<span class="plus">+</span> [<span class="number"></span>] <span class="minus">-</span></li>';
		} else {
			mat += ' &nbsp;<span class="time mat" data-name="' + materials[i].name + '"></span>&nbsp;&nbsp;&nbsp;<span class="plus hidden">+ [</span><span class="number hidden"></span><span class="minus hidden">] -</span></li>';
		}

		$needs.append(mat);

		//stations buttons
		const minus = document.getElementsByClassName("minus");
		const numbers = document.getElementsByClassName("number");
		const plus = document.getElementsByClassName("plus");
		let num = numbers[numbers.length - 1];

		if (!num.innerHTML) {
			num.innerHTML = 1;
		}

		minus[minus.length - 1].addEventListener("click", function(){
			if (num.innerHTML > 1){
				num.innerHTML--;
				submitButton();
			}
		});

		plus[plus.length - 1].addEventListener("click", function(){
			num.innerHTML++;
			submitButton();
		});
	}

	$('#info p').html(lang.info);
	$('#form .item label').html(lang.item);
	$('#form .what').prop('title', lang.what);
	$('#form .quantity label').html(lang.quantity);
	$('#form .more').html(lang.more);
	$('#form label[for="mines"]').html(lang.mines);
	$('#form label[for="area"]').html(lang.max_area);
	$('#mining_coal').html(lang.mining);
	$('#source').html(lang.coal_source);
	$('#trees').html(lang.trees);
	$('#clear-data').html(lang.clear_data).click(function () {
		if(confirm(lang.delete_data)) {
			localStorage.clear();
		}
	});
	$('#mine-results h3').html(lang.mine_areas);
	$('#mine-priority button').html(lang.sort_area);
	$('#mine-priority p').html(lang.by_priority);
	$('.area').html(lang.area);
	$('.lvl').html(lang.level);
	$('#mine-area button').html(lang.sort_priority);
	$('#mine-area p').html(lang.by_area);
	$('#p-mine').html(lang.no_materials);
	$('#needs h3:eq(0)').html(lang.everything);
	$('#inv-head h3').html(lang.current_inventory);
	$('#show-all').html(lang.show_all);
	$('#hide').html(lang.hide_inventory);
	$('footer a:eq(0)').html(lang.made_love);
	$('footer span').html(lang.and);
}
