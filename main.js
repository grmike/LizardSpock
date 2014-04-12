var wins = 0;
var loses = 0;

$(document).ready(function () {
	rules = new GameRules();
	$('.choice').click(DoMove);
});

var GameRules = function () {
	this.winnersmap =
		[
			[0, 1, 2, 1, 2],
			[2, 0, 1, 2, 1],
			[1, 2, 0, 1, 2],
			[2, 1, 2, 0, 1],
			[1, 2, 1, 2, 0]
		];
	this.items = {
		scissors: { num: 0, name: 'scissors', img: 'pics/scissors.gif' },
		paper: { num: 1, name: 'paper', img: 'pics/paper.gif' },
		rock: { num: 2, name: 'rock', img: 'pics/rock.gif' },
		lizard: { num: 3, name: 'lizard', img: 'pics/lizard.gif' },
		spock: { num: 4, name: 'spock', img: 'pics/spock.gif' },
	};
	this.getItemByNum = function(num){
		for (k in this.items)
			if (this.items.hasOwnProperty(k)) {
				var prop = this.items[k];
				if (prop.num == num) return prop;
			}
	}
}

function DoMove() {
	// получаем свой выбор
	var myval = $(this).attr('value');
	// переводим его в число
	var my = rules.items[myval].num;
	// получаем числовой выбор противника
	var enemy = EnemyMove();
	// выводим результат
	ShowResult(my, enemy, rules.items[myval].img);
}

function EnemyMove() {
	// случайная генерация хода противника
    var enemy = Math.floor(Math.random() * 5);
	// показываем выбор противника
	var img = rules.getItemByNum(enemy).img;
	$('#enemyImg').attr('src', img);
	return enemy;
}

function ShowResult(my, enemy, mysrc) {
	var intro = $('#intro');
	intro.hide();

	var elm = $('#result');
	var ret = rules.winnersmap[my][enemy]

	switch (ret) {
		case 0: elm.css('color', 'brown').text('НИЧЬЯ');
			wins += 1;
			loses += 1;
			break;
		case 1: elm.css('color', 'green').text('ТЫ ПОБЕДИЛ');
			wins += 1;
			break;
		case 2: elm.css('color', 'red').text('ТЫ ПРОИГРАЛ');
			loses += 1;
			break;
	}

	var blocker = $('#screenblocker');
	blocker.addClass("screenblocker");

	var enemy = $('#enemyImg');
	enemy.css("left", "60%");

	var mine = $('#mineImg');
	mine.attr("src", mysrc);
	mine.css("left", "25%");

	var mineLeft = (ret == 0) ? "37%" : "40%";
	var enemyLeft = (ret == 0) ? "48%" : "45%";
	if (ret == 1) {
		mine.css("zIndex", 101);
		enemy.css("zIndex", 100);
	}
	if (ret == 2) {
		mine.css("zIndex", 100);
		enemy.css("zIndex", 101);
	}

	mine.show();
	enemy.show();

	mine.animate({
			left: mineLeft
		},
		2000
	);

	enemy.animate({
			left: enemyLeft
		},
		2000,
		function(){
			$('#count-box').text(wins + " : " + loses);
			showTitle(elm, blocker, mine, enemy, intro);
		}
	);
}

function showTitle(elm, blocker, obj1, obj2, intro) {
	elm.css("fontSize", "2em");
	elm.fadeToggle("fast", function(){
		elm.animate({
				fontSize: "5em"
			}, 
			2500, 
			function(){
				elm.fadeToggle("slow", function(){
					intro.show();
					blocker.removeClass("screenblocker");
				});
				obj1.hide();
				obj2.hide();
		});
	});
}