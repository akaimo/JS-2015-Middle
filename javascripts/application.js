$(function() {
    var array = [];
    var count = 0;
    // 追加ボタンをクリックしたとき
    $("#submit").click(function(){
        var data = {
            name:$("input[name='name']").val(),
            ken:$("input[name='ken']").val(),
            siku:$("input[name='siku']").val(),
            tyou:$("input[name='tyou']").val(),
            date:new Date($("input[name='date']").val())
        };
        array.push(data);
        addRow(data, count);
        addSelect(data);
        count += 1;
    });

    // 都道府県ソートを変更したとき
    $('#sortSelect').change(function() {
        hideRow(array);
    });

    // 誕生日ソートを変更したとき
    $('#sortDate').change(function() {
        sortDate(array);
    });
});


// 行を追加する
var addRow = function(data, count) {
    $('#addressTable').append("<tr id="+count+"><td>" + data.name + "</td><td>" + data.ken + data.siku + data.tyou +
    "</td><td>" + formatDate(data.date) + "</td></tr>");
}

// Date型をフォーマット
var formatDate = function toLocaleString(date){
    return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join( '/' ) + ' '
}

// selectのoptionに存在しない場合は追加
var addSelect = function(data) {
  if ($("#sortSelect option[value=" + data.ken + "]").size() == 0) {
      $('#sortSelect').append($('<option>').html(data.ken).val(data.ken));
  };
}

// selectedと一致する行を非表示
var hideRow = function(array) {
    var selected = $("#sortSelect option:selected").text();
    if (selected == "全て") {
        // 全てのときは、表を全て表示
        for (var i=0; i < array.length; i++) {
            $("#addressTable #"+i).show();
        };
    } else {
        // 一致する行のみ表示
        for (var i=0; i < array.length; i++) {
            if (array[i].ken != selected) $("#addressTable #"+i).hide();
            else                          $("#addressTable #"+i).show();
        };
    }
}

// 誕生日でソートする
var sortDate = function(array) {
    var selected = $("#sortDate option:selected").text();
    if (selected == "昇順") {
        array.sort(function(a,b){
            return a.date - b.date;
        });
        rewriteTable(array);
    } else if (selected == "降順") {
        array.sort(function(a,b){
            return b.date - a.date;
        });
        rewriteTable(array);
    };
}

// 表を書き換える
var rewriteTable = function(array) {
    for (var i=0; i < array.length; i++) {
        $("#addressTable #"+i).remove();
    };
    for (var i=0; i < array.length; i++) {
        addRow(array[i], i);
    };
    hideRow(array);
}

