function init () {
    // Создаем модель мультимаршрута.
    var multiRouteModel = new ymaps.multiRouter.MultiRouteModel([
            [55.734876, 37.59308],
            "Москва, ул. Мясницкая"
        ], {
            // Путевые точки можно перетаскивать.
            // Маршрут при этом будет перестраиваться.
            wayPointDraggable: true,
            boundsAutoApply: true
        }),

        // Создаём выпадающий список для выбора типа маршрута.
        routeTypeSelector = new ymaps.control.ListBox({
            data: {
                content: 'Как добраться'
            },
            items: [
                new ymaps.control.ListBoxItem({data: {content: "Общественным транспортом"}})   ],
            options: {
                itemSelectOnClick: false
            }
        }),
        // Получаем прямые ссылки на пункты списка.
        
        masstransitRouteItem = routeTypeSelector.get(0)
    
    // Подписываемся на события нажатия на пункты выпадающего списка.
    
    masstransitRouteItem.events.add('click', function (e) { changeRoutingMode('masstransit', e.get('target')); });
    

    ymaps.modules.require([
        'MultiRouteCustomView'
    ], function (MultiRouteCustomView) {
        // Создаем экземпляр текстового отображения модели мультимаршрута.
        // см. файл custom_view.js
        new MultiRouteCustomView(multiRouteModel);
    });

    // Создаем карту с добавленной на нее кнопкой.
    var myMap = new ymaps.Map('map', {
            center: [55.750625, 37.626],
            zoom: 7,
            controls: [routeTypeSelector]
        }, {
            buttonMaxWidth: 300
        }),

        // Создаем на основе существующей модели мультимаршрут.
        multiRoute = new ymaps.multiRouter.MultiRoute(multiRouteModel, {
            // Путевые точки можно перетаскивать.
            // Маршрут при этом будет перестраиваться.
            wayPointDraggable: true,
            boundsAutoApply: true
        });

    // Добавляем мультимаршрут на карту.
    myMap.geoObjects.add(multiRoute);

    function changeRoutingMode(routingMode, targetItem) {
        multiRouteModel.setParams({ routingMode: routingMode }, true);

        // Отменяем выбор элементов.
        masstransitRouteItem.deselect();


        // Выбираем элемент и закрываем список.
        targetItem.select();
        routeTypeSelector.collapse();
    }
}

ymaps.ready(init);
