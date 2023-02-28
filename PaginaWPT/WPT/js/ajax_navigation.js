$(document).ready(function () {
    // Bind events
    $('#torneos_ano .dropdown-item').on('click', function () {
        $('#torneos_ano_act').val ($(this).html());
        $('#torneos_ano .dropdown-toggle').html ($(this).html());
        torneos_load ();
    })
    $('#torneos_tipo .dropdown-item').on('click', function () {
        $('#torneos_tipo_act').val ($(this).data('value'));
        $('#torneos_tipo .dropdown-toggle').html ($(this).html());
        torneos_load ();
    })
    $('#horarios_torneo_categoria .dropdown-item').on('click', function () {
        $('#horarios_torneo_categoria_act').val ($(this).data('value'));
        $('#horarios_torneo_categoria .dropdown-toggle').html ($(this).html());
        horarios_torneo_load ();
    })
    $('#calendar-tipos .item').on('click', function () {
        calendar_tipos_load ($(this).data('value'));
    })
    $('#posts_years .dropdown-item').on('click', function () {
        $('#posts_ano_act').val($(this).html());
        $('#posts_years .dropdown-toggle').text($(this).text());
        $('#posts_tipo_act').val('');
        $('#content_type .dropdown-toggle').text('Contenido');
        posts_load();
    })
    $('#content_type .dropdown-item').on('click', function () {
        $('#posts_tipo_act').val($(this).data('content'));
        $('#content_type .dropdown-toggle').text($(this).text());
        posts_load();
    })
    $('.d-info-inscribed .dropdown-item-fem').on('click', function () {
        $('.d-info-inscribed .b-female').show ();
        $('.d-info-inscribed .b-male').hide ();
    })
    $('.d-info-inscribed .dropdown-item-mas').on('click', function () {
        $('.d-info-inscribed .b-female').hide ();
        $('.d-info-inscribed .b-male').show ();
    })

});

// Functions
function cuadros_torneo_categoria_click () {
    $('#cuadros_torneo_categoria_act').val ($(this).data('value'));
    $('#cuadros_torneo_categoria .dropdown-toggle').html ($(this).html());
    cuadros_torneo_load ();
}
function cuadros_torneo_cuadro_click () {
    $('#cuadros_torneo_cuadro_act').val ($(this).html())
    $('#cuadros_torneo_cuadro .dropdown-toggle').html ($(this).html());
    cuadros_torneo_load ();
}
function resultados_torneo_categoria_click () {
    $('#resultados_torneo_categoria_act').val ($(this).data('value'));
    $('#resultados_torneo_categoria .dropdown-toggle').html ($(this).html());
    resultados_torneo_load ();
}
function resultados_torneo_fecha_click () {
    $('#resultados_torneo_fecha_act').val ($(this).html());
    $('#resultados_torneo_fecha .dropdown-toggle').html ($(this).html());
    resultados_torneo_load ();
}
function resultados_torneo_ronda_click () {
    $('#resultados_torneo_ronda_act').val ($(this).html());
    $('#resultados_torneo_fecha_act').val ('');
    $('#resultados_torneo_fecha .dropdown-toggle').html ('Fecha');
    $('#resultados_torneo_ronda .dropdown-toggle').html ($(this).html());
    resultados_torneo_load ();
}
function resultados_torneo_cuadro_click () {
    $('#resultados_torneo_cuadro_act').val ($(this).html());
    $('#resultados_torneo_ronda_act').val ('');
    $('#resultados_torneo_ronda .dropdown-toggle').html ('Ronda');
    $('#resultados_torneo_fecha_act').val ('');
    $('#resultados_torneo_fecha .dropdown-toggle').html ('Fecha');
    $('#resultados_torneo_cuadro .dropdown-toggle').html ($(this).html());
    resultados_torneo_load ();
}
function calendar_tipos_load (tipo) {
    $.get( ajax_url + "?page_id=1&class=Calendar&type=html&tipo=" + tipo, function( data ) {
        $('#calendar_tipos_data').html (data);
    });
}
function cuadros_torneo_load () {
    var id = $('#cuadros_torneo_id').val ();
    var categoria = $('#cuadros_torneo_categoria_act').val ();
    var cuadro = $('#cuadros_torneo_cuadro_act').val ();
    $.get( ajax_url + "?page_id=12&class=TournamentDetail&function=cuadros&type=html&id=" + id + "&categoria=" + categoria + "&cuadro=" + cuadro, function( data ) {
        $('#cuadros_torneo_data').html (data);
    });
}
function torneos_load () {
    var ano = $('#torneos_ano_act').val ();
    var tipo = $('#torneos_tipo_act').val ();
    $.get( ajax_url + "?page_id=3&class=TournamentList&type=html&ano=" + ano + "&tipo=" + tipo, function( data ) {
        $('#torneos_data').html (data);
    });
}
function horarios_torneo_load () {
    var id = $('#horarios_torneo_id').val ();
    var categoria = $('#horarios_torneo_categoria_act').val ();
    $.get( ajax_url + "?page_id=12&class=TournamentDetail&function=horarios&type=html&id=" + id + "&categoria=" + categoria, function( data ) {
        $('#horarios_torneo_data').html (data);
    });
}
function resultados_torneo_load () {
    var id = $('#resultados_torneo_id').val ();
    var categoria = $('#resultados_torneo_categoria_act').val ();
    var ronda = $('#resultados_torneo_ronda_act').val ();
    var cuadro = $('#resultados_torneo_cuadro_act').val ();
    var fecha = $('#resultados_torneo_fecha_act').val ();
    $.get( ajax_url + "?page_id=12&class=TournamentDetail&function=resultados&type=html&id=" + id + "&categoria=" + categoria + "&ronda=" + ronda + "&cuadro=" + cuadro + "&fecha=" + fecha, function( data ) {
        $('#resultados_torneo_data').html (data);
    });
}
function posts_load () {
    let year = $('#posts_ano_act').val();
    let type = $('#posts_tipo_act').val();
    let tag = $('#posts_tag').val();
    $.get( ajax_url + "?page_id=2&class=PostList&type=html&year=" + year + "&contentType=" + type + "&tag=" + tag, function(data) {
        $('#posts-grid').html(data);
        //$('#posts-grid').masonry('reloadItems');
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
}