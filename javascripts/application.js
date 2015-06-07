$(function() {
    var rowArray = [];
    var rowCount = 0;
    // 追加ボタンをクリックしたとき
    $('#submit').click(function(){
        var data = {
            name:$('input[name="name"]').val(),
            prefecture:$('input[name="prefecture"]').val(),
            city:$('input[name="city"]').val(),
            town:$('input[name="town"]').val(),
            birthday:new Date($('input[name="birthday"]').val()),
            old:function() {
                return parseInt((formatForOld(new Date) - formatForOld(this.birthday)) / 10000);
            }
        };
        rowArray.push(data);
        addRow(data, rowCount);
        addSelectOption(data);
        rowCount += 1;
    });

    // 都道府県ソートを変更したとき
    $('#sortPrefecture').change(function() {
        sortPrefecture(rowArray);
    });

    // 誕生日ソートを変更したとき
    $('#sortDate').change(function() {
        sortDate(rowArray);
    });
});


var addRow = function(data, count) {
    $('#addressTable').append('<tr id=row'+count+'><td>' + data.name + '</td><td>' + data.prefecture + data.city + data.town +
    '</td><td>' + formatDate(data.birthday) + '</td><td>' + data.old() + '</td></tr>');
    $('#row'+count).hide();
    $('#row'+count).fadeIn('slow');
}

// Date型をフォーマット
var formatDate = function toLocaleString(date){
    return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join( '/' ) + ' '
}

// 年齢計算用のフォーマット
var formatForOld = function toLocaleString(date){
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if (month < 10) {month = '0' + month;};
    if (day < 10) {day = '0' + day;};
    return date.getFullYear() + month + day;
}

var addSelectOption = function(data) {
  if ($('#sortPrefecture option[value=' + data.prefecture + ']').size() == 0) {
      $('#sortPrefecture').append($('<option>').html(data.prefecture).val(data.prefecture));
  };
}

// selectedと一致する行を非表示
var sortPrefecture = function(array) {
    var selected = $('#sortPrefecture option:selected').text();
    if (selected == '全て') {
        // 全ての行を表示
        for (var i=0; i < array.length; i++) {
            $('#addressTable #row'+i).fadeIn('slow');
        };
    } else {
        // 一致する行のみ表示
        for (var i=0; i < array.length; i++) {
            if (array[i].prefecture != selected) $('#addressTable #row'+i).hide();
            else                                 $('#addressTable #row'+i).fadeIn('slow');
        };
    }
}

var sortDate = function(array) {
    var selected = $('#sortDate option:selected').text();
    if (selected == '昇順') {
        array.sort(function(a,b){
            return a.birthday - b.birthday;
        });
        rewriteTable(array);
    } else if (selected == '降順') {
        array.sort(function(a,b){
            return b.birthday - a.birthday;
        });
        rewriteTable(array);
    };
}

var rewriteTable = function(array) {
    for (var i=0; i < array.length; i++) {
        $('#addressTable #row'+i).remove();
    };
    for (var i=0; i < array.length; i++) {
        addRow(array[i], i);
    };
    sortPrefecture(array);
}

