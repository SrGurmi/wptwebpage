$(document).ready(function () {
    // Search player
    $('#search').on('keyup', function () {
        let player = $(this).val();
        if (player != '' && player.length >= 3) {
            notEmpty(player, 4, 'Ranking');
        } else {
            empty();
        }
    })

    // Search racer
    $('#search-race').on('keyup', function () {
        let player = $(this).val();
        if (player != '' && player.length >= 3) {
            notEmpty(player, 15, 'Race');
        } else {
            empty();
        }
    })

    // Search comparator
    $('.search-comparator').on('keyup', function () {
        let searcher = $(this);
        let sex = $('.item-sex.active').data('sex');
        let col = parseInt(searcher.data("col"));
        let player = searcher.val();
        if (player != '' && player.length >= 3) {
            $.get(ajax_url + "?page_id=10&class=Comparator&type=html&search=" + player + '&sex=' + sex, function (data) {
                $('.list-comparator').eq(col).html(data);
                $('.list-comparator').eq(col).addClass("selector-active");
                $('.list-comparator li').on('click', function () {
                    $.get(ajax_url + "?page_id=10&class=Comparator&type=json&id=" + $(this).val(), function (data) {
                        addTheseNumbersToPlayer(data[0], col);
                        searcher.data('id', data[0].id);
                        $('.search-comparator').val('');
                        $('.list-comparator').html('');
                        if ($('.search-comparator').eq(0).data('id') !== '0' && $('.search-comparator').eq(1).data('id') !== '0') {
                            $.get(ajax_url + "?page_id=10&class=Comparator&type=json&playerA=" + $('.search-comparator').eq(0).data('id') + "&playerB="  + $('.search-comparator').eq(1).data('id'), function (data) {
                                let matches = setRowMatch(data[0]);
                                $('#table-matches').html(matches);
                                let total = parseInt(data[1][0].ganados) + parseInt(data[2][0].ganados);
                                let percentageA = parseInt(data[1][0].ganados) / total * 100;
                                let percentageB = parseInt(data[2][0].ganados) / total * 100;
                                $('#percentages').html('<span>' + Math.round(percentageA) + '%</span><span>vs</span><span>' + Math.round(percentageB) + '%</span>');
                                var options = {
                                    colorSet: "greenShades",
                                    backgroundColor: "transparent",
                                    interactivityEnabled: false,
                                    animationEnabled: true,
                                    data: [{
                                        type: "doughnut",
                                        innerRadius: "60%",
                                        showInLegend: false,
                                        legendText: "{label}",
                                        indexLabel: "{label}: #percent%",
                                        indexLabelLineColor: "transparent",
                                        indexLabelFontColor: "transparent",
                                        dataPoints: [
                                            { label: "Ganados", y: percentageA },
                                            { label: "Ganados", y: percentageB }
                                        ]
                                    }]
                                };
                                $("#chartContainer").CanvasJSChart(options);
                            })
                        }
                    })
                });
            });
        }
        else {
            $('.list-comparator').eq(col).html("");
            $('.list-comparator').eq(col).removeClass("selector-active");
            //$("#list-comparator").html("");
        }
    })

    // Search player child
    $('#search-dropdown').on('keyup', function () {
        let player = $(this).val();
        if (player != '' && player.length >= 3) {
            $.get(ajax_url + "?page_id=13&class=PlayerDetail&type=html&search=" + player, function (data) {
                $('#list-players').html(data);
                $('#list-players li').on('click', function () {
                    window.location = $(this).attr('href');
                });
            });
        } else {
            $('#list-players').html('');
        }
    })

    // Detele data from comparator on change sex
    $('.item-sex').on('click', function () {
        console.log('test');
        if ($(this).hasClass('active')) {
            removeData();
        }
    });

    $('#load-more').on('click', function (e) {
        e.preventDefault();
        let parent = $('#posts-grid');
        let button = $(this);
        let actual_page = $(button).data('page');
        let pages = $(button).data('pages');
        let new_page = parseInt(actual_page) + 1;
        let year = $('#posts_ano_act').val();
        let type = $('#posts_tipo_act').val();

        $.get(ajax_url + "?page_id=2&class=PostList&type=html&page=" + actual_page + "&year=" + year + "&contentType=" + type, function (data) {
            $(data).appendTo($(parent));
            $(button).data('page', new_page);
            if (new_page === pages) {
                $(button).hide();
            }
            $('#posts-grid').masonry('destroy');
            $('#posts-grid').masonry({
                itemSelector: '.grid-item',
                gutter: 20,
                columnWidth: '.grid-25',
                horizontalOrder: false,
                transitionDuration: '1.2s',
                percentPosition: true
            });
        });
    });
});

function empty () {
    $('.col-md-6.b-list-ranking.b-col-1').css('display', 'block');
    $('.col-md-6.b-list-ranking.b-col-2').css('display', 'block');
    $('.col-md-12.b-list-ranking.search-items').css('display', 'none');
}

function notEmpty (player, id, clase) {
    $('.col-md-6.b-list-ranking.b-col-1.aos-init.aos-animate').css('display', 'none');
    $('.col-md-6.b-list-ranking.b-col-2.aos-init.aos-animate').css('display', 'none');
    $('.col-md-12.b-list-ranking.search-items').css('display', 'block');
    $.get(ajax_url + "?page_id=" + id + "&class=" + clase + "&type=html&search=" + player, function (data) {
        $('#players').html(data);
    });
}

function addTheseNumbersToPlayer (d, col) {
    col = col + 1;
    let born = new Date(d.fecha_nacimiento);
    let year = born.getFullYear();
    let name = d.text_page_title.split(' ');
    let surnames = d.text_page_title.substring(name[0].length + 1);
    let dataArray = [
        '<span>' + name[0] + '</span>' + surnames,
        BASE_URL + '/' + THEME_PATH + 'img/flagspng/' + d.nacionalidad.toLowerCase() + '.png',
        BASE_URL + '/' + d.foto_4,
        '<span>Ranking</span> ' + d.ranking,
        d.puntos,
        d.partidos_ganados,
        d.partidos_perdidos,
        d.efectividad,
        d.victorias,
        d.posicion_juego,
        d.altura,
        year
    ];

    let numbers = document.querySelectorAll('.player-' + col);
    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i].tagName == 'IMG') {
            numbers[i].src = dataArray[i];
        }
        else {
            numbers[i].innerHTML = dataArray[i];
        }
    }
}

function setRowMatch (data) {
    let html = '';
    for (let i = 0; i < data.length; i++) {
        html += '<tr>';
        html += '<td>' + data[i].text_page_title + '</td>';
        html += '<td>' + data[i].nombre_cuadro + '</td>';
        html += '<td>' + data[i].nombre_ronda + '</td>';
        html += '<td>' + data[i].resultado + '</td>';
        html += '</tr>';
    }

    return html;
}

function removeData() {
    let dataArray = [
        '<span></span>',
        BASE_URL + '/' + THEME_PATH + 'img/flagspng/99.png',
        BASE_URL + '/',
        '<span>Ranking</span> 0',
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
    ];

    let numbersToRemove = document.querySelectorAll('.player-1');
    let numbersToRemove2 = document.querySelectorAll('.player-2');
    for (let i = 0; i < numbersToRemove.length; i++) {
        if (numbersToRemove[i].tagName == 'IMG') {
            numbersToRemove[i].src = dataArray[i];
            numbersToRemove2[i].src = dataArray[i];
        }
        else {
            numbersToRemove[i].innerHTML = dataArray[i];
            numbersToRemove2[i].innerHTML = dataArray[i];
        }
    }
}