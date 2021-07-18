window.onload = () => {
    // progressbar.js@1.0.0 version is used
    // Docs: http://progressbarjs.readthedocs.org/en/1.0.0/
    const audio = new Audio();
    audio.src = "https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-46416/zapsplat_multimedia_button_click_007_53868.mp3";
    audio.playbackRate = 2;
    
    setTimeout(function(){
        $('#loader_cont').remove();
    }, 3000);
    var ctx = document.querySelector('#canvas').getContext('2d');
    function showbar(percentage) {
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.strokeStyle = "#FF0000";
        ctx.lineWidth = 4;
        ctx.arc(500, 500, 480, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = "#00ff00";
        ctx.lineWidth = 40;
        ctx.arc(500, 500, 480, 0 - Math.PI / 2, (Math.PI * (2 * percentage / 100) - Math.PI / 2));
        ctx.stroke();
        ctx.beginPath();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = "80px Arial";
        ctx.fillText(Math.round(percentage*100)/1000+' Mb /'+10+' Mb', 500, 500, 1000);
        //console.log(percentage)
        
    }
    
    function update_storage(){
        let sort_data_str = localStorage.getItem('notes');
        let to_do_data_str = localStorage.getItem('to_do');
        showbar((sort_data_str.length + to_do_data_str.length)*100/10485760);
        
        $('tr:nth-child(2) > td:nth-child(2)').html(to_do_data_str.length);
        $('tr:nth-child(2) > td:nth-child(3)').html(JSON.parse(to_do_data_str).length);
        $('tr:nth-child(2) > td:nth-child(4)').html(to_do_data_str.length+' Bytes');
        
        $('tr:nth-child(3) > td:nth-child(2)').html(sort_data_str.length);
        $('tr:nth-child(3) > td:nth-child(3)').html(JSON.parse(sort_data_str).length);
        $('tr:nth-child(3) > td:nth-child(4)').html(sort_data_str.length + ' Bytes');
        
        $('tr:nth-child(4) > td:nth-child(2)').html(to_do_data_str.length + sort_data_str.length);
        $('tr:nth-child(4) > td:nth-child(3)').html(JSON.parse(to_do_data_str).length + JSON.parse(sort_data_str).length);
        $('tr:nth-child(4) > td:nth-child(4)').html(to_do_data_str.length + sort_data_str.length + ' Bytes');
        
        
    }
    //update_storage();
    var task_no = 0;
    var to_do_data = null;
    var sort_data = null;
    var edit_index_to_do = null;
    var edit_index_sort = null;
    if (localStorage.getItem('to_do') == null) {
        localStorage.setItem('to_do', '[]');
        to_do_data = [];
    }
    else {
        to_do_data = JSON.parse(localStorage.getItem('to_do'));
    }
    if (localStorage.getItem('notes') == null) {
        localStorage.setItem('notes', '[]');
        sort_data = [];
    }
    else {
        sort_data = JSON.parse(localStorage.getItem('notes'));
    }


    function showdata() {
        $('#container_small').html('');
        $('#container_to_do').html('');
        var htm1, htm2;
        to_do_data = JSON.parse(localStorage.getItem('to_do'));
        sort_data = JSON.parse(localStorage.getItem('notes'));

        for (i in to_do_data) {
            htm1 = `
                <div class="to_do_text_container">
                    <div class="to_do_main_text">
                        ${to_do_data[i][0]}
                    </div>
                    <div class="inner_container_to_do">
                        <i class="far fa-calendar-alt time_to_do"> ${to_do_data[i][1]}</i>
                        <div class="to_do_delete">
                            <i class="fas fa-trash-alt"></i>
                        </div>
                        <div class="to_do_edit">
                            <i class="far fa-edit"></i>
                        </div>
                    </div>
                </div>
            `;
            $('#container_to_do').append(htm1);
        }
        for (i in sort_data) {
            htm2 = `
                <div class="small_text_container">
                    <div class="small_text_title">
                        ${sort_data[i][0]}
                    </div>
                    <div class="small_main_text">
                        ${sort_data[i][1]}
                    </div>
                    <div class="inner_container_small">
                        <i class="far fa-calendar-alt time_small"> ${sort_data[i][2]}</i>
                        <div class="small_delete">
                            <i class="fas fa-trash-alt"></i>
                        </div>
                        <div class="small_edit">
                            <i class="far fa-edit"></i>
                        </div>
                    </div>
                </div>
            `;
            $('#container_small').append(htm2);
        }


        $('.small_delete').on('click', function() {
            let del_idx = $(this).parent().parent().index();
            sort_data = JSON.parse(localStorage.getItem('notes'));
            sort_data.splice(del_idx, 1);
            localStorage.setItem('notes', JSON.stringify(sort_data));
            window.navigator.vibrate(50);
            showdata();
        });

        $('.to_do_delete').on('click', function() {
            let del_idx = $(this).parent().parent().index();
            to_do_data = JSON.parse(localStorage.getItem('to_do'));
            to_do_data.splice(del_idx, 1);
            localStorage.setItem('to_do', JSON.stringify(to_do_data));
            window.navigator.vibrate(50);
            showdata();
        });


        $('.to_do_edit').on('click', function() {

            $('#to_do_add_container_edit').css('top', '0');
            edit_index_to_do = $(this).parent().parent().index();
            let to_do_data_edit = JSON.parse(localStorage.getItem('to_do'))[edit_index_to_do];
            $('#to_do_input_edit').html(to_do_data_edit[0]);
            $('#to_do_time_edit').val(to_do_data_edit[1].replace(' ', 'T'));
            //console.log(to_do_data_edit);
        });
        $('.small_edit').on('click', function() {

            $('#small_add_container_edit').css('top', '0');
            edit_index_sort = $(this).parent().parent().index();
            let small_data_edit = JSON.parse(localStorage.getItem('notes'))[edit_index_sort];
            $('#small_title_edit').html(small_data_edit[0]);
            $('#small_input_edit').html(small_data_edit[1]);
            console.log(small_data_edit)
        });
        
        //update_storage();
    }

    //console.log('loaded')
    $('#to_do_list').click(function() {
        $('#slider1').css({
            'left': 'calc(5% + 5px)'
        });
        $('#to_do_list').css('color', 'white');
        $('#small_notes').css('color', '#1976d3');
        $('#container_to_do').css('left', '0');
        $('#container_small').css('left', '100vw');
        task_no = 0;
    });

    $('#small_notes').click(function() {
        $('#slider1').css({
            'left': 'calc(55% - 5px)'
        });
        $('#to_do_list').css('color', '#1976d3');
        $('#small_notes').css('color', 'white');
        $('#container_to_do').css('left', '-100vw');
        $('#container_small').css('left', '0');
        task_no = 1;
    });

    $('#to_do_close').click(function() {
        $('#to_do_add_container').css('top', '100vh');
        window.navigator.vibrate(50);
    });
    $('#to_do_close_edit').click(function() {
        $('#to_do_add_container_edit').css('top', '100vh');
        window.navigator.vibrate(50);
    });
    $('#small_close').click(function() {
        $('#small_add_container').css('top', '100vh');
        window.navigator.vibrate(50);
    });
    $('#small_close_edit').click(function() {
        $('#small_add_container_edit').css('top', '100vh');
        window.navigator.vibrate(50);
    });


    $('.fa-plus-circle').click(function() {
        if (task_no == 0) {
            $('#to_do_add_container').css('top', '0');
        }
        else {
            $('#small_add_container').css('top', '0');
        }
    });
    /*$('#to_do_add').click(function(){
        console.log($('#to_do_input').html());
    });*/
    $('#to_do_add').click(function() {
        let to_do_time = $('#to_do_time').val();
        let to_do_input = $('#to_do_input').html();
        if (to_do_time == '') {
            to_do_time = 'Null TTime'
        }
        if (to_do_input.trim() == '') {
            alert('Please fill the task menue');
            return;
        }
        to_do_time = to_do_time.replace('T', ' ');
        to_do_data.unshift([to_do_input, to_do_time]);
        localStorage.setItem('to_do', JSON.stringify(to_do_data));
        window.navigator.vibrate(50);
        showdata();
        /*After adding to database*/
        $('#to_do_add_container').css('top', '100vh');
        $('#to_do_time').val('');
        $('#to_do_input').html('Your Task');
        //showdata();
    });

    $('#small_add').click(function() {
        let small_title = $('#small_title').html();
        let small_input = $('#small_input').html();
        if (small_title.trim() == '') {
            alert('Please fill the Title');
            return;
        }
        if (small_input.trim() == '') {
            alert('Please fill the notes section');
            return;
        }
        let date = new Date();
        let fullyear = date.getFullYear();
        let month = date.getMonth() + 1;
        let date_t = date.getDate();
        let hour = date.getHours();
        let minut = date.getMinutes();

        if (month < 10) {
            month = '0' + month;
        }
        if (date_t < 10) {
            date_t = '0' + date_t;
        }
        if (hour < 10) {
            hour = '0' + hour;
        }
        if (minut < 10) {
            minut = '0' + minut;
        }

        date = fullyear + '-' + month + '-' + date_t + ' ' + hour + ':' + minut;
        //console.log(date)
        sort_data.unshift([small_title, small_input, date]);
        localStorage.setItem('notes', JSON.stringify(sort_data));
        window.navigator.vibrate(50);
        showdata();
        /*After adding to database*/
        $('#small_add_container').css('top', '100vh');
        $('#small_title').html('Title');
        $('#small_input').html('short notes');
        //showdata();
    });

    $('#to_do_add_edit').on('click', function() {
        let time = $('#to_do_time_edit').val();
        if ($('#to_do_time_edit').val() == '') {
            time = 'Null TTime'
        }
        to_do_data = JSON.parse(localStorage.getItem('to_do'));
        to_do_data[edit_index_to_do] = [$('#to_do_input_edit').html(), time.replace('T', ' ')];
        localStorage.setItem('to_do', JSON.stringify(to_do_data));
        showdata();
        $('#to_do_add_container_edit').css('top', '100vh');
        window.navigator.vibrate(50);
    });
    $('#small_add_edit').on('click', function() {
        sort_data = JSON.parse(localStorage.getItem('notes'));
        let time = sort_data[edit_index_sort][2];
        sort_data[edit_index_sort] = [$('#small_title_edit').html(), $('#small_input_edit').html(), time];
        localStorage.setItem('notes', JSON.stringify(sort_data));
        showdata();
        $('#small_add_container_edit').css('top', '100vh');
        window.navigator.vibrate(50);
    });
    
    $('#close_tab').click(function(){
        $('#additional_cont').css('top','100vh');
        window.navigator.vibrate(50);
    });
    $('.fa-bars').click(function() {
        update_storage();
        $('#additional_cont').css('top', '0');
    });
    
    showdata();
    
    const small_ele = document.querySelector("#cursor");
    //showdata();
    document.querySelector("body").onclick = function(event) {
        audio.play()
        small_ele.style.left = event.x - (small_ele.offsetHeight / 2) + "px";
        small_ele.style.top = event.y - (small_ele.offsetWidth / 2) + "px";
        small_ele.style.display = "block";
        setTimeout(function() {
            small_ele.style.display = "none";
        }, 500);
    }
}
