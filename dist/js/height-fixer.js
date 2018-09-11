'use strict';

// Оборачиваем функционал в функцию, чтобы внутренние переменные не торчали наружу (не загрязняем глобальную обасть видимости).
(function () {
    'use strict';
    // В массиве надо перечислить селекторы блоков, высоту которых надо выровнять.
    // Как вариант, можно сделать какой-нибудь особый класс, чтобы управлять этим из HTML.

    var blocksToFixElements = ['.recommend .recommend__slide_box'];
    var blocksToFixElements2 = ['.catalog .catalog__box'];

    // Когда DOM сформирован
    document.addEventListener('DOMContentLoaded', function () {
        // Для каждой группы элементов инициализируем функционал выравнивания высоты.
        blocksToFixElements.forEach(initFixer);
        blocksToFixElements2.forEach(initFixer);
    });

    // Эта функция будет вызвана для каждого селектора из массива blocksToFixElements.
    // Каждая группа блоков будет обрабатываться независимо от другой.
    function initFixer(selector) {
        var blocks = document.querySelectorAll(selector);
        // Выравниваем высоту после загрузки DOM (картинки, шрифты ещё не загружены).
        launchFixer.call(blocks);
        // Выравниваем высоту после полной загрузки.
        window.addEventListener('load', function () {
            launchFixer.call(blocks);
        });
        // И при каждом ресайзе экрана.
        window.addEventListener('resize', function () {
            launchFixer.call(blocks);
        });
    }

    function launchFixer() {
        // Вызывая эту функцию выше, мы привязываем контекст к нашим блокам (с помощью call).
        // this здесь - это ссылка на их коллекцию.
        var blocks = this;
        var maxHeight = 0;

        // В старом JS у коллекций DOM-элементов нет метода forEach (в новом есть),
        // поэтому мы одолжим этот метод у Array.
        Array.prototype.forEach.call(blocks, function (block) {
            // на всякий случай используем min-height вместо height.
            block.style.minHeight = '';
        });

        // Когда порядок перебора не важен, часто используют такую конструкцию
        // (перебор будет осуществлён в обратном порядке).
        for (var i = blocks.length; i--;) {
            var blockHeight = blocks[i].offsetHeight;
            // Таким образом в конце цикла maxHeight будет содержать максимальную высоту.
            if (maxHeight < blockHeight) {
                maxHeight = blockHeight;
            }
        }

        // Устанавливаем самую большую высоту для всех блоков.
        Array.prototype.forEach.call(blocks, function (block) {
            // на всякий случай используем min-height вместо height.
            block.style.minHeight = maxHeight + 'px';
        });
    }
})();